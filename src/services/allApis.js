import { commonApi } from "./commonApi";
import { serverUrl } from "./serverUrl";

//  USER AUTH

// OTP request (shared)
export const requestAuthOtpApi = (reqBody) =>
  commonApi("POST", `${serverUrl}/api/auth/requestotp`, reqBody);

// OTP verify (returns user/admin based on backend)
export const verifyAuthOtpApi = (reqBody) =>
  commonApi("POST", `${serverUrl}/api/auth/verifyotp`, reqBody);

// USER ME
export const getMeApi = () => commonApi("GET", `${serverUrl}/api/auth/me`);

// USER LOGOUT
export const logoutApi = () =>
  commonApi("POST", `${serverUrl}/api/auth/logout`);

export const getCategoriesApi = async (search, page, limit) => {
  return await commonApi(
    "GET",
    `${serverUrl}/api/admin/category/getCategory?search=${search}&page=${page}&limit=${limit}`,
    {},
    "",
  );
};

export const getActiveCategoriesApi = async () => {
  return await commonApi(
    "GET",
    `${serverUrl}/api/admin/categories/active`,
    {},
    "",
  );
};


// allApis.js fixes
export const addCategoryApi = async (reqBody) => {
  return await commonApi(
    "POST",
    `${serverUrl}/api/admin/category/add`,
    reqBody,
    "",
  );
};

export const editCategoryApi = async (reqBody, id) => {
  return await commonApi(
    "PUT",
    `${serverUrl}/api/admin/category/edit/${id}`,
    reqBody,
    "",
  );
};

export const listCategoryApi = async (id) => {
  return await commonApi(
    "POST",
    `${serverUrl}/api/admin/category/list/${id}`,
    {},
    "",
  );
};

export const unlistCategoryApi = async (id) => {
  return await commonApi(
    "POST",
    `${serverUrl}/api/admin/category/unlist/${id}`,
    {},
    "",
  );
};

export const softDeleteCategoryApi = async (id) => {
  return await commonApi(
    "PUT",
    `${serverUrl}/api/admin/category/softDelete/${id}`,
    {},
    "",
  );
};

// GET /admin/customers?search=&page=&limit=
export const getAllCustomersApi = async (search = "", page = 1, limit = 5) => {
  return await commonApi(
    "GET",
    `${serverUrl}/api/admin/customers?search=${search}&page=${page}&limit=${limit}`,
    {},
    "",
  );
};

// PUT /admin/user/:id
export const updateUserStatusApi = async (id) => {
  return await commonApi("PUT", `${serverUrl}/api/admin/user/${id}`, {}, "");
};

// src/services/allApis.js

// GET Sales Report
export const getSalesReportApi = async ({ filterType, startDate, endDate }) => {
  return await commonApi(
    "GET",
    `${serverUrl}/api/admin/getsalesreport?filterType=${filterType}&startDate=${startDate}&endDate=${endDate}`,
    {},
    "",
  );
};

// Download PDF Report
export const downloadSalesPDFApi = async (payload = {}) => {
  return await commonApi(
    "POST",
    `${serverUrl}/api/admin/report/pdf`,
    payload,
    "",
    true,
  );
};

// Download Excel Report
export const downloadSalesExcelApi = async (payload = {}) => {
  return await commonApi(
    "POST",
    `${serverUrl}/api/admin/report/excel`,
    payload,
    "",
    true,
  );
};

export const getOrderSummaryApi = async (filter = {}) => {
  const query = new URLSearchParams(filter).toString();
  return await commonApi(
    "GET",
    `${serverUrl}/api/admin/ordersummary?${query}`,
    {},
  );
};

export const getBestProductsApi = async () => {
  return await commonApi(
    "GET",
    `${serverUrl}/api/admin/bestsellingproducts`,
    {},
    "",
  );
};

export const getBestCategoriesApi = async () => {
  return await commonApi(
    "GET",
    `${serverUrl}/api/admin/bestsellingcategories`,
    {},
    "",
  );
};

// GET /products
export const getProductsApi = async (search = "", page = 1, limit = 10) => {
  const query = new URLSearchParams({ search, page, limit }).toString();
  return await commonApi("GET", `${serverUrl}/api/admin/products?${query}`, {});
};

// GET /product/:id
export const getProductByIdApi = async (id) => {
  return await commonApi("GET", `${serverUrl}/api/admin/product/${id}`, {});
};

// POST /product/addProduct
export const addProductApi = async (formData) => {
  return await commonApi(
    "POST",
    `${serverUrl}/api/admin/product/addProduct`,
    formData,
  );
};

// PUT /product/editProduct/:id
export const editProductApi = async (id, formData) => {
  return await commonApi(
    "PUT",
    `${serverUrl}/api/admin/product/editProduct/${id}`,
    formData,
  );
};

// PUT /product/list/:id
export const listProductApi = async (id) => {
  return await commonApi(
    "PUT",
    `${serverUrl}/api/admin/product/list/${id}`,
    {},
  );
};

