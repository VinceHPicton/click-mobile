import {
  confirmRegisterAttempt,
  postRegisterAttempt,
} from "../services/register-attempt-service";
import { produce } from "immer";

const useRegisterAttempt = () => {

  const createRegisterAttempt = async (mobile: string) => {
    return await postRegisterAttempt(mobile);
  };

  const sendConfirmationCode = async (code: string) => {
    return await confirmRegisterAttempt(code);
  };

  return {
    createRegisterAttempt,
    sendConfirmationCode,
  };
};

export default useRegisterAttempt;
