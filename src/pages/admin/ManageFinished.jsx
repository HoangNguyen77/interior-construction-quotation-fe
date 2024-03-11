import React, {useEffect, useState} from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faSearch,
    faNewspaper,
    faTrashCan,
    faPencil, faRepeat, faUser, faPlus
} from "@fortawesome/free-solid-svg-icons";
import {
    getAllProjectImageData,
    getFinishedProjectById,
    getFinishedProjectsByTitle,
    getFinishedQuotation,
    getFinishedQuotationWithStatus
} from "../../api/finished/FinishedProjectAPI.js";
import Pagination from "../../utils/Pagination.jsx";
import {checkInput} from "../../utils/Validation.js";
import {toast} from "react-toastify";
import {getBlogById} from "../../api/blog/BlogAPI.js";
import {getProductById} from "../../api/product/ProductAPI.jsx";
import {getAllBlogImageData} from "../../api/blog/BlogImageAPI.js";
import {getIdUserByToken} from "../../utils/JwtService.js";
// import {validateWidthHeight} from "recharts/types/util/ReactUtils.js";

const Icon = ({ classIcon, color, size }) => {
    const iconSize = {
        width: size,
        height: size,
        color: color,
        cursor: "pointer"
    };

    return (
        <span>
            <FontAwesomeIcon icon={classIcon} style={iconSize} />
        </span>

    );
};

