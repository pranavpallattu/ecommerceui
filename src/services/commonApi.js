import axios from "axios";

export const commonApi = async (method, url, body = {}, reqHeader) => {
  try {
    const response = await axios({
      method,
      url,
      data: method !== "GET" ? body : undefined,
      headers: reqHeader || { "Content-Type": "application/json" },
    });

    return {
      success: true,
      data: response.data,
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
