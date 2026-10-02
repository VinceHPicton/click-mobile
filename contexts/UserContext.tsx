import React, { createContext, useEffect, useState } from "react";
import { deleteUserRequest, logoutRequest } from "../services/auth-service";
import {
  Session,
  clearSession,
  getSession,
  loadSession,
  saveSession,
  subscribeToSession,
} from "../services/session-store";

type User = {
  id: string;
};

export type UserContextType = {
  user: User | null;
  isRestoringSession: boolean;
  signIn: (session: Session) => Promise<void>;
  logout: () => Promise<void>;
  deleteAccount: () => Promise<void>;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

const toUser = (session: Session | null): User | null =>
  session ? { id: session.userId } : null;

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isRestoringSession, setIsRestoringSession] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToSession((session) => setUser(toUser(session)));
    loadSession()
      .then((session) => setUser(toUser(session)))
      .finally(() => setIsRestoringSession(false));
    return unsubscribe;
  }, []);

  const signIn = (session: Session) => saveSession(session);

  const logout = async () => {
    const session = getSession();
    try {
      if (session) await logoutRequest(session.refreshToken);
    } catch (error) {
      console.warn("Server logout failed; clearing local session anyway", error);
    } finally {
      await clearSession();
    }
  };

  const deleteAccount = async () => {
    await deleteUserRequest();
    await clearSession();
  };

  return (
    <UserContext.Provider
      value={{ user, isRestoringSession, signIn, logout, deleteAccount }}
    >
      {children}
    </UserContext.Provider>
  );
};
