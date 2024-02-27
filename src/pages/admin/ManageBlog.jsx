import React, { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faSearch,
    faPlus,
    faTrashCan,
    faPencil
} from "@fortawesome/free-solid-svg-icons";

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

const ManageBlog = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [images, setImages] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const [errorTitle, setErrorTitle] = useState("");
    const [errorDescription, setErrorDescription] = useState("");
    const [errorImages, setErrorImages] = useState("");

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    }
    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    }
    const handleModalToggle = () => {
        setIsModalOpen(!isModalOpen);
    };
    const handleModalToggleClose = () => {
        setImages([]);
        setIsModalOpen(!isModalOpen);
    }

    const handleImageChange = (event) => {
        const selectedImage = event.target.files[0];
        // Thêm ảnh vào danh sách
        setImages([...images, selectedImage]);
    };

    const handleDelete = () => {
        setImages([]);
    }


    return (
        <div className='h-auto pl-3'>
            <div className='w-full h-[150px] relative'>
                <div className='title-admin absolute top-0 left-0'>QUẢN LÝ BLOG</div>
                <div className='absolute bottom-0 left-0'>
                    <input
                        className='bg-[#EAEDF2] border-2 border-[#858585] rounded-[5px] w-[400px] h-[40px] px-2'
                        placeholder='Nhập tên, email, số điện thoại...'
                    />
                </div>
                <div className='absolute bottom-1 left-[365px]'><Icon classIcon={faSearch} color={"black"} size={"24px"} /></div>
                <div className='absolute z-10 top-0 right-[190px] w-[80px] h-[80px] bg-[#E22E6D] text-[24px] font-bold text-white text-center flex flex-col justify-center rounded-[10px] shadow1'>BLOG</div>
                <div className='absolute top-[40px] right-0 w-[300px] h-[110px] rounded-[5px] bg-white shadow1 flex flex-col justify-center text-right px-[30px]'>
                    <div>
                        <div className='text-[24px] text-black'>12</div>
                        <div className='text-[24px] text-black'>Bài viết</div>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <div className={`relative w-full mt-10`}>
                    <div className='w-full flex justify-between'>
                        <div className='text-black text-[20px]'>Thêm bài viết</div>
                        <div className='cursor-pointer hover:text-[#ff0000]' onClick={handleModalToggleClose}>{`[Đóng]`}</div>
                    </div>
                    <div className='flex mb-3 gap-[10px]'>
                        <div className='flex flex-col'>
                            <input
                                className='bg-[#EAEDF2] border-2 border-[#858585] rounded-[5px] w-[400px] h-[40px] px-2'
                                placeholder='Nhập tiêu đề...'
                                value={title}
                                onChange={handleTitleChange}
                            />

                            <textarea
                                className='bg-[#EAEDF2] border-2 mt-[10px] border-[#858585] h-[100px] rounded-[5px] w-[400px] p-2'
                                placeholder='Nhập nội dung...'
                                value={description}
                                onChange={handleDescriptionChange}
                            />
                        </div>

                        <div className='h-[150px] w-full bg-[#EAEDF2] border-2 border-[#858585] rounded-[5px] p-[10px] flex gap-[10px]'>
                            {images.map((image, index) => (
                                <img
                                    key={index}
                                    src={URL.createObjectURL(image)}
                                    alt={`Image ${index}`}
                                    className='h-[126px] w-[126px] object-cover rounded-[5px]'
                                />
                            ))}
                            <label htmlFor='image-upload' className='cursor-pointer'>
                                <div className='h-[126px] w-[126px] border-2 outline-dashed rounded-[3px] flex flex-col justify-center text-center'>
                                    <input
                                        id='image-upload'
                                        type='file'
                                        accept='image/*'
                                        onChange={handleImageChange}
                                        style={{ display: 'none' }}
                                    />
                                    <div className='w-[40px] h-[40px] rounded-[5px] flex flex-col justify-center mx-auto'>
                                        <Icon classIcon={faPlus} color={"black"} size={"40px"} />
                                    </div>
                                </div>
                            </label>
                        </div>
                    </div>

                    <button className='bg-[#0AFF05] px-3 py-2 rounded-[5px] text-black'>Thêm</button>
                    <button className='bg-[#ff2e2e] px-3 py-2 rounded-[5px] text-white ml-3' onClick={handleDelete}>Xóa</button>
                </div>
            )}

            <div className='table-all-posts h-auto mt-[50px]'>
                <div className='w-4/5 h-[60px] relative top-7 shadow1 bg-[#E22E6D] text-center text-[24px] flex flex-col justify-center mx-auto rounded-[10px] text-white'>BÀI VIẾT
                    <div className='absolute right-[10px] w-[40px] h-[40px] border-2 border-white rounded-[5px] flex flex-col justify-center cursor-pointer' onClick={handleModalToggle}>
                        <Icon classIcon={faPlus} color={"white"} size={"24px"} />
                    </div>
                </div>

                <div className='h-[69vh] w-full bg-white shadow1 pt-[50px] px-[50px] rounded-[10px]'>
                    <div className='grid grid-cols-12 py-3 gap-2'>
                        <div className='col-span-1 text-[#E22E6D]'>ID</div>
                        <div className='col-span-2 text-[#E22E6D]'>Hình ảnh</div>
                        <div className='col-span-2 text-[#E22E6D]'>Nhân viên</div>
                        <div className='col-span-2 text-[#E22E6D]'>Tiêu đề</div>
                        <div className='col-span-3 text-[#E22E6D]'>Nội dung</div>
                        <div className='col-span-1 text-[#E22E6D]'>Ngày đăng</div>
                        <div className='col-span-1 text-[#E22E6D]'></div>
                    </div>

                    <div className='grid grid-cols-12 border-t-2 border-[#D9D9D9] py-3 gap-2'>
                        <div className='col-span-1 text-black flex flex-col justify-center'>1</div>
                        <div className='col-span-2 text-black flex flex-col justify-center'>
                            <img className='w-3/5' src='../../public/images/image 2.png' />
                        </div>
                        <div className='col-span-2 text-black flex flex-col justify-center'>Nguyễn Công Chiến</div>
                        <div className='col-span-2 text-black flex flex-col justify-center'>Lorem Ipsum Dolo...</div>
                        <div className='col-span-3 text-black flex flex-col justify-center'>Lorem Ipsum Dolo...</div>
                        <div className='col-span-1 text-black flex flex-col justify-center'>1/1/2024</div>
                        <div className='col-span-1 text-black flex flex-col justify-center'>
                            <div className='flex justify-end gap-2'>
                                <Icon classIcon={faTrashCan} color={"black"} size={"20px"} />
                                <Icon classIcon={faPencil} color={"black"} size={"20px"} />
                            </div>
                        </div>
                    </div>

                    <div className='grid grid-cols-12 border-t-2 border-[#D9D9D9] py-3 gap-2'>
                        <div className='col-span-1 text-black flex flex-col justify-center'>2</div>
                        <div className='col-span-2 text-black flex flex-col justify-center'>
                            <img className='w-3/5' src='../../public/images/image 2.png' />
                        </div>
                        <div className='col-span-2 text-black flex flex-col justify-center'>Nguyễn Công Chiến</div>
                        <div className='col-span-2 text-black flex flex-col justify-center'>Lorem Ipsum Dolo...</div>
                        <div className='col-span-3 text-black flex flex-col justify-center'>Lorem Ipsum Dolo...</div>
                        <div className='col-span-1 text-black flex flex-col justify-center'>1/1/2024</div>
                        <div className='col-span-1 text-black flex flex-col justify-center'>
                            <div className='flex justify-end gap-2'>
                                <Icon classIcon={faTrashCan} color={"black"} size={"20px"} />
                                <Icon classIcon={faPencil} color={"black"} size={"20px"} />
                            </div>
                        </div>
                    </div>

                    <div className='grid grid-cols-12 border-t-2 border-[#D9D9D9] py-3 gap-2'>
                        <div className='col-span-1 text-black flex flex-col justify-center'>3</div>
                        <div className='col-span-2 text-black flex flex-col justify-center'>
                            <img className='w-3/5' src='../../public/images/image 2.png' />
                        </div>
                        <div className='col-span-2 text-black flex flex-col justify-center'>Nguyễn Công Chiến</div>
                        <div className='col-span-2 text-black flex flex-col justify-center'>Lorem Ipsum Dolo...</div>
                        <div className='col-span-3 text-black flex flex-col justify-center'>Lorem Ipsum Dolo...</div>
                        <div className='col-span-1 text-black flex flex-col justify-center'>1/1/2024</div>
                        <div className='col-span-1 text-black flex flex-col justify-center'>
                            <div className='flex justify-end gap-2'>
                                <Icon classIcon={faTrashCan} color={"black"} size={"20px"} />
                                <Icon classIcon={faPencil} color={"black"} size={"20px"} />
                            </div>
                        </div>
                    </div>

                    <div className='grid grid-cols-12 border-t-2 border-[#D9D9D9] py-3 gap-2'>
                        <div className='col-span-1 text-black flex flex-col justify-center'>4</div>
                        <div className='col-span-2 text-black flex flex-col justify-center'>
                            <img className='w-3/5' src='../../public/images/image 2.png' />
                        </div>
                        <div className='col-span-2 text-black flex flex-col justify-center'>Nguyễn Công Chiến</div>
                        <div className='col-span-2 text-black flex flex-col justify-center'>Lorem Ipsum Dolo...</div>
                        <div className='col-span-3 text-black flex flex-col justify-center'>Lorem Ipsum Dolo...</div>
                        <div className='col-span-1 text-black flex flex-col justify-center'>1/1/2024</div>
                        <div className='col-span-1 text-black flex flex-col justify-center'>
                            <div className='flex justify-end gap-2'>
                                <Icon classIcon={faTrashCan} color={"black"} size={"20px"} />
                                <Icon classIcon={faPencil} color={"black"} size={"20px"} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ManageBlog