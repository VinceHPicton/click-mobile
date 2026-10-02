import React, { createContext, useState } from "react";
import {
  AuthMode,
  confirmAuthAttempt,
  startAuthAttempt,
} from "../services/auth-service";
import { useUser } from "../hooks/useUser";

type AuthAttempt = {
  mode: AuthMode;
  mobile: string;
  id: string;
  devOneTimeCode: string;
};

export type SignupContextType = {
  attempt: AuthAttempt | null;
  startAttempt: (mode: AuthMode, mobile: string) => Promise<void>;
  confirmAttempt: (oneTimeCode: string) => Promise<void>;
};

export const SignupContext = createContext<SignupContextType | undefined>(
  undefined
);

export const SignupProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { signIn } = useUser();
  const [attempt, setAttempt] = useState<AuthAttempt | null>(null);

  const startAttempt = async (mode: AuthMode, mobile: string) => {
    const response = await startAuthAttempt(mode, mobile);
    setAttempt({
      mode,
      mobile,
      id: response.id,
      devOneTimeCode: response.oneTimeCode,
    });
  };

  const confirmAttempt = async (oneTimeCode: string) => {
    if (!attempt) throw new Error("No sign-in in progress. Please start again.");
    const session = await confirmAuthAttempt(
      attempt.mode,
      attempt.id,
      Number(oneTimeCode)
    );
    await signIn(session);
    setAttempt(null);
  };

  return (
    <SignupContext.Provider value={{ attempt, startAttempt, confirmAttempt }}>
      {children}
    </SignupContext.Provider>
  );
};
