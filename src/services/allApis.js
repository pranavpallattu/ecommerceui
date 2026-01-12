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



export const getMeApi = async () => {
  return await commonApi(
    "GET",
    `${serverUrl}/auth/me`,
    {},
    ""
  );
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




export const getCouponsApi=async(search = "", page = 1, limit = 5) =>{
  return await commonApi("GET",`${serverUrl}/admin/coupons?search=${search}&page=${page}&limit=${limit}`, {}, "")
}

export const addCouponApi=async(reqBody) =>{
  return await commonApi("POST",`${serverUrl}/admin/coupons`, reqBody, "")
}

export const editCouponApi=async(id, reqBody) =>{
  return await commonApi("PATCH",`${serverUrl}/admin/coupons/${id}`, reqBody, "")
}

export const updateCouponStatusApi=async(id) =>{
  return await commonApi("PATCH",`${serverUrl}/admin/coupons/${id}/status`, {}, "")
}


export const deleteCouponApi=async(id) =>{
  return await commonApi("DELETE",`${serverUrl}/admin/coupons/${id}`, {}, "")
}






export const getOrdersApi=async(search = "", page = 1, limit = 5) =>{
  return await commonApi("GET",`${serverUrl}/admin/orders?search=${search}&page=${page}&limit=${limit}`, {}, "")
}


export const getOrderApi=async(id) =>{
  return await commonApi("GET",`${serverUrl}/admin/orders/${id}`, {}, "")
}


export const updateOrderStatusApi=async(id,body) =>{
  return await commonApi("PATCH",`${serverUrl}/admin/orders/${id}`, body, "")
}




// export const orderReturnApproveApi=async(id) =>{
//   return await commonApi("PATCH",`${serverUrl}/admin/orders/${id}`, body, "")
// }


/* =======================
   NOTIFICATIONS
======================= */

// Get all return pending notifications (order + item)
export const getReturnPendingNotificationsApi = async () => {
  return await commonApi(
    "GET",
    `${serverUrl}/admin/notifications/returns`,
    {},
    ""
  );
};

/* =======================
   ORDER RETURN
======================= */

// Approve full order return
export const approveOrderReturnApi = async (orderId) => {
  return await commonApi(
    "PATCH",
    `${serverUrl}/admin/orders/${orderId}/return/approve`,
    {},
    ""
  );
};

// Reject full order return
export const rejectOrderReturnApi = async (orderId, reason = "") => {
  return await commonApi(
    "PATCH",
    `${serverUrl}/admin/orders/${orderId}/return/reject`,
    { reason },
    ""
  );
};

/* =======================
   ITEM RETURN
======================= */

// Approve item return
export const approveItemReturnApi = async (orderId, itemId) => {
  return await commonApi(
    "PATCH",
    `${serverUrl}/admin/orders/${orderId}/items/${itemId}/return/approve`,
    {},
    ""
  );
};

// Reject item return
export const rejectItemReturnApi = async (orderId, itemId, reason = "") => {
  return await commonApi(
    "PATCH",
    `${serverUrl}/admin/orders/${orderId}/items/${itemId}/return/reject`,
    { reason },
    ""
  );
};












export const getHomeProductsApi=async()=>{
  return await commonApi("GET",`${serverUrl}/home`,{},"")
}


export const getProductDetailsApi=async(id)=>{
    return await commonApi("GET",`${serverUrl}/productDetails/${id}`,{},"")

}

export const getShopProductsApi = async (
  search = "",
  page = 1,
  limit = 5,
  category = "all",
  sort = "default"
) => {
  return await commonApi(
    "GET",
    `${serverUrl}/products/shop?page=${page}&limit=${limit}&category=${category}&sort=${sort}&search=${search}`,
    {},
    ""
  );
};




export const getWishlistApi=async()=>{
  return await commonApi("GET",`${serverUrl}/wishlist`,{},"")
}

export const addtoWishlistApi=async(productId)=>{
  return await commonApi("POST",`${serverUrl}/wishlist/${productId}`,{},"")
}

export const removeFromWishlistApi=async(productId)=>{
  return await commonApi("DELETE",`${serverUrl}/wishlist/${productId}`,{},"")
}



export const getCartApi=async()=>{
  return await commonApi("GET",`${serverUrl}/cart`,{},"")
}

export const addtoCartApi=async(productId)=>{
  return await commonApi("POST",`${serverUrl}/cart/${productId}`,{},"")
}


export const removeFromCartApi=async(productId)=>{
  return await commonApi("DELETE",`${serverUrl}/cart/${productId}`,{},"")
}

export const updateQuantityApi=async(reqBody)=>{
  return await commonApi("PATCH",`${serverUrl}/cart/updatequantity`,reqBody,"")
}




export const getAvailableCouponsApi=async()=>{
  return await commonApi("GET",`${serverUrl}/cart/coupons`,{},"")
}

export const applyCouponApi=async(reqBody)=>{
  return await commonApi("POST", `${serverUrl}/cart/applyCoupon`,reqBody,"")
}

export const removeCouponApi=async()=>{
  return await commonApi("DELETE", `${serverUrl}/cart/removeCoupon`,{},"")
}


export const getWalletApi = async () => {
  return await commonApi("GET", `${serverUrl}/wallet`,{},"");
};





export const getAddressApi=async()=>{
  return await commonApi("GET", `${serverUrl}/addresses`,{},"")
}

export const addAddressApi=async(reqBody)=>{
  return await commonApi("POST", `${serverUrl}/addresses`,reqBody,"")
}


export const deleteAddressApi=async(id)=>{
  return await commonApi("DELETE", `${serverUrl}/addresses/${id}`,{},"")
}

export const editAddressApi=async(id)=>{
  return await commonApi("PATCH", `${serverUrl}/addresses/${id}`,{},"")
}

