import React, {useEffect, useState} from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faSearch,
    faPlus,
    faTrashCan,
    faPencil
} from "@fortawesome/free-solid-svg-icons";
import {checkInput} from "../../utils/Validation.js";
import {toast} from "react-toastify";
import {getIdUserByToken} from "../../utils/JwtService.js";
import Pagination from "../../utils/Pagination.jsx";
import {getAllBlogWithUsername, getAllBlogWithUsernameByTitle, getBlogById} from "../../api/blog/BlogAPI.js";
import {format} from "date-fns";
import {getAllBLogImage, getAllBlogImageData} from "../../api/blog/BlogImageAPI.js";

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

const ManageBlog = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [images, setImages] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    //blog list
    const [blogList, setBlogList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [totalBlog, setTotalBlog] = useState(0);
    //search
    const [currentSearch, setCurrentSearch] = useState("");
    const [search, setSearch] = useState("")
    //error
    const [errorTitle, setErrorTitle] = useState("");
    const [errorDescription, setErrorDescription] = useState("");
    const [errorImages, setErrorImages] = useState("");
    //check
    const [update, setUpdate] = useState(false);
    const [isChanged, setIsChanged] = useState(false);
    const [blogId, setBLogId] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        if (search === '') {
            getAllBlogWithUsername(currentPage - 1).then(
                result => {
                    setBlogList(result.blogList);
                    setTotalPage(result.totalPages);
                    setTotalBlog(result.totalBlogs);
                }
            ).catch(error => {
                    console.log(error)
                }
            )
        }else {
            getAllBlogWithUsernameByTitle(search, (currentPage - 1)).then(
                result => {
                    setBlogList(result.blogList);
                    setTotalPage(result.totalPages);
                    setTotalBlog(result.totalBlogs);
                }
            ).catch(error => {
                    console.log(error)
                }
            )
        }
    }, [currentPage, isChanged, search]);
    const getShortDescription = (description) => {
        const words = description.split(' ');
        const shortWords = words.slice(0, 5);
        const shortDescription = shortWords.join(' ');
        return shortDescription;
    };
    const formattedDate = (createdDate) => {
        const date = new Date(createdDate);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };
    const handlePageChange = (page) => {
        setCurrentPage(page);
    }
    const handleTitleChange = (e) => {
        setTitle(e.target.value);
        setErrorTitle("");
        return checkInput(setErrorTitle, e.target.value);
    }
    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
        setErrorDescription("");
        return checkInput(setErrorDescription, e.target.value);
    }
    const handleModalToggle = () => {
        setIsModalOpen(!isModalOpen);
    };
    const handleModalToggleClose = () => {
        setTitle("");
        setDescription("");
        setImages([]);
        setUpdate(false);
        setBLogId(0);

        setErrorDescription("");
        setErrorTitle("");
        setErrorImages("");

        setIsModalOpen(!isModalOpen);
    }
    //                          SEARCH                      //
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
    ///////////////////////////////////////////////////////////

    //                          CRUD                        //
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
    const handleImageChange = (event) => {
        const file = event.target.files[0];
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
    const handleButtonUpdate = async (blogId) => {
        setIsModalOpen(true);
        setUpdate(true);
        setBLogId(blogId);
        try {
            const blogResult = await getBlogById(blogId);
            console.log('Blog data:', blogResult); // Check the structure
            if (blogResult) {
                setTitle(blogResult.title);
                setDescription(blogResult.description);
            } else {
                console.log('No blog data returned');
            }
        } catch (error) {
            console.error('Failed to fetch blog by ID:', error);
        }

        try {
            const imagesResult = await getAllBlogImageData(blogId);
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
    //create blog
    const handleCreateBLog = async () => {
        const isImageFilesValid = !checkFileInput(setErrorImages, images);
        const isTitleValid = !checkInput(setErrorTitle, title);
        const isDescription = !checkInput(setErrorDescription, description);
        console.log(images);
        if (isImageFilesValid && isTitleValid && isDescription) {
            try {
                const url = 'http://localhost:8080/blogs/create-blog';
                const response = await fetch(url, {
                        method: 'POST',
                        headers: {
                            'Content-type': 'application/json',
                            'Authorization':`Bearer ${localStorage.getItem('token')}`
                        },
                        body: JSON.stringify({
                            blogId: 0,
                            title: title,
                            description: description,
                            userId: getIdUserByToken(),
                            images: images
                        })
                    }
                )
                if (response.ok) {
                    setIsChanged(!isChanged);
                    setCurrentPage(1);
                    setIsModalOpen(!isModalOpen);
                    setTitle("");
                    setDescription("");
                    setImages([]);
                    toast.success("Thêm blog thành công");
                } else {
                    toast.warning("Đã xảy ra lỗi trong quá trình thêm blog!");
                }
            } catch (error) {
                toast.warning("Đã xảy ra lỗi trong quá trình thêm blog!")
            }
        }
    }
    const handleUpdateBlog = async () => {
        const isImageFilesValid = !checkFileInput(setErrorImages, images);
        const isTitleValid = !checkInput(setErrorTitle, title);
        const isDescription = !checkInput(setErrorDescription, description);
        console.log(images);
        if (isImageFilesValid && isTitleValid && isDescription) {
            try {
                const url = `http://localhost:8080/blogs/update-blog`;
                const response = await fetch(url, {
                        method: 'PUT',
                        headers: {
                            'Content-type': 'application/json',
                        },
                        body: JSON.stringify({
                            blogId: blogId,
                            title: title,
                            description: description,
                            userId: getIdUserByToken(),
                            images: images
                        })
                    }
                )
                if (response.ok) {
                    setIsChanged(!isChanged);
                    setCurrentPage(1);
                    setIsModalOpen(!isModalOpen);
                    setTitle("");
                    setDescription("");
                    setImages([]);
                    setBLogId(0);
                    toast.success("Chỉnh sửa blog thành công");
                } else {
                    toast.warning("Đã xảy ra lỗi trong quá trình chỉnh sửa blog!");
                }
            } catch (error) {
                toast.warning("Đã xảy ra lỗi trong quá trình chỉnh sửa blog!")
            }
        }
    }
    const handleDeleteBlog = async (id) => {
        setIsDeleting(true);
        // Display toast confirmation
        toast.warn(({closeToast}) => (
            <div>
                <div className="h5">Bạn có chắc chắn muốn xóa blog này?</div>
                <div className="row justify-content-between">
                    <div className="col-2 btn btn-danger" onClick={() => {
                        deleteBlog(id);
                        closeToast(); // Close the toast after deletion
                        setIsDeleting(false);
                    }}>Xóa
                    </div>
                    <div className="col-2 btn btn-secondary" onClick={()=>{
                        closeToast();
                        setIsDeleting(false);
                    }
                    }>Hủy</div>
                </div>
            </div>
        ), {
            position: "top-center",
            autoClose: false,
            closeButton: false,
            style: {
                width: "450px", // Điều chỉnh chiều rộng của khung toast
                padding: "20px", // Thêm padding nếu cần
                backgroundColor: "#fff", // Màu nền của khung toast
                color: "white", // Màu chữ của nội dung toast
                borderRadius: "8px" // Bo tròn các góc của khung toast
            }
        });
    };

    const deleteBlog = async (id) => {
        try {
            const url = `http://localhost:8080/blog/${id}`;
            const response = await fetch(url, {
                    method: 'DELETE'
                }
            )
            if (response.ok) {
                setIsChanged(!isChanged);
                setCurrentPage(1);
                toast.success("Xóa blog thành công");
            } else {
                toast.warning("Đã xảy ra lỗi trong quá trình xóa blog!");
            }
        }catch (error){
            {
                toast.error("Đã xảy ra lỗi trong quá trình xóa blog!");
            }
        }
    }
    ////////////////////////////////////////////////////////////////
        return (
            <div className='h-[96vh] pl-3'>
                <div className='w-full h-[150px] relative'>
                    <div className='title-admin absolute top-0 left-0'>QUẢN LÝ BLOG</div>
                    <div className='absolute bottom-0 left-0'>
                        <input
                            className='bg-[#EAEDF2] border-2 border-[#858585] rounded-[5px] w-[400px] h-[40px] px-2'
                            placeholder='Nhập từ khóa tìm kiếm theo tiêu đề blog...'
                            value={currentSearch}
                            onChange={e => setCurrentSearch(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                    </div>
                    <div className='absolute bottom-1 left-[365px]' onClick={handleSearch}><Icon classIcon={faSearch} color={"black"}
                                                                          size={"24px"}/>
                    </div>
                    <div
                        className='absolute z-10 top-0 right-[190px] w-[80px] h-[80px] bg-[#E22E6D] text-[24px] font-bold text-white text-center flex flex-col justify-center rounded-[10px] shadow1'>BLOG
                    </div>
                    <div
                        className='absolute top-[40px] right-0 w-[300px] h-[110px] rounded-[5px] bg-white shadow1 flex flex-col justify-center text-right px-[30px]'>
                        <div>
                            <div className='text-[24px] text-black'>{totalBlog}</div>
                            <div className='text-[24px] text-black'>Bài viết</div>
                        </div>
                    </div>
                </div>

                {isModalOpen && (
                    <div className={`relative w-full mt-10`}>
                        <div className='w-full flex justify-between'>
                            <div
                                className='text-black text-[20px]'>{update ? "Chỉnh sửa bài viết" : "Thêm bài viết"}</div>
                            <div className='cursor-pointer hover:text-[#ff0000]'
                                 onClick={handleModalToggleClose}>{`[Đóng]`}</div>
                        </div>
                        <div className='flex mb-3 gap-[10px]'>
                            <div className='flex flex-col'>

                                <input
                                    className='bg-[#EAEDF2] border-2 border-[#858585] rounded-[5px] w-[400px] h-[40px] px-2'
                                    placeholder='Nhập tiêu đề...'
                                    value={title}
                                    onChange={handleTitleChange}
                                />
                                <div style={{color: "red"}}>{errorTitle}</div>
                                <textarea
                                    className='bg-[#EAEDF2] border-2 mt-[10px] border-[#858585] h-[100px] rounded-[5px] w-[400px] p-2'
                                    placeholder='Nhập nội dung...'
                                    value={description}
                                    onChange={handleDescriptionChange}
                                />
                                <div style={{color: "red"}}>{errorDescription}</div>
                            </div>

                            <div
                                className='h-[150px] w-full bg-[#EAEDF2] border-2 border-[#858585] rounded-[5px] p-[10px] flex gap-[10px]'>
                                {images.map((base64Image, index) => (
                                    <div key={index} className='relative'>
                                        <img
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

                        <button className='bg-[#0AFF05] px-3 py-2 rounded-[5px] text-black'
                                onClick={update ? handleUpdateBlog : handleCreateBLog}>Lưu
                        </button>
                    </div>
                )}

                <div className='table-all-posts h-auto mt-[50px]'>
                    <div
                        className='w-4/5 h-[60px] relative top-7 bg-[#E22E6D] text-center text-[24px] flex flex-col justify-center mx-auto rounded-[10px] text-white'>BÀI
                        VIẾT
                        {
                            !isModalOpen && !isDeleting && (<div
                                className='absolute right-[10px] w-[40px] h-[40px] border-2 border-white rounded-[5px] flex flex-col justify-center cursor-pointer'
                                onClick={handleModalToggle}>
                                <Icon classIcon={faPlus} color={"white"} size={"24px"}/>
                            </div>)
                        }

                    </div>

                    <div className='w-full bg-white shadow1 pt-[50px] px-[50px] rounded-[10px]'>
                        <div className='grid grid-cols-12 py-3 gap-2'>
                            <div className='col-span-1 text-[#E22E6D]'>ID</div>
                            <div className='col-span-2 text-[#E22E6D]'>Hình ảnh</div>
                            <div className='col-span-2 text-[#E22E6D]'>Nhân viên</div>
                            <div className='col-span-2 text-[#E22E6D]'>Tiêu đề</div>
                            <div className='col-span-3 text-[#E22E6D]'>Nội dung</div>
                            <div className='col-span-1 text-[#E22E6D]'>Ngày đăng</div>
                            <div className='col-span-1 text-[#E22E6D]'></div>
                        </div>
                        <div className='overflow-y-auto h-[50vh] pr-3'>
                            {blogList.map(blog => (
                                <div key={blog.blogId} className='grid grid-cols-12 border-t-2 border-[#D9D9D9] py-3 gap-2'>
                                    <div className='col-span-1 text-black flex flex-col justify-center'>{blog.blogId}</div>
                                    <div className='col-span-2 text-black flex flex-col justify-center'>
                                        <img className='w-3/5' src={blog.image} alt=""/>
                                    </div>
                                    <div
                                        className='col-span-2 text-black flex flex-col justify-center'>{blog.firstName + " " + blog.lastName}</div>
                                    <div
                                        className='col-span-2 text-black flex flex-col justify-center'>{getShortDescription(blog.title)}...
                                    </div>
                                    <div
                                        className='col-span-3 text-black flex flex-col justify-center'>{getShortDescription(blog.description)}...
                                    </div>
                                    <div
                                        className='col-span-1 text-black flex flex-col justify-center'>{formattedDate(blog.createdDate)}</div>
                                    <div className='col-span-1 text-black flex flex-col justify-center'>
                                        {(!isModalOpen && !isDeleting)  && (
                                            <div className='flex justify-end gap-2'>
                                                <div onClick={() => handleDeleteBlog(blog.blogId)}><Icon
                                                    classIcon={faTrashCan}
                                                    color={"black"}
                                                    size={"20px"}/></div>
                                                <div onClick={() => handleButtonUpdate(blog.blogId)}><Icon
                                                    classIcon={faPencil}
                                                    color={"black"}
                                                    size={"20px"}/></div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))
                            }
                        </div>
                        <Pagination currentPage={currentPage} totalPage={totalPage}
                                    handlePageChange={handlePageChange}/>
                    </div>
                </div>
            </div>
        )
    }

    export default ManageBlog