import React, { createContext, useState } from "react";
import { postRegisterAttempt } from "../services/register-attempt-service";

type SignupData = {
  email?: string;
  mobile?: string;
};

export type SignupContextType = {
  signupData: SignupData | null;
  registerAttempt: (mobile: string) => Promise<string>;
  registerConfirm: () => Promise<void>;
};

export const SignupContext = createContext<SignupContextType | undefined>(
  undefined
);

export const SignupProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [signupData, setSignupData] = useState<SignupData | null>({
    email: "",
  });

  const registerAttempt = async (mobile: string) => {
    setSignupData((prev) => ({
      email: prev?.email ?? "",
      mobile,
    }));

    let response = await postRegisterAttempt(mobile);
    // TODO: call register-attempt API and persist registerAttemptId on signupData
    return response.data;
  };

  const registerConfirm = async () => {
    // TODO: implement confirm API
  };

  return (
    <SignupContext.Provider
      value={{ signupData, registerAttempt, registerConfirm }}
    >
      {children}
    </SignupContext.Provider>
  );
};
