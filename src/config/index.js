const API_URL = document.domain === "localhost" ? "http://13.233.106.34:4000" : "http://13.233.106.34:4000";


const Apis = {
    // Authntication Api
    GetUserLogin: `${API_URL}/api/customer/login`,
    GetUserRegister: `${API_URL}/api/customer/register`,
    GetCustomerDetails: `${API_URL}/api/customer/getUserByEmailId?email=`,

    // product api
    GetAllGroceryStaple: `${API_URL}/api/product/getAllproductList/`,

};

export {API_URL, Apis};