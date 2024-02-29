import {my_request} from "../Request.js";
import {get1ImageOfABlog} from "./BlogImageAPI.js";

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
export async function get3NewBlog() {
    // Xác định endpoint
    const url = `http://localhost:8080/blog?sort=blogId,desc&size=3&page=0`;
    try {
        const response = await my_request(url); // Assuming my_request is an async function that handles the fetch
        const responseData = response._embedded.blogs;

        // Transform each blog into a promise that resolves to the blog with additional details
        const blogDetailsPromises = responseData.map(async (blog) => {
            try {
                const imageDetails = await get1ImageOfABlog(blog.blogId);
                return {
                    ...blog,
                    image: imageDetails.imageData
                };
            } catch (error) {
                console.error('Error fetching image details for blog:', error);
                // In case of an error fetching image details, return the blog without image data
                return blog;
            }
        });

        // Wait for all promises to resolve
        const blogList = await Promise.all(blogDetailsPromises);
        console.log(blogList);
        return { blogList };
    } catch (error) {
        console.error("Error", error);
        return null;
    }
}

export async function getBlogByTitle(keyword, page){
    const url= `http://localhost:8080/blog/search/findByTitleContaining?title=${keyword}&page=${page}&size=5&sort=blogId,desc`;
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
            throw new Error('BLog không tồn tại!');
        }
    } catch (error) {
        console.error("Error", error);
        return null;
    }
}
export async function getBlogWithUsernameById(blogId){

    const url = `http://localhost:8080/blog/search/findBlogWithUserNameByBlogId?blogId=${blogId}`;

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
                createdDate: blogData.createdDate,
                firstName: blogData.firstName,
                lastName: blogData.lastName
            }
        }else{
            throw new Error('BLog không tồn tại!');
        }
    } catch (error) {
        console.error("Error", error);
        return null;
    }
}
export async function getAllBlogWithUsername(page) {
    const url = `http://localhost:8080/blog?sort=blogId,desc&size=4&page=${page}`;
    try {
        const response = await my_request(url); // Assuming my_request is an async function that handles the fetch
        const responseData = response._embedded.blogs;
        const totalPages = response.page.totalPages;
        const totalBlogs = response.page.totalElements;

        // Transform each blog into a promise that resolves to the blog with additional details
        const blogDetailsPromises = responseData.map(async (blog) => {
            const [userDetails, imageDetails] = await Promise.all([getBlogWithUsernameById(blog.blogId), get1ImageOfABlog(blog.blogId)]);

            // Merge blog details with user and image details
            return {
                ...blog,
                firstName: userDetails.firstName,
                lastName: userDetails.lastName,
                image: imageDetails.imageData
            };
        });

        // Wait for all promises to resolve
        const blogList = await Promise.all(blogDetailsPromises);
        console.log(blogList);
        console.log(totalBlogs);
        console.log(totalPages)
        return { blogList, totalBlogs, totalPages };
    } catch (error) {
        console.error("Error", error);
        return null;
    }
}
export async function getAllBlogWithUsernameByTitle(keyword, page) {
    const url = `http://localhost:8080/blog/search/findByTitleContaining?title=${keyword}&page=${page}&size=4&sort=blogId,desc`;
    try {
        const response = await my_request(url); // Assuming my_request is an async function that handles the fetch
        const responseData = response._embedded.blogs;
        const totalPages = response.page.totalPages;
        const totalBlogs = response.page.totalElements;

        // Transform each blog into a promise that resolves to the blog with additional details
        const blogDetailsPromises = responseData.map(async (blog) => {
            const [userDetails, imageDetails] = await Promise.all([getBlogWithUsernameById(blog.blogId), get1ImageOfABlog(blog.blogId)]);

            // Merge blog details with user and image details
            return {
                ...blog,
                firstName: userDetails.firstName,
                lastName: userDetails.lastName,
                image: imageDetails.imageData
            };
        });

        // Wait for all promises to resolve
        const blogList = await Promise.all(blogDetailsPromises);
        console.log(blogList);
        console.log(totalBlogs);
        console.log(totalPages)
        return { blogList, totalBlogs, totalPages };
    } catch (error) {
        console.error("Error", error);
        return null;
    }
}


