import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

export interface Session {
  userId: string;
  accessToken: string;
  refreshToken: string;
}

type SessionListener = (session: Session | null) => void;

const SESSION_KEY = "click.session";

// SecureStore has no web implementation, so web falls back to localStorage (dev only, not secure).
const storage =
  Platform.OS === "web"
    ? {
        getItem: async (key: string) => globalThis.localStorage?.getItem(key) ?? null,
        setItem: async (key: string, value: string) => globalThis.localStorage?.setItem(key, value),
        deleteItem: async (key: string) => globalThis.localStorage?.removeItem(key),
      }
    : {
        getItem: SecureStore.getItemAsync,
        setItem: SecureStore.setItemAsync,
        deleteItem: SecureStore.deleteItemAsync,
      };

let currentSession: Session | null = null;
const listeners = new Set<SessionListener>();

const notifyListeners = () => listeners.forEach((listener) => listener(currentSession));

export const getSession = () => currentSession;

export async function loadSession(): Promise<Session | null> {
  try {
    const raw = await storage.getItem(SESSION_KEY);
    currentSession = raw ? (JSON.parse(raw) as Session) : null;
  } catch (error) {
    console.warn("Failed to load stored session", error);
    currentSession = null;
  }
  return currentSession;
}

export async function saveSession(session: Session) {
  currentSession = session;
  notifyListeners();
  await storage.setItem(SESSION_KEY, JSON.stringify(session));
}

export async function clearSession() {
  currentSession = null;
  notifyListeners();
  await storage.deleteItem(SESSION_KEY);
}

export function subscribeToSession(listener: SessionListener) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
