import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTrashCan,
    faPencil,
    faRepeat,
    faArrowLeft,
    faCheck,
    faEye,

} from "@fortawesome/free-solid-svg-icons";

import { Button, Modal, message } from 'antd';
import QuoteTableConfirm from './QuoteTableConfirm';
import axios from 'axios';
import {
    getIdUserByToken
} from "../../utils/JwtService";
import {getValidCurrency} from "../../utils/Validation.js";
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

const ManageQuotationCustomer = () => {
    const [isModeShow, setModeShow] = useState(false);
    const [isModeShow2, setModeShow2] = useState(false)
    const [initialArr, setInitialArr] = useState([])
    const [headerS2, setHeaderS2] = useState([])
    const [quotationList, setQuotationList] = useState([]);
    const userId = parseInt(getIdUserByToken());
    console.log(userId)

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/users/${userId}/customerQuotationHeaders`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                }
            });
            // console.log(response)
            const quotationHeaders = response.data._embedded.quotationHeaders;

            const quotationDataPromises = quotationHeaders.map(async (quotationHeader) => {
                try {
                    const customerResponse = await axios.get(quotationHeader._links.customer.href, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem("token")}`,
                        }
                    });
                    const customerInfo = customerResponse.data;

                    const listResponse = await axios.get(quotationHeader._links.list.href, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem("token")}`,
                        }
                    });
                    const listData = listResponse.data._embedded.quotationLists;
                    // console.log(listData)

                    // Fetch the status from the status endpoint
                    const statusResponse = await axios.get(listData[0]._links.status.href, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem("token")}`,
                        }
                    });
                    console.log("t"+ JSON.stringify(listData[0]._links.status))
                    const listStatus = statusResponse.data.statusId;

                    // Check if status is 1
                    if (listStatus === 1) {
                        const listID = listData[0].listId;
                        const createDate = listData[0].createdDate;
                        return {
                            quotationHeader,
                            customerInfo,
                            listID,
                            createDate
                        };
                    } else {
                        return null; // Skip this quotationHeader if status is not 1
                    }
                } catch (error) {
                    console.error('Error fetching customer info or list status:', error);
                    return null;
                }
            });

            const quotationData = await Promise.all(quotationDataPromises);
            // Filter out null values (headers with list status != 1)
            const filteredQuotationData = quotationData.filter(data => data !== null);
            // console.log(filteredQuotationData);
            setInitialArr(filteredQuotationData)
        } catch (error) {
            console.error('There was a problem fetching quotation headers:', error);
        }
    };

    useEffect(() => {


        fetchData();
    }, []);
    const fetchData2 = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/quotation-header`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                }
            });
            const quotationHeaders = response.data._embedded.quotationHeaders;

            const quotationDataPromises = quotationHeaders.map(async (quotationHeader) => {
                try {
                    const customerResponse = await axios.get(quotationHeader._links.customer.href, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem("token")}`,
                        }
                    });
                    const customerInfo = customerResponse.data;

                    const listResponse = await axios.get(quotationHeader._links.list.href, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem("token")}`,
                        }
                    });
                    const listData = listResponse.data._embedded.quotationLists;
                    // console.log(listData)

                    // Fetch the status from the status endpoint
                    const statusResponse = await axios.get(listData[0]._links.status.href, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem("token")}`,
                        }
                    });
                    const listStatus = statusResponse.data.statusId;

                    // Check if status is 1
                    if (listStatus !== 1 && listStatus !== 4) {
                        const listID = listData[0].listId;
                        const createDate = listData[0].createdDate;
                        return {
                            quotationHeader,
                            customerInfo,
                            listID,
                            createDate
                        };
                    } else {
                        return null; // Skip this quotationHeader if status is not 1
                    }
                } catch (error) {
                    console.error('Error fetching customer info or list status:', error);
                    return null;
                }
            });

            const quotationData = await Promise.all(quotationDataPromises);
            // Filter out null values (headers with list status != 1)
            const filteredQuotationData = quotationData.filter(data => data !== null);
            // console.log(filteredQuotationData);
            setHeaderS2(filteredQuotationData)
        } catch (error) {
            console.error('There was a problem fetching quotation headers:', error);
        }
    };
    useEffect(() => {


        fetchData2();
    }, []);

    const handleModeShowToggle = () => {
        setModeShow(!isModeShow);
    };
    const handleModeShow2Toggle = () => {
        setModeShow2(!isModeShow2);
    };

    const deleteQuotationHeader = async (id) => {
        try {
            const response = await axios.post(`http://localhost:8080/quotation/delete-quotation-header?id=${id}`);
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error('Error deleting quotation header:', error);
            throw error;
        }
    };


    const showConfirmDelete = (headerId) => {
        confirm({
            title: 'Xoá yêu cầu báo giá?',
                okText: 'Xoá',
            cancelText: 'Thoát', // Đặt văn bản của nút Cancel thành "Thoát"
            okButtonProps: { className: 'text-red-500 ' }, // Thiết lập màu chữ của nút Delete thành đỏ
            onOk() {
                deleteQuotationHeader(headerId)
                    .then((data) => {
                        message.success("Đã xoá đơn báo giá");
                        fetchData();
                        fetchData2();
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



    const handleQuotationList = async (headerId) => {
        setModeShow2(!isModeShow2);
        try {
            const response = await axios.get(`http://localhost:8080/quotation-list/search/findByQuotationHeader_HeaderId?headerId=${headerId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                }
            });
            const list = response.data._embedded.quotationLists;
            const quotaionWithStatusPromises = list.map( async (quotation) =>{
                const statusResponse = await axios.get(quotation._links.status.href, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem("token")}`,
                    }
                });
                const status = statusResponse.data;
                return {...quotation, status}
            })
            const quotationWithStatus = await Promise.all(quotaionWithStatusPromises);
            const quotationWithHeaderPromises = quotationWithStatus.map( async (quotation) =>{
                const quotationHeaderResponse = await axios.get(quotation._links.quotationHeader.href, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem("token")}`,
                    }
                });
                const quotationHeader = quotationHeaderResponse.data;
                return {...quotation, quotationHeader}
            })
            const quotationWithHeader = await Promise.all(quotationWithHeaderPromises);
            // Handle the response data as needed
            setQuotationList(quotationWithHeader);

        } catch (error) {
            console.error('Error fetching quotation list:', error);
        }
    }

    const [selectedQuotationItem, setSelectedQuotationItem] = useState(null); // Initialize selectedQuotationItem state

    //modal
    const [isModalOpenAntd, setIsModalOpenAntd] = useState(false);

    const handleOpenQuote = (quotationItem) => {
        console.log(quotationItem+"Q")
        setSelectedQuotationItem(quotationItem); // Set selected quotation item
        setIsModalOpenAntd(true);
    };

    const handleFinalizeQuotation = (listId, headerId) => {
        console.log("listId: " + listId);
        console.log("headerId:" + headerId);
        confirm({
            title: 'Xác nhận đơn báo giá?',
            okText: 'Xác nhận',
            cancelText: 'Thoát', // Đặt văn bản của nút Cancel thành "Thoát"
            okButtonProps: { className: 'text-green-500' }, // Thiết lập màu chữ của nút Delete thành đỏ
            onOk() {
                finalizeQuotation(listId, headerId)
                    .then((data) => {
                        message.success("Đã chấp nhận đơn báo giá");
                        fetchData();
                        fetchData2();
                    })
                    .catch((error) => {
                        console.error('Lỗi khi xóa tiêu đề báo giá:', error);
                    });
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }


    const finalizeQuotation = async (listId, headerId) => {
        try {
            const response = await axios.put(`http://localhost:8080/quotation/finalize-quotation?quotation-list-id=${listId}&quotation-header-id=${headerId}`);
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error('Error confirm quotation:', error);
            throw error;
        }
    };
    const handleOk = () => {
        setIsModalOpenAntd(false);
    };

    const handleCancel = () => {
        setIsModalOpenAntd(false);
        // fetchData();
        // fetchData2();
        // handleQuotationList();
    };

    return (
        <div>
            <div className='h-auto pl-3'>
                <div className='table-all-posts h-auto mt-[50px]'>
                    <div className={`w-4/5 h-[60px] shadow1 relative top-7 ${isModeShow ? 'bg-[#60B664]' : 'bg-[#348EED]'} text-center text-[24px] flex flex-col justify-center mx-auto rounded-[10px] text-white`}>
                        {isModeShow === false ? (`CÁC ĐƠN ĐANG CHỜ CHẤP NHẬN`) : isModeShow2 === false ? (`CÁC ĐƠN ĐANG TRONG QUÁ TRÌNH XỬ LÝ`) : (`ĐƠN BÁO GIÁ SỐ 1`)}
                        {
                            !isModeShow2 && (
                                <div className='absolute right-[10px] w-[40px] h-[40px] border-2 border-white rounded-[5px] flex flex-col justify-center cursor-pointer' onClick={handleModeShowToggle}>
                                    <Icon classIcon={faRepeat} color={"white"} size={"24px"} />
                                </div>
                            )
                        }
                        {
                            isModeShow2 && (
                                <div
                                    className='absolute right-[10px] w-[40px] h-[40px] border-2 border-white rounded-[5px] flex flex-col justify-center cursor-pointer'
                                    onClick={handleModeShow2Toggle}>
                                    <Icon classIcon={faArrowLeft} color={"white"} size={"24px"} />
                                </div>
                            )
                        }
                    </div>
                    {/* {console.log(selectedQuotationItem+"AHAHAH")} */}
                    {isModeShow === false ? (
                        <>
                            <div className='w-full bg-white shadow1 pt-[50px] px-[50px] rounded-[10px]'>
                                {/** iterate from initialArr*/}
                                <div className='grid grid-cols-10 py-3 gap-2'>
                                    <div className='col-span-1 text-[#348EED]'>ID</div>
                                    <div className='col-span-2 text-[#348EED]'>Họ và tên</div>
                                    <div className='col-span-2 text-[#348EED]'>Email</div>
                                    <div className='col-span-2 text-[#348EED]'>Số điện thoại</div>
                                    <div className='col-span-2 text-[#348EED]'>Ngày báo giá</div>
                                    <div className='col-span-1 text-[#348EED]'></div>
                                </div>
                                {
                                    initialArr.map((item, index) => {
                                            // {console.log(initialArr)}
                                            return (
                                                <div key={index}
                                                     className='grid grid-cols-10 border-t-2 border-[#D9D9D9] py-3 gap-2'>
                                                    <div
                                                        className='col-span-1 text-black flex flex-col justify-center'>{item.customerInfo.userId}</div>
                                                    <div className='col-span-2 text-black flex flex-col justify-center'>
                                                        <span>{item.customerInfo.firstName} {item.customerInfo.lastName}</span>
                                                    </div>
                                                    <div
                                                        className='col-span-2 text-black flex flex-col justify-center'>{item.customerInfo.email}</div>
                                                    <div
                                                        className='col-span-2 text-black flex flex-col justify-center'>{item.customerInfo.phonenumber}</div>
                                                    <div
                                                        className='col-span-2 text-black flex flex-col justify-center'>{item.createDate}</div>

                                                    <div className='col-span-1 text-black flex flex-col justify-center'>
                                                        <div className='flex justify-end gap-2'>
                                                            <Button
                                                                onClick={() => showConfirmDelete(item.quotationHeader.headerId)}
                                                                icon={<Icon classIcon={faTrashCan} color={"black"}
                                                                            size={"20px"}/>}/>
                                                            {/* <Button onClick={() => showConfirmChangeStatusTo2(item.quotationHeader.headerId)} icon={<Icon classIcon={faCheck} color={"black"} size={"20px"} />} /> */}
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    )}

                            </div>
                        </>
                    ) : isModeShow2 === false ? (
                        <>
                            <div className='w-full bg-white shadow1 pt-[50px] px-[50px] rounded-[10px]'>
                                <div className='grid grid-cols-10 py-3 gap-2'>
                                    <div className='col-span-1 text-[#60B664]'>ID</div>
                                    <div className='col-span-2 text-[#60B664]'>Họ và tên</div>
                                    <div className='col-span-2 text-[#60B664]'>Email</div>
                                    <div className='col-span-2 text-[#60B664]'>Số điện thoại</div>
                                    <div className='col-span-2 text-[#60B664]'>Ngày báo giá</div>
                                    <div className='col-span-1 text-[#60B664]'></div>
                                </div>
                                {headerS2.map((item, index) => (

                                    <div className='grid grid-cols-10 border-t-2 border-[#D9D9D9] py-3 gap-2'
                                         key={index}>
                                        {/* {console.log("ok", )} */}
                                        <div
                                            className='col-span-1 text-black flex flex-col justify-center'>{item.customerInfo.userId}</div>
                                        <div className='col-span-2 text-black flex flex-col justify-center'>
                                            <span>{item.customerInfo.firstName} {item.customerInfo.lastName}</span>
                                        </div>
                                        <div
                                            className='col-span-2 text-black flex flex-col justify-center'>{item.customerInfo.email}</div>
                                        <div
                                            className='col-span-2 text-black flex flex-col justify-center'>{item.customerInfo.phonenumber}</div>
                                        <div
                                            className='col-span-2 text-black flex flex-col justify-center'>{item.createDate}</div>

                                        <div className='col-span-1 text-black flex flex-col justify-center'>
                                            <div className='flex justify-end gap-2'>
                                                {/* <Button onClick={() => showConfirmDelete(item.quotationHeader.headerId)} icon={<Icon classIcon={faTrashCan} color={"black"} size={"20px"} />} /> */}
                                                <Button
                                                    onClick={() => handleQuotationList(item.quotationHeader.headerId)}
                                                    icon={<Icon classIcon={faEye} color={"black"}
                                                                size={"20px"}/>}/>
                                                {/*<div onClick={() => handleQuotationList(item.quotationHeader.headerId)}>*/}
                                                {/*    <Icon classIcon={faEye} color={"black"} size={"20px"}/>*/}
                                                {/*</div>*/}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <>


                            <div className='w-full bg-white shadow1 pt-[50px] px-[50px] rounded-[10px]'>
                                <div className='grid grid-cols-10 py-3 gap-2'>
                                    <div className='col-span-1 text-[#348EED]'>ID</div>
                                    <div className='col-span-2 text-[#348EED]'>Ngày Tạo</div>
                                    <div className='col-span-2 text-[#348EED]'>Giá ước tính</div>
                                    <div className='col-span-2 text-[#348EED]'>Giá thực tế</div>
                                    <div className='col-span-2 text-[#348EED]'>Trạng Thái</div>
                                    <div className='col-span-1 text-[#348EED]'></div>
                                </div>

                                {quotationList.map((item, index) => (

                                    <div className='grid grid-cols-10 border-t-2 border-[#D9D9D9] py-3 gap-2' key={index}>
                                        {/* {console.log("hok" + JSON.stringify(item))} */}
                                        <div className='col-span-1 text-black flex flex-col justify-center'>{item.listId}</div>
                                        <div className='col-span-2 text-black flex flex-col justify-center'>{item.createdDate}</div>
                                        <div className='col-span-2 text-black flex flex-col justify-center'>{getValidCurrency(item.estimateTotalPrice)}</div>
                                        <div className='col-span-2 text-black flex flex-col justify-center'>{getValidCurrency(item.realTotalPrice)}</div>
                                        <div className='col-span-2 text-black flex flex-col justify-center'>{item.status.statusName}</div>
                                        {/* Render other fields as needed */}
                                        {/* <div className='col-span-1 text-black flex flex-col justify-center'>Render other fields as needed</div> */}
                                        <div className='col-span-1 text-black flex flex-col justify-center'>
                                            <div className='flex justify-end gap-2'>
                                                {/* <Button onClick={() => showConfirmDeleteList(item.listId)} icon={<Icon classIcon={faTrashCan} color={"black"} size={"20px"} />} /> */}

                                                <Button
                                                    onClick={() => handleOpenQuote(item.listId)}
                                                    icon={<Icon classIcon={faPencil} color={"black"}
                                                                size={"20px"}/>}/>
                                                {/*<div*/}
                                                {/*    onClick={() => handleOpenQuote(  item.listId)}> /!* Pass the selected quotation item *!/*/}
                                                {/*    <Icon classIcon={faPencil} color={"black"} size={"20px"}/>*/}
                                                {/*</div>*/}
                                                <Button
                                                    onClick={() => handleFinalizeQuotation(item.listId, item.quotationHeader.headerId)}
                                                    icon={<Icon classIcon={faCheck} color={"black"}
                                                                size={"20px"}/>}/>
                                                {/*<div onClick={() => handleFinalizeQuotation(item.listId, item.quotationHeader.headerId)}>*/}
                                                {/*    <Icon classIcon={faCheck} color={"black"} size={"20px"}/>*/}
                                                {/*</div>*/}
                                            </div>
                                        </div>
                                    </div>
                                ))}

                            </div>
                        </>
                    )}

                </div>
                <Modal visible={isModalOpenAntd} style={{ minWidth: '1400px', minHeight: '600px' }}  onOk={handleOk} footer={null} onCancel={handleCancel} >
                    {selectedQuotationItem && <QuoteTableConfirm selectedQuotationItem={selectedQuotationItem} />}
                </Modal>
            </div>
        </div>
    )
}

export default ManageQuotationCustomer