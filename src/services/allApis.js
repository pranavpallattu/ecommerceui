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



// GET /admin/customers?search=&page=&limit=
export const getAllCustomersApi = async (search = "", page = 1, limit = 5) => {
  return await commonApi(
    "GET",
    `${serverUrl}/admin/customers?search=${search}&page=${page}&limit=${limit}`,
    {},
    ""
  );
};

// PATCH /admin/user/:id
export const updateUserStatusApi = async (id) => {
  return await commonApi("PATCH", `${serverUrl}/admin/user/${id}`, {}, "");
};




// src/services/allApis.js

// GET Sales Report
export const getSalesReportApi = async ({filterType, startDate,endDate}) => {
  return await commonApi("GET", `${serverUrl}/admin/getsalesreport?filterType=${filterType}&startDate=${startDate},&endDate=${endDate}`,{} , "");
};

// Download PDF Report
export const downloadSalesPDFApi = async (payload = {}) => {
  return await commonApi("POST", `${serverUrl}/admin/report/pdf`, payload, "", true);
};

// Download Excel Report
export const downloadSalesExcelApi = async (payload = {}) => {
  return await commonApi("POST", `${serverUrl}/admin/report/excel`, payload, "", true);
};



export const getOrderSummaryApi = async (filter = {}) => {
  const query = new URLSearchParams(filter).toString();
  return await commonApi("GET", `${serverUrl}/admin/ordersummary?${query}`, {});
};

export const getBestProductsApi = async () => {
  return await commonApi("GET", `${serverUrl}/admin/bestsellingproducts`,{} , "");
};

export const getBestCategoriesApi = async () => {
  return await commonApi("GET", `${serverUrl}/admin/bestsellingcategories`,{} , "");
};





// src/services/allApis.js

// GET /products
export const getProductsApi = async (search = "", page = 1, limit = 10) => {
  const query = new URLSearchParams({ search, page, limit }).toString();
  return await commonApi("GET", `${serverUrl}/products?${query}`, {});
};

// GET /product/:id
export const getProductByIdApi = async (id) => {
  return await commonApi("GET", `${serverUrl}/product/${id}`, {});
};

// POST /product/addProduct
export const addProductApi = async (formData) => {
  return await commonApi("POST", `${serverUrl}/product/addProduct`, formData, {}, true);
};


// PATCH /product/editProduct/:id
export const editProductApi = async (id, formData) => {
  return await commonApi("PUT", `${serverUrl}/product/editProduct/${id}`, formData, {}, true);
};

// PATCH /product/list/:id
export const listProductApi = async (id) => {
  return await commonApi("PATCH", `${serverUrl}/product/list/${id}`, {});
};

// PATCH /product/unlist/:id
export const unlistProductApi = async (id) => {
  return await commonApi("PATCH", `${serverUrl}/product/unlist/${id}`, {});
};

// DELETE /product/delete/:id
export const softDeleteProductApi = async (id) => {
  return await commonApi("DELETE", `${serverUrl}/product/delete/${id}`, {});
};