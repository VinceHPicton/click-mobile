import apiClient from "./api-client";
import createHttpService from "./http-service";

export interface RegisterAttempt {
  mobile: string;
}

/** Body for verifying the SMS/code step after POST /register-attempt */
export interface ConfirmRegisterAttempt {
  mobile: string;
  code: string;
}

const registerAttemptApi = createHttpService("/register-attempt");

export function postRegisterAttempt(mobile: string) {
  const payload: RegisterAttempt = { mobile };
  return registerAttemptApi.create<RegisterAttempt>(payload);
}

/** POST /register-attempt/confirm — adjust path if your API differs */
export function confirmRegisterAttempt(code: string) {
  return apiClient.post("/register-attempt/confirm", code);
}

export default registerAttemptApi;
