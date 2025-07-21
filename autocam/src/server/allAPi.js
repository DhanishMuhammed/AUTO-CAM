import { server_url } from "./serverUrl";
import { commonAPI } from "./commonAPI";

// register API
export const registerAPI=async(user)=>{
    return await commonAPI('POST',`${server_url}/register`,user,"")
}

// login API
export const loginAPI=async(user)=>{
    return await commonAPI('POST',`${server_url}/login`,user,"")
}


// add to cart
export const addtocartAPI = async(userId, productId, quantity = 1) => {
    return await commonAPI('POST', `${server_url}/users/cartitems`, {userId, productId, quantity}, );
}

// get cart item
export const getCartItemsAPI = async (userId) => {
  return await commonAPI('GET', `${server_url}/users/cartitems/${userId}`);
};

// delete cart item
export const deleteCartItemAPI = async (userId, productId) => {
  return await commonAPI('DELETE', `${server_url}/users/cartitems/${userId}/${productId}`);
};

// Upload Banner
export const uploadBannerAPI = async (formData) => {
    return await commonAPI('POST', `${server_url}/uploads`, formData, {
        "Content-Type": "multipart/form-data"
    });
};

// Get All Banners
export const getBannerAPI = async () => {
    return await commonAPI('GET', `${server_url}/banners`, "", "");
};

// Delete Banner
export const deleteBannerAPI = async (bannerId) => {
    return await commonAPI('DELETE', `${server_url}/banners/${bannerId}`, "", "");
};

// update product

export const uploadproductAPI = async (data)=>{
    return await commonAPI("POST",`${server_url}/uploads/products`,data,{
        "Content-Type": "multipart/form-data"
    });
}

// get the products
export const getProductAPI = async ()=>{
    return await commonAPI("GET",`${server_url}/products`,"","")
}

//delete product

export const deleteProductAPI =async (productId)=>{
    return await commonAPI("DELETE",`${server_url}/products/${productId}`,"","")
}

//upload sarvices

export const addServiceAPI = async (data) => {
  return await commonAPI("POST", `${server_url}/services`, data, ""); 
};

// get service booked

export const getServicesAPI =async()=>{
    return await commonAPI("GET",`${server_url}/services`,"","")
}

// delete services

export const deleteseviceAPI= async (id)=>{
    return await commonAPI("DELETE",`${server_url}/services/${id}`,"","")
}

// upload servvice Confrime order

export const uploadconfrimOrderAPI= async(data)=>{
    return await commonAPI("POST",`${server_url}/orderconforms`,data,"")
}

// get service confrime order

export const getserviceOrderAPI = async()=>{
    return await commonAPI ("GET",`${server_url}/orderconforms`,"","")
}

//delete service confroimed order

export const deleteconfrimedorderAPI= async(id)=>{
    return await commonAPI("DELETE",`${server_url}/orderconforms/${id}`,"","")
}

// payment upload

export const createOrderAPI = async(data)=>{
    return await commonAPI("POST",`${server_url}/payments/create`,data,"")
}

//veryfy upload

export const verifyPaymentAPI = async(data)=>{
    return await commonAPI("POST",`${server_url}/payments/verify`,data,"")
}

// get all payments

export const getpaymentsAPI =async()=>{
    return await commonAPI("GET",`${server_url}/payments`,"","")
}
