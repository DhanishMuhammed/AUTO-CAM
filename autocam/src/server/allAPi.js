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
