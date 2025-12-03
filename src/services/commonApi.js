import axios from "axios";

export const commonApi = async (
  method,
  url,
  body = {},
  reqHeader,
  isFile = false
) => {
  try {
    const response = await axios({
      method,
      url,
      data: method !== "GET" ? body : undefined,
      headers: reqHeader || { "Content-Type": "application/json" },
      withCredentials: true,
      responseType: isFile ? "blob" : "json",
    });

    return {
      success: true,
      url: isFile ? URL.createObjectURL(response.data) : null,
      data: !isFile ? response.data : null,
      status: response.status,
    };
  } catch (error) {
    return {
      success: false,
      message: error?.response?.data?.message || "Something went wrong",
      status: error?.response?.status || 500,
      error: error.response,
    };
  }
};
