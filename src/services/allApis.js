import { commonApi } from "./commonApi";
import { serverUrl } from "./serverUrl";

// register api for users
export const requestAuthOtpApi = async (reqBody) => {
  return await commonApi("POST", `${serverUrl}/auth/requestotp`, reqBody, "")
}

// login Api admin and users
export const verifyAuthOtpApi = async (reqBody) => {
  return await commonApi("POST", `${serverUrl}/auth/verifyotp`, reqBody, "")
}


export const getCategoriesApi