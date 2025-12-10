import axios from "axios";

export const commonApi = async (
  method,
  url,
  body = {},
  reqHeader = {},
  isFile = false
) => {
  try {
    const isForm = body instanceof FormData;

    const response = await axios({
      method,
      url,
      data: method !== "GET" ? body : undefined,

      // If FormData → DO NOT set Content-Type; Axios handles it automatically.
      headers: isForm
        ? { ...reqHeader }
        : { "Content-Type": "application/json", ...reqHeader },

      withCredentials: true,

      // If downloading file → blob, else JSON
      responseType: isFile ? "blob" : "json",

      // Prevent Axios from modifying FormData (important for PATCH)
      transformRequest: isForm ? [(data) => data] : axios.defaults.transformRequest
    });

    return {
      success: true,
      data: !isFile ? response.data : null,
      url: isFile ? URL.createObjectURL(response.data) : null,
      status: response.status
    };

  } catch (error) {
    return {
      success: false,
      message: error?.response?.data?.message || "Something went wrong",
      status: error?.response?.status || 500,
      error: error?.response
    };
  }
};
