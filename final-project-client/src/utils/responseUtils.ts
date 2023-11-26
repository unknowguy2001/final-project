import { BaseResponse } from "../interfaces/api";

export const hasMessageProperty = (data: unknown): data is BaseResponse => {
  return data !== null && typeof data === "object" && "message" in data;
};
