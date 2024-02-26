export async function my_request(url){
    //Truy van den duong dan
    const response = await fetch(url);
    //neu bi tra ve loi
    if(!response.ok){
        throw new Error(`Khong the truy cap ${url}`);
    }
    //neu tra ve ok
    return response.json();
}