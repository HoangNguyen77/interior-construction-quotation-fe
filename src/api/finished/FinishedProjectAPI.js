import {my_request} from "../Request.js";
import {get1ImageOfABlog} from "../blog/BlogImageAPI.js";

export async function getFinishedQuotation(page, keyword) {
    const url = `http://localhost:8080/finished/quotation-without-construct?keyword=${keyword}&page=${page}&size=5&sort=headerId,desc`
    const quotationList = [];
    //Goi phuong thuc request
    const response = await my_request(url);
    const responseData = response.content;
    console.log(responseData);
    //lay thong tin trang
    const totalPages = response.totalPages;
    const totalQuotation = response.totalElements;
    for (const key in responseData) {
        quotationList.push({
            headerId: responseData[key].headerId,
            listId: responseData[key].listId,
            firstName: responseData[key].firstName,
            lastName: responseData[key].lastName,
            createdDate: responseData[key].createdDate,
            constructionName: responseData[key].constructionName,
            hasProject : responseData[key].hasProject,
            constructed: responseData[key].constructed
        });
    }
    console.log(quotationList);
    console.log(totalQuotation);
    console.log(totalPages);
    return {quotationList: quotationList, totalQuotation: totalQuotation, totalPages: totalPages};
}
export async function getFinishedQuotationWithStatus(page, keyword, option) {
    const url = `http://localhost:8080/finished/quotation?keyword=${keyword}&isConstructed=${option}&page=${page}&size=5&sort=headerId,desc`
    const quotationList = [];
    //Goi phuong thuc request
    const response = await my_request(url);
    const responseData = response.content;
    console.log(responseData);
    //lay thong tin trang
    const totalPages = response.totalPages;
    const totalQuotation = response.totalElements;
    for (const key in responseData) {
        quotationList.push({
            headerId: responseData[key].headerId,
            listId: responseData[key].listId,
            firstName: responseData[key].firstName,
            lastName: responseData[key].lastName,
            createdDate: responseData[key].createdDate,
            constructionName: responseData[key].constructionName,
            hasProject : responseData[key].hasProject,
            constructed: responseData[key].constructed
        });
    }
    return {quotationList: quotationList, totalQuotation: totalQuotation, totalPages: totalPages};
}
//FINISHED PROJECT
export async function getFinishedProjectsByTitle(page, keyword, size) {
    // Xác định endpoint
    const url = `http://localhost:8080/finished/search/findByTitleContaining?title=${keyword}&page=${page}&size=${size}&sort=projectId,desc`;
    try {
        const response = await my_request(url); // Assuming my_request is an async function that handles the fetch
        const responseData = response._embedded.finishedProjects;
        const totalProject = response.page.totalElements;
        const totalPage = response.page.totalPages;
        // Transform each blog into a promise that resolves to the blog with additional details
        const projectDetailsPromises = responseData.map(async (project) => {
            try {
                console.log("projectId: " + project.projectId)
                const imageDetails = await get1ImageOfAProject(project.projectId);
                return {
                    ...project,
                    image: imageDetails.imageData
                };
            } catch (error) {
                console.error('Error fetching image details for project:', error);
                // In case of an error fetching image details, return the blog without image data
                return project;
            }
        });

        // Wait for all promises to resolve
        const projectList = await Promise.all(projectDetailsPromises);
        console.log(projectList);
        return { projectList: projectList, totalProject: totalProject, totalPage: totalPage };
    } catch (error) {
        console.error("Error", error);
        return null;
    }
}
export async function getFinishedProjectById(projectId){

    const url = `http://localhost:8080/finished/${projectId}`;

    try {
        // Gọi phương thức request
        const response =  await fetch(url);

        if(!response.ok){
            throw new Error('Gặp lỗi trong quá trình gọi API lấy project!')
        }

        const projectData = await response.json();

        if(projectData){
            return {
                projectId: projectData.projectId,
                title: projectData.title,
                content: projectData.content,
                finishedDate: projectData.finishedDate
            }
        }else{
            throw new Error('BLog không tồn tại!');
        }
    } catch (error) {
        console.error("Error", error);
        return null;
    }
}
async function get1ImageOfAProject(projectId){

    // Define endpoint
    const url= `http://localhost:8080/finished/${projectId}/imageList?sort=imageId,asc&page=0&size=1`;
    // Fetch images
    const imageList = [];
    //Goi phuong thuc request
    const response = await my_request(url);
    const responseData = response._embedded.finishedProjectImages;
    // console.log(responseData);
    for (const key in responseData){
        imageList.push({
            imageId: responseData[key].imageId,
            imageData: responseData[key].imageData
        });
    }

    console.log("imagedata: "+ imageList);
    // Return the first image, or null if no images are found
    return imageList.length > 0 ? imageList[0] : null;
}
export async function getAllProjectImageData(projectId){
    const url= `http://localhost:8080/finished/${projectId}/imageList`;
    const imageList = [];
    //Goi phuong thuc request
    const response = await my_request(url);
    const responseData = response._embedded.finishedProjectImages;
    // console.log(responseData);
    for (const key in responseData){
        imageList.push({
            imageData: responseData[key].imageData
        });
    }
    return imageList;
}