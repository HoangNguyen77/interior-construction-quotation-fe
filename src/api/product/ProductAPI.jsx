import {my_request} from "../Request.js";
import {getFirstImageOfProduct} from "./ProductImageAPI.jsx";

async function getProduct(url){
    const productList = [];
    const response = await my_request(url);
    const responseData = response._embedded.products;
    console.log(responseData);
    const totalPages = response.page.totalPages;
    const totalProducts = response.page.totalElements;
    for (const key in responseData) {
        productList.push({
            productId: responseData[key].productId,
            name: responseData[key].name,
            width: responseData[key].width,
            length: responseData[key].length,
            height: responseData[key].height,
            unitPrice: responseData[key].unitPrice,
            unitId: responseData[key].unitId
        });
    }
        return {productList: productList, totalProducts: totalProducts, totalPages: totalPages};
    }


export async function getAllProducts(page){
    const url = `http://localhost:8080/detail-product?size=9&page=${page}`
    return getProduct(url);
}
// export async function getAllProductWithFirstImage(page) {
//     const url = `http://localhost:8080/detail-product?size=9&page=${page}`;
//     try {
//         const response = await my_request(url); // Assuming my_request is an async function that handles the fetch
//         const responseData = response._embedded.products;
//         const totalPages = response.page.totalPages;
//         const totalProducts = response.page.totalElements;
//
//         const productDetailsPromises = responseData.map(async (product) => {
//             try {
//                 const [imageDetails] = await Promise.all([getFirstImageOfProduct(product.productId)]);
//
//                 // Check if imageDetails is not null before accessing imageData
//                 const image = imageDetails ? imageDetails.imageData : null;
//
//                 return {
//                     ...product,
//                     image: image
//                 };
//             } catch (error) {
//                 console.error("Error retrieving image details:", error);
//                 return {
//                     ...product,
//                     image: null // Set image to null if there's an error or if imageDetails is null
//                 };
//             }
//         });
//
//         // Wait for all promises to resolve
//         const productList = await Promise.all(productDetailsPromises);
//         console.log(productList);
//         console.log(totalProducts);
//         console.log(totalPages)
//         return { productList, totalProducts, totalPages };
//     } catch (error) {
//         console.error("Error", error);
//         return null;
//     }
// }

export async function getAllProductWithFirstImage(page) {
    const url = `http://localhost:8080/detail-product?size=9&page=${page}`;
    try {
        const response = await my_request(url); // Assuming my_request is an async function that handles the fetch
        const responseData = response._embedded.products;
        const totalPages = response.page.totalPages;
        const totalProducts = response.page.totalElements;

        const productDetailsPromises = responseData.map(async (product) => {
            try {
                const [imageDetails, productRequest] = await Promise.all([
                    getFirstImageOfProduct(product.productId),
                    getProductRequestById(product.productId)
                ]);

                // Check if imageDetails is not null before accessing imageData
                const image = imageDetails ? imageDetails.imageData : null;

                return {
                    ...product,
                    image: image,
                    unitName: productRequest.unitName,
                    typeRoom: productRequest.typeRoom
                };
            } catch (error) {
                console.error("Error retrieving product details:", error);
                return {
                    ...product,
                    image: null, // Set image to null if there's an error or if imageDetails is null
                    unitName: null,
                    typeRoom: null
                };
            }
        });

        // Wait for all promises to resolve
        const productList = await Promise.all(productDetailsPromises);
        console.log(productList);
        console.log(totalProducts);
        console.log(totalPages);
        return { productList, totalProducts, totalPages };
    } catch (error) {
        console.error("Error", error);
        return null;
    }
}


export async function get4ProductWithFirstImage() {
    const url = `http://localhost:8080/detail-product?size=4`;
    try {
        const response = await my_request(url); // Assuming my_request is an async function that handles the fetch
        const responseData = response._embedded.products;
        const totalProducts = response.page.totalElements;
        const productDetailsPromises = responseData.map(async (product) => {
            try {
                const [imageDetails] = await Promise.all([getFirstImageOfProduct(product.productId)]);

                // Check if imageDetails is not null before accessing imageData
                const image = imageDetails ? imageDetails.imageData : null;

                return {
                    ...product,
                    image: image
                };
            } catch (error) {
                console.error("Error retrieving image details:", error);
                return {
                    ...product,
                    image: null // Set image to null if there's an error or if imageDetails is null
                };
            }
        });

        // Wait for all promises to resolve
        const productList = await Promise.all(productDetailsPromises);
        console.log(productList);
        console.log(totalProducts);
        return { productList, totalProducts };
    } catch (error) {
        console.error("Error", error);
        return null;
    }
}


