import axios from "axios";

export function getErrorStatus(error: unknown) {
  return axios.isAxiosError(error) ? error.response?.status : undefined;
}

export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    if (!error.response) return "Can't reach the server. Check your connection.";
    const body = error.response.data;
    if (typeof body === "string" && body.trim()) {
      const message = body.trim();
      return message.charAt(0).toUpperCase() + message.slice(1);
    }
    return `Request failed (${error.response.status})`;
  }
  if (error instanceof Error) return error.message;
  return "Something went wrong";
}
