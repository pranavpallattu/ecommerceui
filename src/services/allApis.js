import { commonApi } from "./commonApi";
import { serverUrl } from "./serverUrl";

// register api for users
export const requestAuthOtpApi = async (reqBody) => {
  return await commonApi("POST", `${serverUrl}/auth/requestotp`, reqBody, "");
};

// login Api admin and users
export const verifyAuthOtpApi = async (reqBody) => {
  return await commonApi("POST", `${serverUrl}/auth/verifyotp`, reqBody, "");
};

export const getCategoriesApi = async (search, page, limit) => {
  return await commonApi(
    "GET",
    `${serverUrl}/category/getCategory?search=${search}&page=${page}&limit=${limit}`,
    {},
    ""
  );
};

// allApis.js fixes
export const addCategoryApi = async (reqBody) => {
  return await commonApi("POST", `${serverUrl}/category/add`, reqBody, "");
};

export const editCategoryApi = async (reqBody, id) => {
  return await commonApi("PATCH", `${serverUrl}/category/edit/${id}`, reqBody, "");
};

export const listCategoryApi = async (id) => {
  return await commonApi("POST", `${serverUrl}/category/list/${id}`, {}, "");
};

export const unlistCategoryApi = async (id) => {
  return await commonApi("POST", `${serverUrl}/category/unlist/${id}`, {}, "");
};

export const softDeleteCategoryApi = async (id) => {
  return await commonApi("PATCH", `${serverUrl}/category/softDelete/${id}`, {}, "");
};