// export async function getAllProductWithFirstImageByName(keyword, page) {
//     const url = `http://localhost:8080/detail-product/search/findByNameContaining?name=${keyword}&page=${page}&size=9`;
//     try {
//         const response = await my_request(url); // Assuming my_request is an async function that handles the fetch
//         const responseData = response._embedded.products;
//         const totalPages = response.page.totalPages;
//         const totalProducts = response.page.totalElements;
//
//         const productDetailsPromises = responseData.map(async (product) => {
//             try {
//                 const [imageDetails] = await Promise.all([getFirstImageOfProduct(product.productId)]);
//
//                 // Check if imageDetails is not null before accessing imageData
//                 const image = imageDetails ? imageDetails.imageData : null;
//
//                 return {
//                     ...product,
//                     image: image
//                 };
//             } catch (error) {
//                 console.error("Error retrieving image details:", error);
//                 return {
//                     ...product,
//                     image: null // Set image to null if there's an error or if imageDetails is null
//                 };
//             }
//         });
//
//         // Wait for all promises to resolve
//         const productList = await Promise.all(productDetailsPromises);
//         console.log(productList);
//         console.log(totalProducts);
//         console.log(totalPages)
//         return { productList, totalProducts, totalPages };
//     } catch (error) {
//         console.error("Error", error);
//         return null;
//     }
// }
export async function getProductByName(keyword){
    const url= `http://localhost:8080/detail-product/search/findByNameContaining?name=${keyword}&page=0&size=9`;
    return getProduct(url);
}

export async function getAllProductWithFirstImageByName(keyword, page) {
    const url = `http://localhost:8080/detail-product/search/findByNameContaining?name=${keyword}&page=${page}&size=9`;
    try {
        const response = await my_request(url); // Assuming my_request is an async function that handles the fetch
        const responseData = response._embedded.products;
        const totalPages = response.page.totalPages;
        const totalProducts = response.page.totalElements;

        const productDetailsPromises = responseData.map(async (product) => {
            try {
                const productRequest = await getProductRequestById(product.productId);

                return {
                    ...product,
                    unitName: productRequest.unitName,
                    typeRoom: productRequest.typeRoom
                };
            } catch (error) {
                console.error("Error retrieving product details:", error);
                return {
                    ...product,
                    unitName: null,
                    typeRoom: null
                };
            }
        });

        // Wait for all promises to resolve
        const productList = await Promise.all(productDetailsPromises);
        console.log(productList);
        console.log(totalProducts);
        console.log(totalPages)
        return { productList, totalProducts, totalPages };
    } catch (error) {
        console.error("Error", error);
        return null;
    }
}

export async function getProductById(productId){

    const url = `http://localhost:8080/detail-product/${productId}`;

    try {
        const response =  await fetch(url);

        if(!response.ok){
            throw new Error('Gặp lỗi trong quá trình gọi API!')
        }

        const productData = await response.json();

        if(productData){
            return {
                productId: productData.productId,
                name: productData.name,
                width: productData.width,
                length: productData.length,
                unitPrice: productData.unitPrice,
                unitId: productData.unitId,
                height : productData.height
            }
        }else{
            throw new Error('không tồn tài!');
        }
    } catch (error) {
        console.error("Error", error);
        return null;
    }
}

// export async function getRelatedProductsByCategoryId(categoryId, page) {
//     try {
//         // Fetch category products based on categoryId
//         const categoryProductUrl = `http://localhost:8080/category-product/search/findByTypeRoom_RoomId?roomId=${categoryId}`;
//         const categoryProductResponse = await my_request(categoryProductUrl);
//
//         // Extract typeProduct IDs
//         const typeProductIds = categoryProductResponse._embedded.categoryProducts.map(categoryProduct => categoryProduct.typeProduct.id);
//
//         // Fetch related products based on typeProduct IDs
//         const relatedProductsUrl = `http://localhost:8080/detail-product/search/findByTypeProduct_TypeIdIn?typeId=${typeProductIds}&page=${page}&size=9`;
//         return getProduct(relatedProductsUrl);
//     } catch (error) {
//         console.error("Error", error);
//         return null;
//     }
// }

export async function getAllRoomTypes(page){
    const url = `http://localhost:8080/type-room?${page}&size=20`
    return getRoomType(url);
}

export async function getRoomTypeByName(keyword){
    const url= `http://localhost:8080/type-room/search/findByRoomNameContaining?typeName=${keyword}&page=0&size=20`;
    return getRoomType(url);
}

