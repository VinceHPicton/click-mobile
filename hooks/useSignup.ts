import { useContext } from "react";
import { SignupContext, SignupContextType } from "../contexts/SignupContext";

export const useSignup = (): SignupContextType => {
  const context = useContext(SignupContext);
  if (!context) {
    throw new Error("useSignup must be used within a SignupProvider");
  }
  return context;
};