const ManageFinished = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [images, setImages] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [isModeShow, setModeShow] = useState(false);

    //error
    const [errorTitle, setErrorTitle] = useState("");
    const [errorDescription, setErrorDescription] = useState("");
    const [errorImages, setErrorImages] = useState("");
    //QUOTATION LIST
    const [quotationList, setQuotationList] = useState([]);
    const [totalQuotation, setTotalQuotation] = useState(0);
    const [totalPageQuotation, setTotalPageQuotation] = useState(0);
    const [currentPageQuotation, setCurrentPageQuotation] = useState(1);
    const [searchQuotation, setSearchQuotation] = useState("");
    const [currentSearchQuotation, setCurrentSearchQuotation] = useState("");
    const [option, setOption] = useState(0);
    const [listId, setListId] = useState(0);
    const [headerId, setHeaderId] = useState(0);
    //FINISHED PROJECT
    const [projectId, setProjectId] = useState(0);
    const [projectList, setProjectList] = useState([]);
    const [totalProject, setTotalProject] = useState(0);
    const [totalPageProject, setTotalPageProject] = useState(0);
    const [currentPageProject, setCurrentPageProject] = useState(1);
    const [searchProject, setSearchProject] = useState("");
    const [currentSearchProject, setCurrentSearchProject] = useState("");

    const [isChanged, setIsChanged] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const formattedDate = (createdDate) => {
        const date = new Date(createdDate);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };
    const handleModalToggle = (listId, headerId) => {
            if(!isModeShow) {
                setListId(listId);
                setHeaderId(headerId);
            }
            setIsModalOpen(!isModalOpen);
    };
    const handleModeShowToggle = () => {
        setModeShow(!isModeShow);
        setTitle("");
        setDescription("");
        setImages([]);
        setOption(0);
        setIsModalOpen(false);
    };
    const handleModalToggleClose = () => {
        setTitle("");
        setDescription("");
        setImages([]);
        // setUpdate(false);
        setListId(0);
        setProjectId(0);

        setErrorDescription("");
        setErrorTitle("");
        setErrorImages("");

        setIsModalOpen(!isModalOpen);
    }
    const handleRemoveImage = (indexToRemove) => {
        setImages(images.filter((_, index) => index !== indexToRemove));
    };
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
    const handleOptionChange = e => {
        const newValue = Number(e.target.value); // Convert to number
        setOption(newValue); // Update state
        setCurrentPageQuotation(1);
        setSearchQuotation("");
        setCurrentSearchQuotation("")
        console.log(newValue); // Log the new value directly
    }
    const handleKeyDownQuotation = (event) => {
        if (event.key === 'Enter') {
            setSearchQuotation(event.target.value);
            handleSearchQuotation();
        }
    }
    const handleKeyDownProject = (event) => {
        if (event.key === 'Enter') {
            setSearchQuotation(event.target.value);
            handleSearchProject();
        }
    }
    const handleSearchProject = () => {
        setSearchProject(currentSearchProject);
        setCurrentPageProject(1);
    }
    const handleSearchQuotation = () => {
        setSearchQuotation(currentSearchQuotation);
        setCurrentPageQuotation(1);
    }
    const getShortDescription = (description) => {
        const words = description.split(' ');
        const shortWords = words.slice(0, 5);
        const shortDescription = shortWords.join(' ');
        return shortDescription;
    };
    const handlePageQuotationChange = (page) => {
        setCurrentPageQuotation(page)
    }
    const handlePageProjectChange = (page) => {
        setCurrentPageProject(page)
    }
    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
        setErrorDescription("");
        return checkInput(setErrorDescription, e.target.value);
    }
    const handleTitleChange = (e) => {
        setTitle(e.target.value);
        setErrorTitle("");
        return checkInput(setErrorTitle, e.target.value);
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
    const handleCreateProject = async () => {
        const isImageFilesValid = !checkFileInput(setErrorImages, images);
        const isTitleValid = !checkInput(setErrorTitle, title);
        const isDescription = !checkInput(setErrorDescription, description);
        if (isImageFilesValid && isTitleValid && isDescription) {
            try {
                const url1 = `http://localhost:8080/finished/construct/${headerId}`
                const url2 = 'http://localhost:8080/finished/create-project';
                const response1 = await fetch(url1, {
                        method: 'PUT'
                    }
                )
                if (response1.ok){
                    const response2 = await fetch(url2, {
                            method: 'POST',
                            headers: {
                                'Content-type': 'application/json',
                                // 'Authorization':`Bearer ${localStorage.getItem('token')}`
                            },
                            body: JSON.stringify({
                                projectId: 0,
                                title: title,
                                content: description,
                                listId : listId,
                                images: images
                            })
                        }
                    )
                    if (response2.ok) {
                        setIsChanged(!isChanged);
                        setCurrentPageQuotation(1);
                        setCurrentSearchQuotation("");
                        setHeaderId(0);
                        setListId(0);
                        setIsModalOpen(!isModalOpen);
                        setTitle("");
                        setDescription("");
                        setImages([]);
                        toast.success("Thêm dự án thành công");
                    } else {
                        toast.warning("Đã xảy ra lỗi trong quá trình thêm dự án đã hoàn thành!");
                    }
                }else {
                    toast.warning("Đã xảy ra lỗi trong quá trình thêm dự án đã hoàn thành!");
                }
            } catch (error) {
                toast.warning("Đã xảy ra lỗi trong quá trình thêm blog!")
            }
        }
    }
    const  handleUpdateProject = async () => {
        const isImageFilesValid = !checkFileInput(setErrorImages, images);
        const isTitleValid = !checkInput(setErrorTitle, title);
        const isDescription = !checkInput(setErrorDescription, description);
        if (isImageFilesValid && isTitleValid && isDescription) {
            try {
                const url = `http://localhost:8080/finished/update-project`;
                const response = await fetch(url, {
                        method: 'PUT',
                        headers: {
                            'Content-type': 'application/json',
                        },
                        body: JSON.stringify({
                            projectId: projectId,
                            title: title,
                            content: description,
                            listId : 0,
                            images: images
                        })
                    }
                )
                if (response.ok) {
                    setIsChanged(!isChanged);
                    setCurrentSearchProject("");
                    setCurrentPageProject(1);
                    setProjectId(0);
                    setIsModalOpen(!isModalOpen);
                    setTitle("");
                    setDescription("");
                    setImages([]);
                    toast.success("Chỉnh sửa dự án đã thi công thành công");
                } else {
                    toast.warning("Đã xảy ra lỗi trong quá trình chỉnh sửa dự án đã thi công!");
                }
            } catch (error) {
                toast.warning("Đã xảy ra lỗi trong quá trình chỉnh sửa dự án đã thi công!")
            }
        }
    }
    const handleButtonUpdate = async (projectId) => {
        setIsModalOpen(true);
        setProjectId(projectId);

        try {
            const projectResult = await getFinishedProjectById(projectId);
            console.log('Project data:', projectResult); // Check the structure
            if (projectResult) {
                setTitle(projectResult.title);
                setDescription(projectResult.content);
            } else {
                console.log('No project data returned');
            }
        }catch (error) {
            console.error('Failed to fetch project by ID:', error)
        }

        try {
            const imagesResult = await getAllProjectImageData(projectId);
            console.log('Image data:', imagesResult); // This should now reflect the structure you provided
            if (imagesResult && Array.isArray(imagesResult) && imagesResult.length > 0) {
                // Map over the imagesResult array to extract each imageData string
                const imageDataArray = imagesResult.map(img => img.imageData);
                setImages(imageDataArray);
            } else {
                console.log('No image data returned');
            }
        } catch (error) {
            console.error('Failed to fetch project images:', error);
        }
    }
    const handleDeleteQuotation = async (id) => {
        setIsDeleting(true);
        // Display toast confirmation
        toast.warn(({closeToast}) => (
            <div>
                <div className="h5">Nếu xóa đơn báo giá này thông tin về dự án thi công có thể bị xóa! Bạn có chắc chắn muốn xóa đơn báo giá này?</div>
                <div className="row justify-content-between">
                    <div className="col-2 btn btn-danger" onClick={() => {
                        deleteQuotation(id);
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
                width: "600px", // Điều chỉnh chiều rộng của khung toast
                padding: "20px", // Thêm padding nếu cần
                backgroundColor: "#fff", // Màu nền của khung toast
                color: "white", // Màu chữ của nội dung toast
                borderRadius: "8px" // Bo tròn các góc của khung toast
            }
        });
    };

    const deleteQuotation = async (id) => {
        try {
            const url = `http://localhost:8080/quotation-header/${id}`;
            const response = await fetch(url, {
                    method: 'DELETE'
                }
            )
            if (response.ok) {
                setIsChanged(!isChanged);
                setCurrentPageQuotation(1);
                setSearchQuotation("");
                toast.success("Xóa đơn báo giá thành công");
            } else {
                toast.warning("Đã xảy ra lỗi trong quá trình xóa đơn báo giá!");
            }
        }catch (error){
            {
                toast.error("Đã xảy ra lỗi trong quá trình xóa đơn báo giá!");
            }
        }
    }

    const handleDeleteProject = async (id) => {
        setIsDeleting(true);
        // Display toast confirmation
        toast.warn(({closeToast}) => (
            <div>
                <div className="h5">Bạn có chắc chắn muốn xóa thông tin về dự án đã thi công này?</div>
                <div className="row justify-content-between">
                    <div className="col-2 btn btn-danger" onClick={() => {
                        deleteProject(id);
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
                width: "600px", // Điều chỉnh chiều rộng của khung toast
                padding: "20px", // Thêm padding nếu cần
                backgroundColor: "#fff", // Màu nền của khung toast
                color: "white", // Màu chữ của nội dung toast
                borderRadius: "8px" // Bo tròn các góc của khung toast
            }
        });
    };

    const deleteProject = async (id) => {
        try {
            const url = `http://localhost:8080/finished/${id}`;
            const response = await fetch(url, {
                    method: 'DELETE'
                }
            )
            if (response.ok) {
                setIsChanged(!isChanged);
                setCurrentPageProject(1);
                setSearchProject("");
                toast.success("Xóa thông tin dự án đã thi công thành công");
            } else {
                toast.warning("Đã xảy ra lỗi trong quá trình xóa thông tin dự án đã thi công!");
            }
        }catch (error){
            {
                toast.error("Đã xảy ra lỗi trong quá trình xóa thông tin dự án đã thi công!");
            }
        }
    }
    useEffect(() => {
        getFinishedQuotation(0, "").then(
            result => {
                setTotalQuotation(result.totalQuotation);
            }
        )
        getFinishedProjectsByTitle(0, "", 4).then(
            result => {
                setTotalProject(result.totalProject);
            }
        )
        if (!isModeShow){
            if(option === 0){
                getFinishedQuotation((currentPageQuotation - 1), searchQuotation).then(
                    result => {
                        setQuotationList(result.quotationList);
                        setTotalPageQuotation(result.totalPages);
                    }
                )
            }else if (option === 1) {
                getFinishedQuotationWithStatus((currentPageQuotation - 1), searchQuotation, "true").then(
                    result => {
                        setQuotationList(result.quotationList);
                        setTotalPageQuotation(result.totalPages);
                    }
                )
            }else if (option === 2) {
                getFinishedQuotationWithStatus((currentPageQuotation - 1), searchQuotation, "false").then(
                    result => {
                        setQuotationList(result.quotationList);
                        setTotalPageQuotation(result.totalPages);
                    }
                )
            }
        }else {
            getFinishedProjectsByTitle((currentPageProject - 1), searchProject, 4).then(
                result => {
                    setProjectList(result.projectList);
                    setTotalPageProject(result.totalPage);
                }
            )
        }
    }, [searchQuotation, currentPageQuotation, option, isModeShow, searchProject, currentPageProject, isChanged]);


    return (

        <div className='h-auto pl-3'>
            <div className='w-full h-[150px] relative'>
                <div className='title-admin absolute top-0 left-0'>DỰ ÁN ĐÃ THI CÔNG</div>
                {/*---------------search quotation-----------------*/}
                {
                    !isModeShow ?
                        (<div>
                            <div className='absolute bottom-0 left-0'>
                                <input
                                    className='bg-[#EAEDF2] border-2 border-[#858585] rounded-[5px] w-[400px] h-[40px] px-2'
                                    placeholder='Tìm đơn báo giá theo tên khách hàng'
                                    value={currentSearchQuotation}
                                    onChange={e => setCurrentSearchQuotation(e.target.value)}
                                    onKeyDown={handleKeyDownQuotation}
                                />
                            </div>
                            <div className='absolute bottom-1 left-[365px]' onClick={handleSearchQuotation}><Icon classIcon={faSearch} color={"black"}
                                                                                  size={"24px"}/></div>
                            <select
                                className='absolute bottom-0 left-[420px] bg-[#EAEDF2] border-2 border-[#858585] rounded-[5px] w-[200px] h-[40px] px-2'
                                value={option}
                                onChange={handleOptionChange}
                            >
                                <option value={0}>Tất cả</option>
                                <option value={1}>Đã thi công</option>
                                <option value={2}>Chưa thi công</option>
                            </select>
                        </div>)
                        :
                        (<div>
                            <div className='absolute bottom-0 left-0'>
                                <input
                                    className='bg-[#EAEDF2] border-2 border-[#858585] rounded-[5px] w-[400px] h-[40px] px-2'
                                    placeholder='Tìm dự án đã thi công theo tiêu đề'
                                    value={currentSearchProject}
                                    onChange={e => setCurrentSearchProject(e.target.value)}
                                    onKeyDown={handleKeyDownProject}
                                />
                            </div>
                            <div className='absolute bottom-1 left-[365px]' onClick={handleSearchProject}><Icon classIcon={faSearch} color={"black"}
                                                                                  size={"24px"}/></div>
                        </div>)
                }
                <div
                    className='absolute z-10 top-0 right-[190px] w-[80px] h-[80px] bg-[#60B664] text-[24px] font-bold text-white text-center flex flex-col justify-center rounded-[10px] shadow1'>
                    <Icon classIcon={faNewspaper} color={"white"} size={"32px"}/>
                </div>
                <div
                    className='absolute top-[40px] right-0 w-[300px] h-[110px] rounded-[5px] bg-white shadow1 flex flex-col justify-center text-right px-[30px]'>
                    <div>
                        <div className='text-[24px] text-black'>{totalProject}</div>
                        <div className='text-[24px] text-black'>Dự án đã thi công</div>
                    </div>
                </div>

                <div
                    className='absolute z-10 top-0 right-[540px] w-[80px] h-[80px] bg-[#348EED] text-[24px] font-bold text-white text-center flex flex-col justify-center rounded-[10px] shadow1'>
                    <Icon classIcon={faNewspaper} color={"white"} size={"32px"}/>
                </div>
                <div
                    className='absolute top-[40px] right-[350px] w-[300px] h-[110px] rounded-[5px] bg-white shadow1 flex flex-col justify-center text-right px-[30px]'>
                    <div>
                        <div className='text-[24px] text-black'>{totalQuotation}</div>
                        <div className='text-[24px] text-black'>Các đơn báo giá đã hoàn thành</div>
                    </div>
                </div>
            </div>
            {isModalOpen && (
                <div className={`relative w-full mt-10`}>
                    <div className='w-full flex justify-between'>
                        <div
                            className='text-black text-[20px]'>{!isModeShow ? "Thêm vào dự án đã thi công" : "Chỉnh sửa dự án đã thi công"}</div>
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
                        onClick={!isModeShow ? handleCreateProject : handleUpdateProject}
                    >Lưu
                    </button>
                </div>
            )}


            <div className='table-all-posts h-auto mt-[50px]'>
                <div
                    className={`w-4/5 h-[60px] relative top-7 shadow1 ${isModeShow ? 'bg-[#60B664]' : 'bg-[#348EED]'} text-center text-[24px] flex flex-col justify-center mx-auto rounded-[10px] text-white`}>
                    {!isModeShow ? (`CÁC ĐƠN BÁO GIÁ ĐÃ HOÀN THÀNH`) : (`DỰ ÁN ĐÃ THI CÔNG`)}
                    {
                        !isDeleting && (
                            <div
                                className='absolute right-[10px] w-[40px] h-[40px] border-2 border-white rounded-[5px] flex flex-col justify-center cursor-pointer'
                                onClick={handleModeShowToggle}>
                                <Icon classIcon={faRepeat} color={"white"} size={"24px"}/>
                            </div>
                        )
                    }
                </div>

                {!isModeShow ? (
                    <>
                        <div className='h-[69vh] w-full bg-white shadow1 pt-[50px] px-[50px] rounded-[10px]'>
                            <div className='grid grid-cols-10 py-3 gap-2'>
                                <div className='col-span-1 text-[#348EED]'>ID</div>
                                <div className='col-span-2 text-[#348EED]'>Tên khách hàng</div>
                                <div className='col-span-2 text-[#348EED]'>Loại thi công</div>
                                <div className='col-span-3 text-[#348EED]'>Ngày hoàn thành báo giá</div>
                                <div className='col-span-1 text-[#348EED]'>Trạng thái</div>
                                <div className='col-span-1 text-[#348EED]'></div>
                            </div>
                            {
                                quotationList.map(quotation => (
                                    <div key={quotation.headerId} className='grid grid-cols-10 border-t-2 border-[#D9D9D9] py-3 gap-2'>
                                        <div className='col-span-1 text-black flex flex-col justify-center'>{quotation.headerId}</div>
                                        <div className='col-span-2 text-black flex flex-col justify-center'>
                                            {quotation.firstName + " " + quotation.lastName}
                                        </div>
                                        <div className='col-span-2 text-black flex flex-col justify-center'>{quotation.constructionName}
                                        </div>
                                        <div className='col-span-3 text-black flex flex-col justify-center'>{formattedDate(quotation.createdDate)}
                                        </div>
                                        <div className={`col-span-1 ${quotation.constructed ? 'text-green-500' : 'text-red-500'} flex flex-col justify-center`}>
                                            {quotation.constructed ? 'Đã thi công' : 'Chưa thi công'}
                                        </div>
                                        {
                                            (!isModalOpen && !isDeleting) && (
                                                <div className='col-span-1 text-black flex flex-col justify-center'>
                                                    <div className='flex justify-end gap-2'>
                                                        {
                                                            !quotation.hasProject && (<div onClick={()=> handleModalToggle(quotation.listId, quotation.headerId)}>
                                                                <Icon classIcon={faPlus} color={"black"} size={"20px"}/>
                                                            </div>)
                                                        }
                                                        <div onClick={() => handleDeleteQuotation(quotation.headerId)}>
                                                            <Icon classIcon={faTrashCan} color={"black"} size={"20px"}/>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        }

                                    </div>
                                ))
                            }
                            <Pagination currentPage={currentPageQuotation} totalPage={totalPageQuotation}
                                        handlePageChange={handlePageQuotationChange}/>

                        </div>
                    </>

                ) : (
                    <>
                        <div className='h-[69vh] w-full bg-white shadow1 pt-[50px] px-[50px] rounded-[10px]'>
                            <div className='grid grid-cols-10 py-3 gap-2'>
                                <div className='col-span-1 text-[#348EED]'>ID</div>
                                <div className='col-span-2 text-[#348EED]'>Hình ảnh</div>
                                <div className='col-span-2 text-[#348EED]'>Tiêu đề</div>
                                <div className='col-span-2 text-[#348EED]'>Nội dung</div>
                                <div className='col-span-2 text-[#348EED]'>Ngày hoàn thành thi công</div>
                                <div className='col-span-1 text-[#348EED]'></div>
                            </div>
                            {
                                projectList.map(project => (
                                    <div key={project.projectId} className='grid grid-cols-10 border-t-2 border-[#D9D9D9] py-3 gap-2'>
                                        <div className='col-span-1 text-black flex flex-col justify-center'>{project.projectId}</div>
                                        <div className='col-span-2 text-black flex flex-col justify-center'>
                                            <img className='w-1/2' src={project.image}/>
                                        </div>
                                        <div className='col-span-2 text-black flex flex-col justify-center'>{getShortDescription(project.title)}...
                                        </div>
                                        <div className='col-span-2 text-black flex flex-col justify-center'>{getShortDescription(project.content)}...
                                        </div>
                                        <div className='col-span-2 text-black flex flex-col justify-center'>{formattedDate(project.finishedDate)}
                                        </div>
                                        {
                                            (!isModalOpen && !isDeleting) && (
                                                <div className='col-span-1 text-black flex flex-col justify-center'>
                                                    <div className='flex justify-end gap-2'>
                                                        <div onClick={() => handleDeleteProject(project.projectId)}>
                                                            <Icon classIcon={faTrashCan} color={"black"} size={"20px"}/>
                                                        </div>
                                                        <div onClick={() => handleButtonUpdate(project.projectId)}>
                                                            <Icon classIcon={faPencil} color={"black"} size={"20px"}/>
                                                        </div>
                                                    </div>
                                                </div>)
                                        }

                                    </div>
                                ))
                            }
                            <Pagination currentPage={currentPageProject} totalPage={totalPageProject}
                                        handlePageChange={handlePageProjectChange}/>
                        </div>
                    </>
                )
                }
            </div>
        </div>
    )
}

export default ManageFinished