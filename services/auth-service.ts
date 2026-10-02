import apiClient from "./api-client";

export type AuthMode = "login" | "create-user";

export interface AuthAttemptStartRequest {
  mobile: string;
}

export interface AuthAttemptStartResponse {
  id: string;
  oneTimeCode: string;
}

export interface AuthAttemptConfirmRequest {
  id: string;
  oneTimeCode: number;
}

export interface AuthAttemptConfirmResponse {
  userId: string;
  accessToken: string;
  refreshToken: string;
}

export interface RefreshRequest {
  refreshToken: string;
}

export interface RefreshResponse {
  accessToken: string;
  refreshToken: string;
}

export interface LogoutRequest {
  refreshToken: string;
}

export async function startAuthAttempt(mode: AuthMode, mobile: string) {
  const body: AuthAttemptStartRequest = { mobile };
  const { data } = await apiClient.post<AuthAttemptStartResponse>(
    `/auth-attempt/start/${mode}`,
    body
  );
  return data;
}

export async function confirmAuthAttempt(
  mode: AuthMode,
  id: string,
  oneTimeCode: number
) {
  const body: AuthAttemptConfirmRequest = { id, oneTimeCode };
  const { data } = await apiClient.post<AuthAttemptConfirmResponse>(
    `/auth-attempt/confirm/${mode}`,
    body
  );
  return data;
}

export async function logoutRequest(refreshToken: string) {
  const body: LogoutRequest = { refreshToken };
  await apiClient.post("/auth/logout", body);
}

export async function deleteUserRequest() {
  await apiClient.delete("/users");
}
