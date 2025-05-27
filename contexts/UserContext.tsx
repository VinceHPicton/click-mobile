import React, { createContext, useContext, useState } from "react";

type User = {
  id: string;
  email: string;
};

export type UserContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    // TODO: implement login logic
  };

  const logout = async () => {
    // TODO: implement logout logic
  };

  const register = async (email: string, password: string) => {
    // TODO: implement registration logic
  };

  return (
    <UserContext.Provider value={{ user, login, logout, register }}>
      {children}
    </UserContext.Provider>
  );
};
