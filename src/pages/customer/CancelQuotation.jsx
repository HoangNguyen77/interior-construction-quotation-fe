import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from 'antd';
import axios from 'axios';
import { getIdUserByToken } from "../../utils/JwtService";
import { getValidCurrency } from "../../utils/Validation.js";
import { Link } from "react-router-dom";

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

const CancelQuotationCustomer = () => {
    const [quotationList, setQuotationList] = useState([]);
    const userId = parseInt(getIdUserByToken());

    const fetchCancelledQuotations = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/quotation-list/search/findListWithStatusIdIs5ByCustomerId?customerId=${userId}`);
            const data = response.data._embedded.quotationLists; // Access the correct data structure
            setQuotationList(data);
        } catch (error) {
            console.error('Error fetching cancelled quotations:', error);
        }
    };

    useEffect(() => {
        fetchCancelledQuotations();
    }, []);

    return (
        <div>
            <div className='h-auto pl-3'>
                <div className='table-all-posts h-auto mt-[50px]'>
                    <div className="w-4/5 h-[60px] shadow1 relative top-7 text-center text-[24px] flex flex-col justify-center mx-auto rounded-[10px] text-white" style={{ backgroundColor: '#00BFFF' }}>
                        CÁC ĐƠN BÁO GIÁ ĐÃ HUỶ
                    </div>
                    <div className='w-full bg-white shadow1 pt-[50px] px-[50px] rounded-[10px]'>
                        <div className='grid grid-cols-10 py-3 gap-2'>
                            <div className='col-span-1 text-[#348EED]'>ID Báo Giá</div>
                            <div className='col-span-2 text-[#348EED]'>Ngày Tạo</div>
                            <div className='col-span-2 text-[#348EED]'>Giá Ước Tính</div>
                            <div className='col-span-2 text-[#348EED]'>Giá Thực Tế</div>
                            <div className='col-span-2 text-[#348EED]'>Trạng Thái</div>
                            <div className='col-span-1 text-[#348EED]'></div>
                        </div>
                        <div className='overflow-y-auto h-[44vh] pr-3'>
                            {quotationList.map((item, index) => (
                                <div className='grid grid-cols-10 border-t-2 border-[#D9D9D9] py-3 gap-2' key={index}>
                                    <div className='col-span-1 text-black flex flex-col justify-center'>{item.listId}</div>
                                    <div className='col-span-2 text-black flex flex-col justify-center'>{item.createdDate}</div>
                                    <div className='col-span-2 text-black flex flex-col justify-center'>{getValidCurrency(item.estimateTotalPrice)}</div>
                                    <div className='col-span-2 text-black flex flex-col justify-center'>{getValidCurrency(item.realTotalPrice)}</div>
                                    <div className='col-span-2 text-black flex flex-col justify-center'>Đã huỷ báo giá</div>
                                    <div className='col-span-1 text-black flex flex-col justify-center'>
                                        <div className='flex justify-end gap-2'>
                                            <Button type="primary" style={{ borderColor: '#00BFFF', color: '#00BFFF', fontWeight: 'bold' }}>
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

export default CancelQuotationCustomer;
