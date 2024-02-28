import {my_request} from "../Request.js";

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
            unit: responseData[key].unit
        });
    }
        return {productList: productList, totalProducts: totalProducts, totalPages: totalPages};
    }


export async function getAllProducts(page){
    const url = `http://localhost:8080/detail-product?size=9&page=${page}`
    return getProduct(url);
}

export async function getProductByName(keyword){
    const url= `http://localhost:8080/detail-product/search/findByNameContaining?name=${keyword}&page=0&size=9`;
    return getProduct(url);
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
                unit: productData.unit

            }
        }else{
            throw new Error('không tồn tài!');
        }
    } catch (error) {
        console.error("Error", error);
        return null;
    }
}

export async function getRelatedProductsByCategoryId(categoryId, page) {
    try {
        // Fetch category products based on categoryId
        const categoryProductUrl = `http://localhost:8080/category-product/search/findByTypeRoom_RoomId?roomId=${categoryId}`;
        const categoryProductResponse = await my_request(categoryProductUrl);

        // Extract typeProduct IDs
        const typeProductIds = categoryProductResponse._embedded.categoryProducts.map(categoryProduct => categoryProduct.typeProduct.id);

        // Fetch related products based on typeProduct IDs
        const relatedProductsUrl = `http://localhost:8080/detail-product/search/findByTypeProduct_TypeIdIn?typeId=${typeProductIds}&page=${page}&size=9`;
        return getProduct(relatedProductsUrl);
    } catch (error) {
        console.error("Error", error);
        return null;
    }
}

