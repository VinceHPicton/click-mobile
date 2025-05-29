import { useEffect, useState } from "react";
import registerAttemptService, {
  RegisterAttempt,
} from "../services/register-attempt-service";
import { produce } from "immer";

const useRegisterAttempt = () => {
  const createRegisterAttempt = async (mobile: string) => {
    const newRegisterAttempt: RegisterAttempt = { mobile };

    try {
      const response = await registerAttemptService.create<RegisterAttempt>(
        newRegisterAttempt
      );
      return response;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  return {
    createRegisterAttempt,
  };
};

export default useRegisterAttempt;