// PUT /product/unlist/:id
export const unlistProductApi = async (id) => {
  return await commonApi(
    "PUT",
    `${serverUrl}/api/admin/product/unlist/${id}`,
    {},
  );
};

// DELETE /product/delete/:id
export const softDeleteProductApi = async (id) => {
  return await commonApi(
    "DELETE",
    `${serverUrl}/api/admin/product/delete/${id}`,
    {},
  );
};

export const getCouponsApi = async (search = "", page = 1, limit = 5) => {
  return await commonApi(
    "GET",
    `${serverUrl}/api/admin/coupons?search=${search}&page=${page}&limit=${limit}`,
    {},
    "",
  );
};

export const addCouponApi = async (reqBody) => {
  return await commonApi("POST", `${serverUrl}/api/admin/coupons`, reqBody, "");
};

export const editCouponApi = async (id, reqBody) => {
  return await commonApi(
    "PUT",
    `${serverUrl}/api/admin/coupons/${id}`,
    reqBody,
    "",
  );
};

export const updateCouponStatusApi = async (id) => {
  return await commonApi(
    "PUT",
    `${serverUrl}/api/admin/coupons/${id}/status`,
    {},
    "",
  );
};

export const deleteCouponApi = async (id) => {
  return await commonApi(
    "DELETE",
    `${serverUrl}/api/admin/coupons/${id}`,
    {},
    "",
  );
};

export const getOrdersApi = async (search = "", page = 1, limit = 5) => {
  return await commonApi(
    "GET",
    `${serverUrl}/api/admin/orders?search=${search}&page=${page}&limit=${limit}`,
    {},
    "",
  );
};

export const getOrderApi = async (id) => {
  return await commonApi("GET", `${serverUrl}/api/admin/orders/${id}`, {}, "");
};

export const updateOrderStatusApi = async (id, body) => {
  return await commonApi(
    "PUT",
    `${serverUrl}/api/admin/orders/${id}`,
    body,
    "",
  );
};

//  NOTIFICATIONS

// Get all return pending notifications (order + item)
export const getReturnPendingNotificationsApi = async () => {
  return await commonApi(
    "GET",
    `${serverUrl}/api/admin/notifications/returns`,
    {},
    "",
  );
};

//  ORDER RETURN

// Approve full order return
export const approveOrderReturnApi = async (orderId) => {
  return await commonApi(
    "PUT",
    `${serverUrl}/api/admin/orders/${orderId}/return/approve`,
    {},
    "",
  );
};

// Reject full order return
export const rejectOrderReturnApi = async (orderId, reason = "") => {
  return await commonApi(
    "PUT",
    `${serverUrl}/api/admin/orders/${orderId}/return/reject`,
    { reason },
    "",
  );
};

//  ITEM RETURN

// Approve item return
export const approveItemReturnApi = async (orderId, itemId) => {
  return await commonApi(
    "PUT",
    `${serverUrl}/api/admin/orders/${orderId}/items/${itemId}/return/approve`,
    {},
    "",
  );
};

// Reject item return
export const rejectItemReturnApi = async (orderId, itemId, reason = "") => {
  return await commonApi(
    "PUT",
    `${serverUrl}/api/admin/orders/${orderId}/items/${itemId}/return/reject`,
    { reason },
    "",
  );
};

export const getHomeProductsApi = async () => {
  return await commonApi("GET", `${serverUrl}/api/user/home`, {}, "");
};

export const getProductDetailsApi = async (id) => {
  return await commonApi(
    "GET",
    `${serverUrl}/api/user/productDetails/${id}`,
    {},
    "",
  );
};

export const getShopProductsApi = async (
  search = "",
  page = 1,
  limit = 5,
  category = "all",
  sort = "default",
) => {
  return await commonApi(
    "GET",
    `${serverUrl}/api/user/products/shop?page=${page}&limit=${limit}&category=${category}&sort=${sort}&search=${search}`,
    {},
    "",
  );
};

export const getWishlistApi = async () => {
  return await commonApi("GET", `${serverUrl}/api/user/wishlist`, {}, "");
};

export const addtoWishlistApi = async (productId) => {
  return await commonApi(
    "POST",
    `${serverUrl}/api/user/wishlist/${productId}`,
    {},
    "",
  );
};

export const removeFromWishlistApi = async (productId) => {
  return await commonApi(
    "DELETE",
    `${serverUrl}/api/user/wishlist/${productId}`,
    {},
    "",
  );
};

export const getCartApi = async () => {
  return await commonApi("GET", `${serverUrl}/api/user/cart`, {}, "");
};

export const addtoCartApi = async (productId) => {
  return await commonApi(
    "POST",
    `${serverUrl}/api/user/cart/${productId}`,
    {},
    "",
  );
};

export const removeFromCartApi = async (productId) => {
  return await commonApi(
    "DELETE",
    `${serverUrl}/api/user/cart/${productId}`,
    {},
    "",
  );
};

export const updateQuantityApi = async (reqBody) => {
  return await commonApi(
    "PUT",
    `${serverUrl}/api/user/cart/updatequantity`,
    reqBody,
    "",
  );
};

