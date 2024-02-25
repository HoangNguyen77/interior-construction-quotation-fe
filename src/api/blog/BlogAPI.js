import {my_request} from "../Request.js";

async function getBlog(url) {
    const blogList = [];
    //Goi phuong thuc request
    const response = await my_request(url);
    const responseData = response._embedded.blogs;
    console.log(responseData);
    //lay thong tin trang
    const totalPages = response.page.totalPages;
    const totalBlogs = response.page.totalElements;
    for (const key in responseData) {
        blogList.push({
            blogId: responseData[key].blogId,
            description: responseData[key].description,
            title: responseData[key].title,
            createdDate: responseData[key].createdDate
        });
    }
    return {blogList: blogList, totalBlogs: totalBlogs, totalPages: totalPages};
}

export async function getAllBlog(page){

    //Xac dinh endpoint
    const url = `http://localhost:8080/blog?sort=blogId,desc&size=5&page=${page}`;
    return getBlog(url);
}

export async function getBlogByTitle(keyword){
    const url= `http://localhost:8080/blog/search/findByTitleContaining?title=${keyword}&page=0&size=5&sort=blogId,desc`;
    return getBlog(url);
}
export async function getBlogById(blogId){

    const url = `http://localhost:8080/blog/${blogId}`;

    try {
        // Gọi phương thức request
        const response =  await fetch(url);

        if(!response.ok){
            throw new Error('Gặp lỗi trong quá trình gọi API lấy blog!')
        }

        const blogData = await response.json();

        if(blogData){
            return {
                blogId: blogData.blogId,
                description: blogData.description,
                title: blogData.title,
                createdDate: blogData.createdDate
            }
        }else{
            throw new Error('Sách không tồn tài!');
        }
    } catch (error) {
        console.error("Error", error);
        return null;
    }
}