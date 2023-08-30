const API_URL =
  document.domain === "localhost"
    ? "http://3.25.175.163:4000"
    : "http://3.25.175.163:4000";

const Apis = {
  //banner api
  GetBannerImage: `${API_URL}/api/cover/getAllCover`,

  //pages api
  GetAllPagesContent: `${API_URL}/api/content/1`,

  // Authntication Api
  GetUserLogin: `${API_URL}/api/customer/login`,
  GetUserRegister: `${API_URL}/api/customer/register`,
  GetCustomerDetails: `${API_URL}/api/customer/getUserByEmailId?email=`,

  // GetegoryList Api
  GetCategoryList: `${API_URL}/api/category/sub-list`,

  // product api
  GetAllGroceryStaple: `${API_URL}/api/product/getAllproductList/`,
  GetProductById: `${API_URL}/api/product/getWebProductById?id=`,
  GetAllProductList: `${API_URL}/api/product/list/`,

  //Get filter by product
  GetProductByFilter: `${API_URL}/api/product/gcatalogsearch/result?search=`,
  GetCategoryListByFilter: `${API_URL}/api/category/catlogsearch/child-category`,
  GetProductBySubcategory: `${API_URL}/api/category/catlogsearch/product`,
  GetProductByCategory: `${API_URL}/api/product/getProductByCategory`,

  //Get location
  GetLocationListDetails: `${API_URL}/api/location/list`,
  GetAreaListDetails: `${API_URL}/api/location/area/list/getbyid?id=`,

  //profile
  GetCustomerUpdateDetails: `${API_URL}/api/customer/update`,

  //Razarpayment
  GetPaymentValue: `${API_URL}/api/payment/orders`,
  GetPaymentVerification: `${API_URL}/api/payment/verification`,
  GetPaymentOrderList: `${API_URL}/api/payment/orderlist`,

  // product api
  GetOrderCreateByUser: `${API_URL}/api/order/create`,
  GetOrderByUser: `${API_URL}/api/order/list`,
};

export { API_URL, Apis };