export const getAvailableCouponsApi = async () => {
  return await commonApi("GET", `${serverUrl}/api/user/cart/coupons`, {}, "");
};

export const applyCouponApi = async (reqBody) => {
  return await commonApi(
    "POST",
    `${serverUrl}/api/user/cart/applyCoupon`,
    reqBody,
    "",
  );
};

export const removeCouponApi = async () => {
  return await commonApi(
    "DELETE",
    `${serverUrl}/api/user/cart/removeCoupon`,
    {},
    "",
  );
};

export const applyBuyNowCouponApi = async (buyNowId, reqBody) => {
  return await commonApi(
    "POST",
    `${serverUrl}/api/user/buy-now/${buyNowId}/applyCoupon`,
    reqBody,
    "",
  );
};

export const removeBuyNowCouponApi = async (buyNowId) => {
  return await commonApi(
    "DELETE",
    `${serverUrl}/api/user/buy-now/${buyNowId}/removeCoupon`,
    {},
    "",
  );
};

export const getWalletApi = async (page = 1, limit = 10) => {
  return await commonApi(
    "GET",
    `${serverUrl}/api/user/wallet?page=${page}&limit=${limit}`,
    {},
    "",
  );
};

export const getAddressApi = async () => {
  return await commonApi("GET", `${serverUrl}/api/user/addresses`, {}, "");
};

export const addAddressApi = async (reqBody) => {
  return await commonApi(
    "POST",
    `${serverUrl}/api/user/addresses`,
    reqBody,
    "",
  );
};

export const deleteAddressApi = async (id) => {
  return await commonApi(
    "DELETE",
    `${serverUrl}/api/user/addresses/${id}`,
    {},
    "",
  );
};

export const editAddressApi = async (id, reqBody) => {
  return await commonApi(
    "PUT",
    `${serverUrl}/api/user/addresses/${id}`,
    reqBody,
    "",
  );
};

export const getUserOrdersApi = async (params = {}) => {
  return await commonApi(
    "GET",
    `${serverUrl}/api/user/orders`,
    {},
    {},
    false,
    params
  );
};
export const getOrderByIdApi = async (orderId) => {
  return await commonApi(
    "GET",
    `${serverUrl}/api/user/orders/${orderId}`,
    {},
    "",
  );
};

export const cancelOrderApi = async (orderId, reqBody) => {
  return await commonApi(
    "POST",
    `${serverUrl}/api/user/orders/cancel/request/${orderId}`,
    reqBody,
    "",
  );
};

export const cancelItemApi = async (orderId, itemId, reqBody) => {
  return await commonApi(
    "POST",
    `${serverUrl}/api/user/orders/cancel/request/${orderId}/${itemId}`,
    reqBody,
    "",
  );
};

export const placeOrderApi = async (reqBody) => {
  return await commonApi(
    "POST",
    `${serverUrl}/api/user/orders/place`,
    reqBody,
    "",
  );
};

export const createRazorpayOrderApi = async (amount) => {
  return await commonApi(
    "POST",
    `${serverUrl}/api/user/orders/razorpay/create`,
    { amount },
    "",
  );
};

export const verifyRazorpayPaymentApi = async (reqBody) => {
  return await commonApi(
    "POST",
    `${serverUrl}/api/user/orders/razorpay/verify`,
    reqBody,
    "",
  );
};

export const createBuynowApi = async (reqBody) => {
  return await commonApi("POST", `${serverUrl}/api/user/buy-now`, reqBody, "");
};

export const getBuynowCheckoutApi = async (buynowCheckoutId) => {
  return await commonApi(
    "GET",
    `${serverUrl}/api/user/buy-now/${buynowCheckoutId}/checkout`,
    {},
    "",
  );
};

//  BUY NOW

//  PLACE BUY NOW ORDER
export const placeBuyNowOrderApi = async (reqBody) => {
  return await commonApi(
    "POST",
    `${serverUrl}/api/user/buy-now/place-order`,
    reqBody,
    "",
  );
};

//  BUY NOW RAZORPAY

// Create Razorpay order for Buy Now
export const createBuyNowRazorpayOrderApi = async (reqBody) => {
  return await commonApi(
    "POST",
    `${serverUrl}/api/user/buy-now/razorpay/create-order`,
    reqBody,
    "",
  );
};

// Verify Razorpay payment for Buy Now
export const verifyBuyNowRazorpayPaymentApi = async (reqBody) => {
  return await commonApi(
    "POST",
    `${serverUrl}/api/user/buynow/razorpay/verify-payment`,
    reqBody,
    "",
  );
};

// item return
export const itemReturnApi = async (orderId, itemId, reqBody) => {
  return await commonApi(
    "POST",
    `${serverUrl}/api/user/orders/return/request/${orderId}/${itemId}`,
    reqBody,
    "",
  );
};

export const orderReturnApi = async (orderId, reqBody) => {
  return await commonApi(
    "POST",
    `${serverUrl}/api/user/orders/return/request/${orderId}`,
    reqBody,
    "",
  );
};
