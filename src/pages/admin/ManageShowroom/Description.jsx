import React, {useEffect, useState} from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faSearch,
    faPlus,
    faTrashCan,
    faPencil,
    faChair, // Ví dụ: icon ghế
    faBed,   // Ví dụ: icon giường
    faTable,
} from "@fortawesome/free-solid-svg-icons";
import {
    getAllProductWithFirstImage,
    getAllProductWithFirstImageByName,
    getAllRoomTypes,
    getAllUnit,
    getCategoryByRoomId,
    getProductById,
    getProductRequestById,
} from "../../../api/product/ProductAPI.jsx";
import Pagination from "../../../utils/Pagination.jsx";
import {checkInput, checkInputDouble} from "../../../utils/Validation.js";
import {toast} from "react-toastify";
import {getIdUserByToken} from "../../../utils/JwtService.js";
import {getBlogById} from "../../../api/blog/BlogAPI.js";
import {getAllBlogImageData} from "../../../api/blog/BlogImageAPI.js";
import {getAllProductImages} from "../../../api/product/ProductImageAPI.jsx";

const Icon = ({classIcon, color, size}) => {
    const iconSize = {
        width: size,
        height: size,
        color: color,
        cursor: "pointer"
    };

    return (
        <span>
      <FontAwesomeIcon icon={classIcon} style={iconSize}/>
    </span>

    );
};

const Description = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [images, setImages] = useState([]);
    const [name, setName] = useState("");
    const [width, setWidth] = useState("");
    const [length, setLength] = useState("");
    const [height, setHeight] = useState("");
    const [unitPrice, setUnitPrice] = useState("");
    const [unitId, setUnitId] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [typeName, setTypeName] = useState("");
    const [roomId, setRoomId] = useState("");
    const [unitList, setUnitList] = useState([]);
    const [productId, setProductId] = useState(0);
    const [totalProduct, setTotalProduct] = useState(0);
    const [currentSearch, setCurrentSearch] = useState("");
    const [search, setSearch] = useState("")
    const [isChanged, setIsChanged] = useState(false);
    const [productList, setProductList] = useState([]);
    const [roomTypeList, setRoomTypeList] = useState([]);
    const [totalRoomType, setTotalRoomType] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [categoryList, setCategoryList] = useState([]);


    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
