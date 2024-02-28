import React, { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faSearch,
    faNewspaper,
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

const ManageFinished = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [images, setImages] = useState([]);

    const handleModalToggle = () => {
        setIsModalOpen(!isModalOpen);
    };

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
                <div className='title-admin absolute top-0 left-0'>DỰ ÁM ĐÃ THI CÔNG</div>
                <div className='absolute bottom-0 left-0'>
                    <input
                        className='bg-[#EAEDF2] border-2 border-[#858585] rounded-[5px] w-[400px] h-[40px] px-2'
                        placeholder='Nhập tên, email, số điện thoại...'
                    />
                </div>
                <div className='absolute bottom-1 left-[365px]'><Icon classIcon={faSearch} color={"black"} size={"24px"} /></div>
                <div className='absolute z-10 top-0 right-[190px] w-[80px] h-[80px] bg-[#348EED] text-[16px] font-bold text-white text-center flex flex-col justify-center rounded-[10px] shadow1'>
                    <Icon classIcon={faNewspaper} color={"white"} size={"32px"} />
                </div>
                <div className='absolute top-[40px] right-0 w-[300px] h-[110px] rounded-[5px] bg-white shadow1 flex flex-col justify-center text-right px-[30px]'>
                    <div>
                        <div className='text-[24px] text-black'>12</div>
                        <div className='text-[24px] text-black'>Dự án</div>
                    </div>
                </div>
            </div>

            <div className='table-all-posts h-auto mt-[50px]'>
                <div className='w-4/5 h-[60px] relative top-7 shadow1 bg-[#348EED] text-center text-[24px] flex flex-col justify-center mx-auto rounded-[10px] text-white'>DỰ ÁN ĐÃ THI CÔNG</div>

                <div className='h-[69vh] w-full bg-white shadow1 pt-[50px] px-[50px] rounded-[10px]'>
                    <div className='grid grid-cols-10 py-3 gap-2'>
                        <div className='col-span-1 text-[#348EED]'>ID</div>
                        <div className='col-span-2 text-[#348EED]'>Hình ảnh</div>
                        <div className='col-span-2 text-[#348EED]'>Tiêu đề</div>
                        <div className='col-span-3 text-[#348EED]'>Nội dung</div>
                        <div className='col-span-1 text-[#348EED]'>Ngày kết thúc</div>
                        <div className='col-span-1 text-[#348EED]'></div>
                    </div>

                    <div className='grid grid-cols-10 border-t-2 border-[#D9D9D9] py-3 gap-2'>
                        <div className='col-span-1 text-black flex flex-col justify-center'>1</div>
                        <div className='col-span-2 text-black flex flex-col justify-center'>
                            <img className='w-1/2' src='../../public/images/image 2.png' />
                        </div>
                        <div className='col-span-2 text-black flex flex-col justify-center'>Lorem Ipsum Dolo</div>
                        <div className='col-span-3 text-black flex flex-col justify-center'>Lorem Ipsum Dolo...</div>
                        <div className='col-span-1 text-black flex flex-col justify-center'>1/1/2024</div>
                        <div className='col-span-1 text-black flex flex-col justify-center'>
                            <div className='flex justify-end gap-2'>
                                <Icon classIcon={faTrashCan} color={"black"} size={"20px"} />
                                <Icon classIcon={faPencil} color={"black"} size={"20px"} />
                            </div>
                        </div>
                    </div>

                    <div className='grid grid-cols-10 border-t-2 border-[#D9D9D9] py-3 gap-2'>
                        <div className='col-span-1 text-black flex flex-col justify-center'>1</div>
                        <div className='col-span-2 text-black flex flex-col justify-center'>
                            <img className='w-1/2' src='../../public/images/image 2.png' />
                        </div>
                        <div className='col-span-2 text-black flex flex-col justify-center'>Lorem Ipsum Dolo</div>
                        <div className='col-span-3 text-black flex flex-col justify-center'>Lorem Ipsum Dolo...</div>
                        <div className='col-span-1 text-black flex flex-col justify-center'>1/1/2024</div>
                        <div className='col-span-1 text-black flex flex-col justify-center'>
                            <div className='flex justify-end gap-2'>
                                <Icon classIcon={faTrashCan} color={"black"} size={"20px"} />
                                <Icon classIcon={faPencil} color={"black"} size={"20px"} />
                            </div>
                        </div>
                    </div>

                    <div className='grid grid-cols-10 border-t-2 border-[#D9D9D9] py-3 gap-2'>
                        <div className='col-span-1 text-black flex flex-col justify-center'>1</div>
                        <div className='col-span-2 text-black flex flex-col justify-center'>
                            <img className='w-1/2' src='../../public/images/image 2.png' />
                        </div>
                        <div className='col-span-2 text-black flex flex-col justify-center'>Lorem Ipsum Dolo</div>
                        <div className='col-span-3 text-black flex flex-col justify-center'>Lorem Ipsum Dolo...</div>
                        <div className='col-span-1 text-black flex flex-col justify-center'>1/1/2024</div>
                        <div className='col-span-1 text-black flex flex-col justify-center'>
                            <div className='flex justify-end gap-2'>
                                <Icon classIcon={faTrashCan} color={"black"} size={"20px"} />
                                <Icon classIcon={faPencil} color={"black"} size={"20px"} />
                            </div>
                        </div>
                    </div>

                    <div className='grid grid-cols-10 border-t-2 border-[#D9D9D9] py-3 gap-2'>
                        <div className='col-span-1 text-black flex flex-col justify-center'>1</div>
                        <div className='col-span-2 text-black flex flex-col justify-center'>
                            <img className='w-1/2' src='../../public/images/image 2.png' />
                        </div>
                        <div className='col-span-2 text-black flex flex-col justify-center'>Lorem Ipsum Dolo</div>
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

export default ManageFinished