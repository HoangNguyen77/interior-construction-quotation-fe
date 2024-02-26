import {my_request} from "../Request.js";

async function getBlogImage(url){
    const imageList = [];
    //Goi phuong thuc request
    const response = await my_request(url);
    const responseData = response._embedded.blogImages;
    console.log(responseData);
    for (const key in responseData){
        imageList.push({
            imageId: responseData[key].imageId,
            imageData: responseData[key].imageData
        });
    }
    return imageList;
}
export async function getAllBLogImage(blogId){

    //Xac dinh endpoint
    const url= `http://localhost:8080/blog/${blogId}/imageList`;
    //Goi phuong thuc request

    return getBlogImage(url);
}
export async function get1ImageOfABlog(blogId){

    //Xac dinh endpoint
    const url= `http://localhost:8080/blog/${blogId}/imageList?sort=imageId,asc&page=0&size=1`;
    //Goi phuong thuc request

    return getBlogImage(url);
}