export async function getRoomTypeById(roomId){
    const url = `http://localhost:8080/type-room/${roomId}`;
    try {
        const response =  await fetch(url);
        if(!response.ok){
            throw new Error('Gặp lỗi trong quá trình gọi API!')
        }

        const roomTypeData = await response.json();

        if(roomTypeData){
            return {
                roomId: roomTypeData.roomId,
                roomName: roomTypeData.roomName,
            }
        }else{
            throw new Error('không tồn tài!');
        }
    } catch (error) {
        console.error("Error", error);
        return null;
    }
}
async function getRoomType(url){
    const roomTypeList = [];
    const response = await my_request(url);
    const responseData = response._embedded.typeRooms;
    console.log(responseData);
    const totalPages = response.page.totalPages;
    const totalRoomTypes = response.page.totalElements;
    for (const key in responseData) {
        roomTypeList.push({
            roomId: responseData[key].roomId,
            roomName: responseData[key].roomName,
        });
    }
    return {roomTypeList: roomTypeList, totalRoomTypes: totalRoomTypes, totalPages: totalPages};
}

async function getCategory(url){
    const categoryList =[];
    const response = await my_request(url);
    const responseData = response._embedded.categoryProducts;
    console.log(responseData);
    // const totalPages = response.page.totalPages;
    // const totalCategories = response.page.totalElements;
    for (const key in responseData) {
        categoryList.push({
            categoryId: responseData[key].categoryId,
            categoryName: responseData[key].categoryName,
        });
    }
    return {categoryList: categoryList
        // , totalCategories: totalCategories, totalPages: totalPages
    };
}

export async function getAllCategory(page){
    const url = `http://localhost:8080/category-product?${page}&size=99`
    return getCategory(url);
}

export async function getCategoryByIdWithRoomId(categoryId){
    const url = `http://localhost:8080/category-product/search/findCategoryWithRoomById?categoryId=${categoryId}`;
    try {
        const response =  await fetch(url);
        if(!response.ok){
            throw new Error('Gặp lỗi trong quá trình gọi API!')
        }

        const categoryData = await response.json();

        if(categoryData){
            return {
                categoryId: categoryData.categoryId,
                categoryName: categoryData.categoryName,
                roomId: categoryData.roomId,
            }
        }else{
            throw new Error('không tồn tài!');
        }
    } catch (error) {
        console.error("Error", error);
        return null;
    }
}
export async function getAllCategoryWithRoomName(){
    const categoryList =[];
    const response = await my_request('http://localhost:8080/category-product/search/findAllCategoryWithRoomName');
    const responseData = response._embedded.categoryRequests;
    console.log(responseData);
    for (const key in responseData) {
        categoryList.push({
            categoryId: responseData[key].categoryId,
            categoryName: responseData[key].categoryName,
            roomName: responseData[key].roomName,
            roomId: responseData[key].roomId
        });
    }
    return {categoryList: categoryList
        // , totalCategories: totalCategories, totalPages: totalPages
    };
}

export async function getCategoryByRoomId(roomId){
    const url = `http://localhost:8080/category-product/search/findByTypeRoom_RoomId?roomId=${roomId}`;
    return getCategory(url);
}

async function getUnit(url){
    const unitList =[];
    const response = await my_request(url);
    const responseData = response._embedded.units;
    console.log(responseData);
    for (const key in responseData) {
        unitList.push({
            unitId: responseData[key].unitId,
            unitName: responseData[key].unitName,
        });
    }
    return {unitList: unitList};
}

export async function getUnitById(unitId){
    const url = `http://localhost:8080/unit/search/findByUnitId{?unitId}=${unitId}`;
    try {
        const response =  await fetch(url);
        if(!response.ok){
            throw new Error('Gặp lỗi trong quá trình gọi API!')
        }

        const unitData = await response.json();

        if(unitData){
            return {
                unitId: unitData.unitId,
                unitName: unitData.unitName,
            }
        }else{
            throw new Error('không tồn tài!');
        }
    } catch (error) {
        console.error("Error", error);
        return null;
    }
}
export async function getAllUnit(){
    const url = `http://localhost:8080/unit`
    return getUnit(url);
}

export async function getProductRequestById(productId){

    const url = `http://localhost:8080/detail-product/search/findProductRequestById?productId=${productId}`;

    try {
        const response =  await fetch(url);

        if(!response.ok){
            throw new Error('Gặp lỗi trong quá trình gọi API!')
        }

        const productData = await response.json();

        if(productData){
            return {
                productId: productData.productId,
                name: productData.name,
                width: productData.width,
                length: productData.length,
                unitPrice: productData.unitPrice,
                unitId: productData.unitId,
                unitName: productData.unitName,
                height : productData.height,
                typeName : productData.typeName,
                categoryId: productData.categoryId,
                roomId: productData.roomId
            }
        }else{
            throw new Error('không tồn tài!');
        }
    } catch (error) {
        console.error("Error", error);
        return null;
    }
}



