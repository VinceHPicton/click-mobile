import axios, { InternalAxiosRequestConfig } from "axios";
import type { RefreshRequest, RefreshResponse } from "./auth-service";
import { clearSession, getSession, saveSession } from "./session-store";

const baseURL = process.env.EXPO_PUBLIC_API_URL ?? "http://192.168.0.19:8000";
const timeout = 10000;

const apiClient = axios.create({ baseURL, timeout });

// Separate client so the refresh call itself never goes through the retry interceptor.
const refreshClient = axios.create({ baseURL, timeout });

type RetriableRequestConfig = InternalAxiosRequestConfig & { _retried?: boolean };

let refreshInFlight: Promise<string | null> | null = null;

async function performRefresh(): Promise<string | null> {
  const session = getSession();
  if (!session) return null;

  try {
    const body: RefreshRequest = { refreshToken: session.refreshToken };
    const { data } = await refreshClient.post<RefreshResponse>("/auth/refresh", body);
    await saveSession({ ...session, ...data });
    return data.accessToken;
  } catch (error) {
    // 400 means the refresh token is dead; the user must start a new auth attempt.
    if (axios.isAxiosError(error) && error.response?.status === 400) {
      await clearSession();
    }
    return null;
  }
}

// Refresh tokens rotate, so concurrent 401s must share one refresh call.
function refreshAccessToken() {
  if (!refreshInFlight) {
    refreshInFlight = performRefresh().finally(() => {
      refreshInFlight = null;
    });
  }
  return refreshInFlight;
}

apiClient.interceptors.request.use((config) => {
  const session = getSession();
  if (session && !config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${session.accessToken}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config as RetriableRequestConfig | undefined;
    const isExpiredAccessToken =
      axios.isAxiosError(error) &&
      error.response?.status === 401 &&
      original?.headers.Authorization &&
      !original._retried;

    if (!isExpiredAccessToken || !original) throw error;

    original._retried = true;
    const newAccessToken = await refreshAccessToken();
    if (!newAccessToken) throw error;

    original.headers.Authorization = `Bearer ${newAccessToken}`;
    return apiClient(original);
  }
);

export default apiClient;
