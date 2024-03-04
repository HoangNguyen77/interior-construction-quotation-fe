import {my_request} from "../Request.js";

async function getProductImage(url){
    const imageList = [];
    //Goi phuong thuc request
    const response = await my_request(url);
    const responseData = response._embedded.productImages;
    console.log(responseData);
    for (const key in responseData){
        imageList.push({
            imageId: responseData[key].imageId,
            imageData: responseData[key].imageData
        });
    }
    return imageList;
}
export async function getAllProductImages(productId){

    //Xac dinh endpoint
    const url= `http://localhost:8080/detail-product/${productId}/productImageList`;
    //Goi phuong thuc request

    return getProductImage(url);
}
export async function getFirstImageOfProduct(productId){

    //Xac dinh endpoint
    const url= `http://localhost:8080/detail-product/${productId}/productImageList?page=0&size=1`;
    //Goi phuong thuc request
    const images = await getProductImage(url);

    return images.length > 0 ? images[0] : null;
}