//Error product field
    const [errorImages, setErrorImages] = useState("");
    const [errorName, setErrorName] = useState("");
    const [errorWidth, setErrorWidth] = useState("");
    const [errorLength, setErrorLength] = useState("");
    const [errorHeight, setErrorHeight] = useState("");
    const [errorPrice, setErrorPrice] = useState("");
    const [errorUnit, setErrorUnit] = useState("");
    const [errorCategory, setErrorCategory] = useState("");
    const [errorTypeName, setErrorTypeName] = useState("");
    //
    const [update, setUpdate] = useState(false);
    useEffect(() => {
        if (search === '') {
            getAllProductWithFirstImage(currentPage - 1).then(
                result => {
                    setProductList(result.productList);
                    setTotalPages(result.totalPages);
                    setTotalProduct(result.totalProducts);
                }
            ).catch(
                error => {
                    console.log(error)
                }
            )
        } else {
            getAllProductWithFirstImageByName(search, (currentPage - 1)).then(
                result => {
                    setProductList(result.productList);
                    setTotalPages(result.totalPages);
                    setTotalProduct(result.totalProducts);
                }
            )
                .catch(
                    error => {
                        console.log(error)
                    }
                )
        }

    }, [currentPage, search, isChanged]);

    useEffect(() => {
        getAllRoomTypes(currentPage - 1).then(
            result => {
                setRoomTypeList(result.roomTypeList);
                setTotalPage(result.totalPages);
                setTotalRoomType(result.totalRoomTypes);
            }
        ).catch(error => {
                console.log(error)
            }
        )
    }, [currentPage, isChanged]);

    useEffect(() => {
        getAllUnit().then(
            result => {
                setUnitList(result.unitList);
            }
        ).catch(error => {
                console.log(error)
            }
        )
    }, [isChanged]);

    useEffect(() => {
        if (roomId !== "") {
            getCategoryByRoomId(roomId)
                .then((result) => {
                    setCategoryList(result.categoryList);
                    setTotalPages(result.totalPages);
                })
                .catch((error) => {
                    console.error('Error fetching category:', error);
                });
        }
    }, [roomId]);

    const getShortTypeName = (typeName) => {
        const words = typeName.split(' ');
        const shortWords = words.slice(0, 5);
        const shortTypeName = shortWords.join(' ');
        return shortTypeName;
    };
    const handleModalToggle = () => {
        setIsModalOpen(!isModalOpen);
    };
    const handleModalToogleClose = () => {
        setRoomId("");
        setCategoryId("");
        setTypeName("");
        setName("");
        setHeight("");
        setLength("");
        setWidth("");
        setUnitPrice("");
        setUnitId("");
        setImages([]);

        setErrorName("");
        setErrorLength("");
        setErrorWidth("");
        setErrorHeight("");
        setErrorUnit("");
        setErrorPrice("");
        setErrorTypeName("");
        setErrorImages("");

        setIsModalOpen(!isModalOpen);
    }
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        // Convert Image to Base64
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                // After conversion, add the Base64 string to the images array
                setImages([...images, reader.result]);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = (indexToRemove) => {
        setImages(images.filter((_, index) => index !== indexToRemove));
    };
    const handleSearch = () => {
        setSearch(currentSearch);
        setCurrentPage(1); // Cập nhật currentPage về 1 sau khi tìm kiếm
    }
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            setSearch(event.target.value);
            handleSearch();
        }
    }
    const handlePageChange = (page) => {
        setCurrentPage(page);
    }
    const checkFileInput = (setErrorInput, input) => {
        console.log(input.length)
        if (!input || input.length === 0) {
            setErrorInput("Thông tin bắt buộc!");
            return true;
        } else {
            setErrorInput("");
            return false;
        }
    }
    const handleNameChange = (e) => {
        setName(e.target.value);
        setErrorName("");
        return checkInput(setErrorName, e.target.value);
    }
    const handleWidthChange = (e) => {
        setWidth(e.target.value);
        setErrorWidth("");
        return checkInputDouble(setErrorWidth, e.target.value);
    }
    const handleLengthChange = (e) => {
        setLength(e.target.value);
        setErrorLength("");
        return checkInputDouble(setErrorLength, e.target.value);
    }
    const handleHeightChange = (e) => {
        setHeight(e.target.value);
        setErrorHeight("");
        return checkInputDouble(setErrorHeight, e.target.value);
    }
    const handlePriceChange = (e) => {
        setUnitPrice(e.target.value);
        setErrorPrice("");
        return checkInputDouble(setErrorPrice, e.target.value);
    }
    const handleUnitIdChange = (e) => {
        setUnitId(e.target.value);
        setErrorUnit("");
        return checkInput(setErrorUnit, e.target.value);
    }
    const handleCategoryIdChange = (e) => {
        setCategoryId(e.target.value);
        setErrorCategory("");
        console.log("Selected Category ID:", e.target.value)
        return checkInput(setErrorCategory, e.target.value);
    }
    const handleTypeNameChange = (e) => {
        setTypeName(e.target.value);
        setErrorTypeName("");
        return checkInput(setErrorTypeName, e.target.value);
    }
    const handleRoomTypeChange = (e) => {
        const newRoomId = e.target.value;
        if (newRoomId !== roomId) {
            setRoomId(newRoomId);
            console.log("Selected Room Type ID:", newRoomId);
        }
    }
    const handleCreateProduct = async () => {
        const isImageFilesValid = !checkFileInput(setErrorImages, images);
        const isNameValid = !checkInput(setErrorName, name);
        const isWidthValid = !checkInputDouble(setErrorWidth, width);
        const isLengthValid = !checkInputDouble(setErrorLength, length);
        const isHeightValid = !checkInputDouble(setErrorHeight, height);
        const isPriceValid = !checkInputDouble(setErrorPrice, unitPrice);
        const isUnitIdValid = !checkInput(setErrorUnit, unitId);
        const isCategoryValid = !checkInput(setErrorCategory, categoryId);
        const isTypeNameValid = !checkInput(setErrorTypeName, typeName);
        if (isCategoryValid && isTypeNameValid && isImageFilesValid && isNameValid &&
            isWidthValid && isLengthValid && isHeightValid && isPriceValid && isUnitIdValid) {
            try {
                const url = 'http://localhost:8080/products/create'
                const response = await fetch(url, {
                        method: 'POST',
                        headers: {
                            'Content-type': 'application/json',
                        },
                        body: JSON.stringify({
                            productId: 0,
                            name: name,
                            width: width,
                            length: length,
                            height: height,
                            unitPrice: unitPrice,
                            unitId: unitId,
                            typeName: typeName,
                            categoryId: categoryId,
                            productImageList: images
                        })
                    }
                )
                if (response.ok) {
                    setIsChanged(!isChanged);
                    setCurrentPage(1);
                    setIsModalOpen(!isModalOpen);
                    setName("");
                    setWidth("");
                    setLength("");
                    setHeight("");
                    setUnitPrice("");
                    setUnitId("");
                    setTypeName("");
                    setCategoryId("");
                    setImages([]);
                    toast.success("Thêm sản phẩm thành công");
                } else {
                    toast.warning("Đã xảy ra lỗi trong quá trình thêm sản phẩm!");
                }
            } catch (e) {
                toast.warning("Đã xảy ra lỗi trong quá trình thêm sản phẩm!")
            }
        }
    }

    const handleUpdateProduct = async () => {
        const isImageFilesValid = !checkFileInput(setErrorImages, images);
        const isNameValid = !checkInput(setErrorName, name);
        const isWidthValid = !checkInputDouble(setErrorWidth, width);
        const isLengthValid = !checkInputDouble(setErrorLength, length);
        const isHeightValid = !checkInputDouble(setErrorHeight, height);
        const isPriceValid = !checkInputDouble(setErrorPrice, unitPrice);
        const isUnitIdValid = !checkInput(setErrorUnit, unitId);
        const isCategoryValid = !checkInput(setErrorCategory, categoryId);
        const isTypeNameValid = !checkInput(setErrorTypeName, typeName);
        if (isCategoryValid && isTypeNameValid && isImageFilesValid && isNameValid &&
            isWidthValid && isLengthValid && isHeightValid && isPriceValid && isUnitIdValid) {
            try {
                const url = `http://localhost:8080/products/update`;
                const response = await fetch(url, {
                        method: 'PUT',
                        headers: {
                            'Content-type': 'application/json',
                        },
                        body: JSON.stringify({
                            productId: productId,
                            name: name,
                            width: width,
                            length: length,
                            height: height,
                            unitPrice: unitPrice,
                            unitId: unitId,
                            typeName: typeName,
                            categoryId: categoryId,
                            productImageList: images
                        })
                    }
                )
                if (response.ok) {
                    setIsChanged(!isChanged);
                    setCurrentPage(1);
                    setIsModalOpen(!isModalOpen);
                    setName("");
                    setWidth("");
                    setLength("");
                    setHeight("");
                    setUnitPrice("");
                    setUnitId("");
                    setTypeName("");
                    setCategoryId("");
                    setImages([]);
                    toast.success("Chỉnh sửa sản phẩm thành công");
                } else {
                    toast.warning("Đã xảy ra lỗi trong quá trình chỉnh sửa sản phẩm!");
                }
            } catch (error) {
                toast.warning("Đã xảy ra lỗi trong quá trình chỉnh sửa sản phẩm!")
            }
        }
    }
    const handleButtonUpdate = async (productId) => {
        setIsModalOpen(true);
        setUpdate(true);
        setProductId(productId);
        try {
            const productResult = await getProductRequestById(productId);
            console.log('Product data:', productResult); // Check the structure
            if (productResult) {
                setName(productResult.name.toString()); // Convert non-string values to strings
                setWidth(productResult.width.toString());
                setLength(productResult.length.toString());
                setHeight(productResult.height.toString());
                setUnitId(productResult.unitId.toString());
                setUnitPrice(productResult.unitPrice.toString());
                setTypeName(productResult.typeName.toString());
                setRoomId(productResult.roomId.toString());
                setCategoryId(productResult.categoryId.toString());
            } else {
                console.log('No product data returned');
            }
        } catch (error) {
            console.error('Failed to fetch product by ID:', error);
        }

        try {
            const imagesResult = await getAllProductImages(productId);
            console.log('Image data:', imagesResult); // This should now reflect the structure you provided
            if (imagesResult && Array.isArray(imagesResult) && imagesResult.length > 0) {
                // Map over the imagesResult array to extract each imageData string
                const imageDataArray = imagesResult.map(img => img.imageData);
                setImages(imageDataArray);
            } else {
                console.log('No image data returned');
            }
        } catch (error) {
            console.error('Failed to fetch blog images:', error);
        }
    }

    const handleDeleteProduct = async (id) => {
        // Display toast confirmation
        toast.warn(({closeToast}) => (
            <div>
                <div className="h5">Bạn có chắc chắn muốn xóa sản phẩm này?</div>
                <div className="row justify-content-between">
                    <div className="col-2 btn btn-danger" onClick={() => {
                        deleteProduct(id);
                        closeToast(); // Close the toast after deletion
                    }}>Xóa
                    </div>
                    <div className="col-2 btn btn-secondary" onClick={closeToast}>Hủy</div>
                </div>
            </div>
        ), {
            position: "top-center",
            autoClose: false,
            closeButton: false,
            style: {
                width: "400px", // Điều chỉnh chiều rộng của khung toast
                padding: "20px", // Thêm padding nếu cần
                backgroundColor: "#fff", // Màu nền của khung toast
                color: "white", // Màu chữ của nội dung toast
                borderRadius: "8px" // Bo tròn các góc của khung toast
            }
        });
    };
    const deleteProduct = async (id) => {
        try {
            const url = `http://localhost:8080/detail-product/${id}`;
            const response = await fetch(url, {
                    method: 'DELETE'
                }
            )
            if (response.ok) {
                setIsChanged(!isChanged);
                setCurrentPage(1);
                toast.success("Xóa sản phẩm thành công");
            } else {
                toast.warning("Đã xảy ra lỗi trong quá trình xóa sản phẩm!");
            }
        } catch (error) {
            {
                toast.error("Đã xảy ra lỗi trong quá trình xóa sản phẩm!");
            }
        }
    }
    return (
        <div className='h-[96vh] pl-3'>
            <div className='w-full h-[150px] relative'>
                <div className='title-admin absolute top-0 left-0'>MÔ TẢ SẢN PHẨM</div>
                <div className='absolute bottom-0 left-0'>
                    <input
                        className='bg-[#EAEDF2] border-2 border-[#858585] rounded-[5px] w-[400px] h-[40px] px-2'
                        placeholder='Nhập từ khóa tìm kiếm theo tên sản phẩm...'
                        value={currentSearch}
                        onChange={e => setCurrentSearch(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                </div>
                <div className='absolute bottom-1 left-[365px]' onClick={handleSearch}><Icon classIcon={faSearch}
                                                                                             color={"black"}
                                                                                             size={"24px"}/>
                </div>


                <div
                    className='absolute z-10 top-0 right-[190px] w-[80px] h-[80px] bg-[#60B664] text-[24px] font-bold text-white text-center flex flex-col justify-center rounded-[10px] shadow1'>
                    <Icon classIcon={faChair} color={"white"} size={"32px"}/>
                </div>
                <div
                    className='absolute top-[40px] right-0 w-[300px] h-[110px] rounded-[5px] bg-white shadow1 flex flex-col justify-center text-right px-[30px]'>
                    <div>
                        <div className='text-[24px] text-black'>{totalProduct}</div>
                        <div className='text-[24px] text-black'>Tổng sản phẩm</div>
                    </div>
                </div>


            </div>

            {isModalOpen && (
                <div className={`relative w-full mt-10`}>
                    <div className='w-full flex justify-between'>
                        <div className='text-black text-[20px]'>{update ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm"}</div>
                        <div className='cursor-pointer hover:text-[#ff0000]'
                             onClick={handleModalToogleClose}>{`[Đóng]`}</div>
                    </div>
                    <div className='flex mb-3 gap-[10px]'>
                        <div className='flex flex-col'>
                            <select
                                className='bg-[#EAEDF2] border-2 border-[#858585] rounded-[5px] w-[400px] h-[40px] px-2'
                                value={roomId}
                                onChange={handleRoomTypeChange}
                                defaultValue="">
                                <option disabled={true} value="">----Chọn loại phòng----</option>
                                {roomTypeList.map(roomType => (
                                    <option key={roomType.roomId}
                                            value={roomType.roomId}>{roomType.roomName}</option>
                                ))}
                            </select>

                            <select
                                className='bg-[#EAEDF2] border-2 mt-[10px] border-[#858585] rounded-[5px] w-[400px] h-[40px] px-2'
                                value={categoryId}
                                onChange={handleCategoryIdChange}
                                defaultValue="">
                                <option disabled={true} value="">----Chọn loại sản phẩm----</option>
                                {categoryList.map(category => (
                                    <option key={category.categoryId}
                                            value={category.categoryId}>{category.categoryName}</option>
                                ))}
                            </select>
                            <div style={{color: "red"}}>{errorCategory}</div>
                            <textarea
                                className='text-black bg-[#EAEDF2] border-2 mt-[10px] border-[#858585] h-[100px] rounded-[5px] w-[400px] p-2'
                                placeholder='Nhập Tên Sản Phẩm'
                                value={name}
                                onChange={handleNameChange}
                            />
                            <div style={{color: "red"}}>{errorName}</div>
                            <textarea
                                className='text-black bg-[#EAEDF2] border-2 mt-[10px] border-[#858585] h-[100px] rounded-[5px] w-[400px] p-2'
                                placeholder='Nhập nội dung...'
                                value={typeName}
                                onChange={handleTypeNameChange}
                            />
                            <div style={{color: "red"}}>{errorTypeName}</div>
                        </div>

                        <div className='flex flex-col w-full'>
                            <div className='flex h-[50px] gap-3'>
                                <input
                                    className='bg-[#EAEDF2] border-2 border-[#858585] rounded-[5px] w-[150px] h-[40px] px-2 text-black'
                                    placeholder='Chiều dài...'
                                    value={length}
                                    onChange={handleLengthChange}
                                />
                                <div style={{color: "red"}}>{errorLength}</div>
                                <input
                                    className='bg-[#EAEDF2] border-2 border-[#858585] rounded-[5px] w-[150px] h-[40px] px-2 text-black'
                                    placeholder='Chiều rộng...'
                                    value={width}
                                    onChange={handleWidthChange}
                                />
                                <div style={{color: "red"}}>{errorWidth}</div>
                                <input
                                    className='bg-[#EAEDF2] border-2 border-[#858585] rounded-[5px] w-[150px] h-[40px] px-2 text-black'
                                    placeholder='Chiều cao...'
                                    value={height}
                                    onChange={handleHeightChange}
                                />
                                <div style={{color: "red"}}>{errorHeight}</div>
                                <input
                                    className='bg-[#EAEDF2] border-2 border-[#858585] rounded-[5px] w-[180px] h-[40px] px-2 text-black'
                                    placeholder='Giá thành...'
                                    value={unitPrice}
                                    onChange={handlePriceChange}
                                />
                                <div style={{color: "red"}}>{errorPrice}</div>
                                <select
                                    className='bg-[#EAEDF2] border-2 border-[#858585] rounded-[5px] w-[150px] h-[40px] px-2'
                                    value={unitId}
                                    onChange={handleUnitIdChange}
                                    defaultValue="">
                                    <option disabled={true} value="">--Chọn đơn vị--</option>
                                    {unitList.map(unit => (
                                        <option key={unit.unitId} value={unit.unitId}>{unit.unitName}</option>
                                    ))}
                                </select>
                                <div style={{color: "red"}}>{errorUnit}</div>
                            </div>
                            <div
                                className='h-[150px] w-full bg-[#EAEDF2] border-2 border-[#858585] rounded-[5px] p-[10px] flex gap-[10px]'>
                                {images.map((base64Image, index) => (
                                    <div key={index} className='relative'>
                                        <img
                                            key={index}
                                            src={base64Image}
                                            alt={`Image ${index}`}
                                            className='h-[126px] w-[126px] object-cover rounded-[5px]'
                                        />
                                        <button
                                            onClick={() => handleRemoveImage(index)}
                                            className='absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full'
                                            style={{cursor: 'pointer'}}
                                        >
                                            <FontAwesomeIcon icon={faTrashCan}/>
                                        </button>
                                    </div>
                                ))}
                                <label htmlFor='image-upload' className='cursor-pointer'>
                                    <div
                                        className='h-[126px] w-[126px] border-2 outline-dashed rounded-[3px] flex flex-col justify-center text-center'>
                                        <input
                                            id='image-upload'
                                            type='file'
                                            accept='image/*'
                                            onChange={handleImageChange}
                                            style={{display: 'none'}}
                                        />
                                        <div
                                            className='w-[40px] h-[40px] rounded-[5px] flex flex-col justify-center mx-auto'>
                                            <Icon classIcon={faPlus} color={"black"} size={"40px"}/>
                                        </div>
                                    </div>
                                </label>
                                <div style={{color: "red"}}>{errorImages}</div>
                            </div>
                        </div>

                    </div>

                    <button className='bg-[#0AFF05] px-3 py-2 rounded-[5px] text-black'
                            onClick={update ? handleUpdateProduct : handleCreateProduct}>Lưu
                    </button>
                    {/*<button className='bg-[#ff2e2e] px-3 py-2 rounded-[5px] text-white ml-3'*/}
                    {/*        onClick={handleDelete}>Xóa*/}
                    {/*</button>*/}
                </div>
            )}

            <div className='table-all-posts h-auto mt-[50px]'>
                <div
                    className='w-4/5 h-[60px] relative top-7 shadow1 bg-[#348EED] text-center text-[24px] flex flex-col justify-center mx-auto rounded-[10px] text-white'>MÔ
                    TẢ SẢN PHẨM
                    {!isModalOpen && (<div
                        className='absolute right-[10px] w-[40px] h-[40px] border-2 border-white rounded-[5px] flex flex-col justify-center cursor-pointer'
                        onClick={handleModalToggle}>
                        <Icon classIcon={faPlus} color={"white"} size={"24px"}/>
                    </div>)}
                </div>

                <div className='h-[69vh] w-full bg-white shadow1 pt-[50px] px-[50px] rounded-[10px]'>
                    <div className='grid grid-cols-12 py-3 gap-2'>
                        <div className='col-span-1 text-[#348EED]'>ID</div>
                        <div className='col-span-2 text-[#348EED]'>Hình ảnh</div>
                        <div className='col-span-2 text-[#348EED]'>Sản phẩm</div>
                        <div className='col-span-2 text-[#348EED]'>Mô tả</div>
                        <div className='col-span-2 text-[#348EED]'>Dài - Rộng - Cao</div>
                        <div className='col-span-1 text-[#348EED]'>Giá thành</div>
                        <div className='col-span-1 text-[#348EED]'>Đơn vị</div>
                        <div className='col-span-1 text-[#348EED]'></div>
                    </div>
                    <div className='overflow-y-auto h-[44vh] pr-3'>
                        {productList.map((product) => (
                            <div key={product.productId}
                                 className='grid grid-cols-12 border-t-2 border-[#D9D9D9] py-3 gap-2'>
                                <div
                                    className='col-span-1 text-black flex flex-col justify-center'>{product.productId}</div>
                                <div className='col-span-2 text-black flex flex-col justify-center'>
                                    <img className='w-3/5' src={product.image} alt=""/>
                                </div>
                                <div
                                    className='col-span-2 text-black flex flex-col justify-center'>{product.name}</div>
                                <div className='col-span-2 text-black flex flex-col justify-center'>{product.typeName}</div>
                                <div
                                    className='col-span-2 text-black flex flex-col justify-center'>{product.length} - {product.width} - {product.height}</div>
                                <div
                                    className='col-span-1 text-black flex flex-col justify-center'>{product.unitPrice}</div>
                                <div
                                    className='col-span-1 text-black flex flex-col justify-center'>{product.unitName}</div>
                                <div className='col-span-1 text-black flex flex-col justify-center'>
                                    {!isModalOpen && (
                                    <div className='flex justify-end gap-2'>
                                        <div onClick={() => handleDeleteProduct(product.productId)}>
                                            <Icon classIcon={faTrashCan} color={"black"} size={"20px"}/>
                                        </div>
                                        <div onClick={() => handleButtonUpdate((product.productId))}>
                                            <Icon classIcon={faPencil} color={"black"} size={"20px"}/>
                                        </div>
                                    </div>
                                        )}
                                </div>
                            </div>
                        ))}
                    </div>
                    <Pagination currentPage={currentPage} totalPage={totalPages}
                                handlePageChange={handlePageChange}/>
                </div>
            </div>
        </div>
    )
}


export default Description