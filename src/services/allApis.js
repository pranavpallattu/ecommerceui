import { commonApi } from "./commonApi";
import { serverUrl } from "./serverUrl";

// register api for users
export const signupApi = async (reqBody) => {
  return await commonApi("POST", `${serverUrl}/register`, reqBody, "")
}

// login Api admin and users
export const loginApi = async (reqBody) => {
  return await commonApi("POST", `${serverUrl}/login`, reqBody, "")
}
