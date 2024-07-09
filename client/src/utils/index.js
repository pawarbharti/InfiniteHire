import axios from "axios";
const API_URL = `http://localhost:8800/api-v1`;

export const API = axios.create({
    baseURL: API_URL,
    responseType: `json`,
});

export const apiRequest = async ({url,token,data,method})=>{
    try {
        const result = await API(url ,{
            method: method || "GET",
            data: data,
            headers: {
                'Content-Type': 'application/json',
                Authorization: token ? `Bearer ${token}`: '',
            },
        });
        return result.data;
    } catch (error) {
        const err = error.response.data;
        console.log(err);
        console.error(`API request failed: ${error.message}`);
        return{ status: err.success, message: err.message };
    
    }
};

export const handleFileUpload = async (uploadFile) => {
    const formData = new FormData();
    formData.append('file', uploadFile);
    formData.append('upload_preset', 'InfiniteHire');

    try{
        const response = await axios.post(`https://api.cloudinary.com/v1_1/dhbbngxbk/image/upload/`, formData
        );
        return response.data.secure_url;
    }catch(error){
        console.error(`File upload failed: ${error.message}`);
        return null;
    }
}

export const updateURL = ({
    pageNum,
    query,
    sort,
    navigate,
    location,
    cmpLoc,
    jType,
    exp,

}) => {
    const params = new URLSearchParams();

    if (pageNum && pageNum > 1) params.set("page", pageNum);
    if (query) params.set("search", query);
    if (sort) params.set("sort", sort);
    if (cmpLoc) params.set("location", cmpLoc);
    if (jType) params.set("jtype", jType);
    if (exp) params.set("exp", exp);

    console.log(location,"location");
    const newURL = `${location.pathname}?${params.toString()}`;
    navigate(newURL, {replace: true});
    console.log(newURL,'newUrl')

    return newURL;
}
