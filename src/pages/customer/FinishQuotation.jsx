import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faEye} from "@fortawesome/free-solid-svg-icons";
import {Button, message, Modal} from 'antd';
import axios from 'axios';
import { getIdUserByToken } from "../../utils/JwtService";
import { getValidCurrency } from "../../utils/Validation.js";
import {Link} from "react-router-dom";
const { confirm } = Modal;

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

const FinishedQuotationCustomer = () => {
    const [quotationList, setQuotationList] = useState([]);
    const userId = parseInt(getIdUserByToken());
    const [change, setChange] = useState(false);

    const fetchFinishedQuotations = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/quotation-list/search/findListWithStatusIdIs4ByCustomerId?customerId=${userId}`);
            const data = response.data._embedded.quotationLists; // Modify to access the correct data structure

            setQuotationList(data);
        } catch (error) {
            console.error('Error fetching finished quotations:', error);
        }
    };

    useEffect(() => {
        fetchFinishedQuotations();
    }, [change]);

    const deleteQuotationHeader = async (id) => {
        try {
            const response = await axios.put(`http://localhost:8080/quotation/cancel-confirm-quotation?quotation-list-id=${id}`);
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error('Error deleting quotation header:', error);
            throw error;
        }
    };


    const showConfirmDelete = (headerId) => {
        confirm({
            title: 'Hủy đơn báo giá này?',
            okText: 'Xóa',
            cancelText: 'Thoát', // Đặt văn bản của nút Cancel thành "Thoát"
            okButtonProps: { className: 'text-red-500 ' }, // Thiết lập màu chữ của nút Delete thành đỏ
            onOk() {
                deleteQuotationHeader(headerId)
                    .then((data) => {
                        message.success("Đã hủy đơn báo giá");
                        setChange(!change);
                    })
                    .catch((error) => {
                        console.error('Error deleting quotation header:', error);
                    });
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };
    return (
        <div>
            <div className='h-auto pl-3'>
                <div className='table-all-posts h-auto mt-[50px]'>

                    <div
                        className="w-4/5 h-[60px] shadow1 relative top-7 text-center text-[24px] flex flex-col justify-center mx-auto rounded-[10px] text-white"
                        style={{backgroundColor: '#00BFFF'}}>
                        CÁC ĐƠN BÁO GIÁ ĐÃ ĐÃ XÁC NHẬN
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
                                <div
                                    className='col-span-2 text-black flex flex-col justify-center'>{item.createdDate}</div>
                                <div
                                    className='col-span-2 text-black flex flex-col justify-center'>{getValidCurrency(item.estimateTotalPrice)}</div>
                                <div
                                    className='col-span-2 text-black flex flex-col justify-center'>{getValidCurrency(item.realTotalPrice)}</div>
                                <div className='col-span-2 text-black flex flex-col justify-center'>Đã xác nhận báo giá</div>
                                <div className='col-span-1 text-black flex flex-col justify-center'>
                                    <div className='flex justify-end gap-2'>
                                        <Button type="primary"
                                                style={{borderColor: '#ff0000', color: '#ff0015', fontWeight: 'bold'}}
                                                onClick={()=>showConfirmDelete(item.listId)}
                                        >
                                            Hủy báo giá
                                        </Button>
                                        <Button type="primary"
                                                style={{borderColor: '#00BFFF', color: '#00BFFF', fontWeight: 'bold'}}>
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

export default FinishedQuotationCustomer;
