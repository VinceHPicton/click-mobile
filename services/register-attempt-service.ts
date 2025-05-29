import apiClient from "./api-client";
import create from "./http-service";

export interface RegisterAttempt {
  mobile: string;
}

export default create("/register-attempt");

class RegisterAttemptService {
  getAllUsers() {
    const controller = new AbortController();
    const request = apiClient.post<RegisterAttempt>("/register-attempt", {
      signal: controller.signal,
    });
    return { request, cancel: () => controller.abort() };
  }
}
