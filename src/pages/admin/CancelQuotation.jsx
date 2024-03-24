import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from 'antd';
import axios from 'axios';
import { getValidCurrency } from "../../utils/Validation.js";
import { Link } from "react-router-dom";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

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

const CancelQuotationAdmin = () => {
    const [quotationList, setQuotationList] = useState([]);
    const [currentSearch, setCurrentSearch] = useState('');
    const [totalList, setTotalList] = useState(0); // State lưu trữ tổng số bài viết

    const fetchCancelledQuotations = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/finished/cancel?keyword=${currentSearch}`);
            const data = response.data; // Dữ liệu trả về từ API
            setQuotationList(data);
            setTotalList(data.length);

        } catch (error) {
            console.error('Error fetching cancelled quotations:', error);
        }
    };

    useEffect(() => {
        fetchCancelledQuotations();
    }, [currentSearch]);

    const handleSearch = () => {
        fetchCancelledQuotations();
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div>
            <div className='h-auto pl-3'>
                <div className='table-all-posts h-auto mt-[50px]'>

                    <div className='w-full h-[150px] relative'>
                        <div className='title-admin absolute top-0 left-0'>QUẢN LÝ BÁO GIÁ ĐÃ HUỶ</div>
                        <div className='absolute bottom-0 left-0'>
                            <input
                                className='bg-[#EAEDF2] border-2 border-[#858585] rounded-[5px] w-[500px] h-[40px] px-2'
                                placeholder='Nhập từ khóa tìm kiếm theo id khách hàng và id list...'
                                value={currentSearch}
                                onChange={e => setCurrentSearch(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                        </div>
                        <div className='absolute bottom-1 left-[465px]' onClick={handleSearch}>
                            <Icon classIcon={faSearch} color={"black"} size={"24px"}/>
                        </div>
                        <div
                            className='absolute z-10 top-0 right-[190px] w-[80px] h-[80px] bg-[#E22E6D] text-[24px] font-bold text-white text-center flex flex-col justify-center rounded-[10px] shadow1'>
                            QUOT
                        </div>
                        <div
                            className='absolute top-[40px] right-0 w-[300px] h-[110px] rounded-[5px] bg-white shadow1 flex flex-col justify-center text-right px-[30px]'>
                            <div>
                                <div className='text-[24px] text-black'>{totalList}</div>
                                <div className='text-[24px] text-black'>Báo giá đã huỷ</div>
                            </div>
                        </div>
                    </div>

                    <div
                        className="w-4/5 h-[60px] shadow1 relative top-7 text-center text-[24px] flex flex-col justify-center mx-auto rounded-[10px] text-white"
                        style={{backgroundColor: '#fc1e62'}}>
                        CÁC ĐƠN BÁO GIÁ ĐÃ HUỶ
                    </div>
                    <div className='w-full bg-white shadow1 pt-[50px] px-[50px] rounded-[10px]'>
                        <div className='grid grid-cols-10 py-3 gap-2'>
                            <div className='col-span-1 text-[#348EED]'>ID báo giá</div>
                            <div className='col-span-1 text-[#348EED]'>ID khách hàng</div>
                            <div className='col-span-1 text-[#348EED]'>Ngày Tạo</div>
                            <div className='col-span-2 text-[#348EED]'>Giá ước tính</div>
                            <div className='col-span-2 text-[#348EED]'>Giá thực tế</div>
                            <div className='col-span-2 text-[#348EED]'>Trạng Thái</div>
                            <div className='col-span-1 text-[#348EED]'>Chi tiết báo giá</div>
                        </div>
                        <div className='overflow-y-auto h-[44vh] pr-3'>
                            {quotationList.map((item, index) => (
                                <div className='grid grid-cols-10 border-t-2 border-[#D9D9D9] py-3 gap-2' key={index}>
                                    <div
                                        className='col-span-1 text-black flex flex-col justify-center'>{item.listId}</div>
                                    <div
                                        className='col-span-1 text-black flex flex-col justify-center'>{item.customerId}</div>
                                    <div
                                        className='col-span-1 text-black flex flex-col justify-center'>{item.createdDate}</div>
                                    <div
                                        className='col-span-2 text-black flex flex-col justify-center'>{getValidCurrency(item.estimateTotalPrice)}</div>
                                    <div
                                        className='col-span-2 text-black flex flex-col justify-center'>{getValidCurrency(item.realTotalPrice)}</div>
                                    <div className='col-span-2 text-black flex flex-col justify-center'>Đã huỷ báo giá
                                    </div>
                                    <div className='col-span-1 text-black flex flex-col justify-center'>
                                        <div className='flex justify-end gap-2'>
                                            <Button type="primary" style={{
                                                borderColor: '#00BFFF',
                                                color: '#00BFFF',
                                                fontWeight: 'bold'
                                            }}>
                                                <Link to={`my-quotation/${item.listId}`}>Xem báo giá</Link>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default CancelQuotationAdmin;
