import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faSearch,
    faPlus,
    faTrashCan,
    faPencil,
    faUser,
    faRepeat,
    faArrowLeft,
    faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { Button, Modal, message } from 'antd';
import QuoteTableConfirm from './QuoteTableConfirm';
import axios from 'axios';
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

const ManageQuotation = () => {
    const [isModeShow, setModeShow] = useState(false);
    const [isModeShow2, setModeShow2] = useState(false)
    const [initialArr, setInitialArr] = useState([])
    const [headerS2, setHeaderS2] = useState([])
    const [quotationList, setQuotationList] = useState([]);
    const [totalQuotation1, setTotalQuotation1] = useState(0);
    const [totalQuotation2, setTotalQuotation2] = useState(0);

    const getWarningByDate = (date, isCreateDay) => {
        const currentDate = new Date();
        const targetDate = new Date(date);

        // Tính số mili giây giữa ngày hiện tại và ngày đích
        const differenceInTime = currentDate.getTime() - targetDate.getTime();

        // Tính số ngày chênh lệch
        let differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));

        let textColor = "";

        if(differenceInDays >= 7 && !isCreateDay) {
            textColor = 'red'
        }else if ( differenceInDays >= 3 && !isCreateDay) {
            textColor = '#FFD700'
        }else if (differenceInDays >= 2 && isCreateDay) {
            textColor = 'red'; // Màu đỏ nếu lớn hơn hoặc bằng 2 ngày
        } else if (differenceInDays >= 1 && isCreateDay) {
            textColor = '#FFD700'; // Màu vàng nếu lớn hơn hoặc bằng 1 ngày
        } else {
            textColor = 'green'; // Màu xanh lá cây mặc định nếu ít hơn 1 ngày
        }

        return (
            <div style={{color: textColor}}>
                {isCreateDay ? date : `${differenceInDays} ngày`}
            </div>
        );
    };





    const fetchData = async () => {
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
                    console.log(listStatus)
                    // Check if status is 1
                    if (listStatus === 1) {
                        const listID = listData[0].listId;
                        const listCreateDate = listData[0].createdDate;
                        return {
                            quotationHeader,
                            customerInfo,
                            listCreateDate,
                            listID
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
            setTotalQuotation1(filteredQuotationData.length);
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
                        const listReceiptDate = listData[0].createdDate;

                        return {
                            quotationHeader,
                            customerInfo,
                            listReceiptDate,
                            listID
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
            setTotalQuotation2(filteredQuotationData.length);
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
    const deleteQuotationHeaderList = async (id) => {
        try {
            const response = await axios.post(`http://localhost:8080/quotation/delete-quotation-list?id=${id}`);
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error('Error deleting quotation header:', error);
            throw error;
        }
    };
    const approveQuotationHeader = async (id) => {
        try {
            const response = await axios.put(`http://localhost:8080/quotation/approve-quotation?id=${id}`);
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error('Error deleting quotation header:', error);
            throw error;
        }
    };
    const showConfirmDelete = (headerId) => {
        confirm({
            title: 'Do you want to delete this item?',
            icon: <FontAwesomeIcon icon={faTrashCan} style={{ color: "black", fontSize: "20px", cursor: "pointer" }} />,
            onOk() {
                deleteQuotationHeader(headerId)
                    .then((data) => {
                        // Show notification for successful deletion
                        message.success("ok");
                        // Update the data displayed on the page after deletion
                        fetchData();
                        fetchData2();
                    })
                    .catch((error) => {
                        console.error('Error deleting quotation header:', error);
                        // Show notification for error

                    });
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };
    const showConfirmDeleteList = (headerId) => {
        confirm({
            title: 'Do you want to delete this item?',
            icon: <FontAwesomeIcon icon={faTrashCan} style={{ color: "black", fontSize: "20px", cursor: "pointer" }} />,
            onOk() {
                deleteQuotationHeaderList(headerId)
                    .then((data) => {
                        // Show notification for successful deletion
                        message.success("ok");
                        // Update the data displayed on the page after deletion
                        fetchData();
                        fetchData2();
                    })
                    .catch((error) => {
                        console.error('Error deleting quotation header:', error);
                        // Show notification for error

                    });
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };


    const showConfirmChangeStatusTo2 = (headerId) => {
        confirm({
            title: 'Bạn có muốn chuyển trạng thái đơn hàng này thành "Đang xử lý"?',
            onOk() {
                approveQuotationHeader(headerId)
                    .then((data) => {
                        // Show notification for successful deletion
                        message.success("ok");
                        // Update the data displayed on the page after deletion
                        fetchData();
                        fetchData2();
                    })
                    .catch((error) => {
                        console.error('Error deleting quotation header:', error);
                        // Show notification for error

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
            const quotaionWithStatus = await Promise.all(quotaionWithStatusPromises);
            // Handle the response data as needed
            setQuotationList(quotaionWithStatus);

        } catch (error) {
            console.error('Error fetching quotation list:', error);
        }
    }

    const [selectedQuotationItem, setSelectedQuotationItem] = useState(null); // Initialize selectedQuotationItem state

    //modal
    const [isModalOpenAntd, setIsModalOpenAntd] = useState(false);

    const handleOpenQuote = (quotationItem) => {
        setSelectedQuotationItem(quotationItem); // Set selected quotation item
        setIsModalOpenAntd(true);
    };

    const handleOk = () => {
        setIsModalOpenAntd(false);
    };

    const handleCancel = () => {
        setIsModalOpenAntd(false);
        fetchData();
        fetchData2();
        handleQuotationList();
    };

    return (
        <div className='h-auto pl-3'>
            <div className='w-full h-[150px] relative'>
                <div className='title-admin absolute top-0 left-0'>QUẢN LÝ BÁO GIÁ</div>
                <div className='absolute bottom-0 left-0'>
                    <input
                        className='bg-[#EAEDF2] border-2 border-[#858585] rounded-[5px] w-[400px] h-[40px] px-2'
                        placeholder='Nhập tên, email, số điện thoại...'
                    />
                </div>
                <div className='absolute bottom-1 left-[365px]'><Icon classIcon={faSearch} color={"black"} size={"24px"} /></div>
                <div className='absolute z-10 top-0 right-[190px] w-[80px] h-[80px] bg-[#60B664] text-[24px] font-bold text-white text-center flex flex-col justify-center rounded-[10px] shadow1'>
                    <Icon classIcon={faUser} color={"white"} size={"32px"} />
                </div>
                <div className='absolute top-[40px] right-0 w-[300px] h-[110px] rounded-[5px] bg-white shadow1 flex flex-col justify-center text-right px-[30px]'>
                    <div>
                        <div className='text-[24px] text-black'>{totalQuotation2}</div>
                        <div className='text-[24px] text-black'>Các đơn đang trong quá trình xử lý</div>
                    </div>
                </div>

                <div className='absolute z-10 top-0 right-[540px] w-[80px] h-[80px] bg-[#348EED] text-[24px] font-bold text-white text-center flex flex-col justify-center rounded-[10px] shadow1'>
                    <Icon classIcon={faUser} color={"white"} size={"32px"} />
                </div>
                <div className='absolute top-[40px] right-[350px] w-[300px] h-[110px] rounded-[5px] bg-white shadow1 flex flex-col justify-center text-right px-[30px]'>
                    <div>
                        <div className='text-[24px] text-black'>{totalQuotation1}</div>
                        <div className='text-[24px] text-black'>Các đơn đang chờ chấp nhận</div>
                    </div>
                </div>
            </div>


            <div className='table-all-posts h-auto mt-[50px]'>
                <div className={`w-4/5 h-[60px] shadow1 relative top-7 ${isModeShow ? 'bg-[#60B664]' : 'bg-[#348EED]'} text-center text-[24px] flex flex-col justify-center mx-auto rounded-[10px] text-white`}>
                    {isModeShow === false ? (`CÁC ĐƠN ĐANG CHỜ CHẤP NHẬN`) : isModeShow2 === false ? (`CÁC ĐƠN ĐANG TRONG QUÁ TRÌNH XỬ LÝ`) : (`CÁC LẦN BÁO GIÁ`)}
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

                {isModeShow === false ? (
                    <>
                        <div className='w-full bg-white shadow1 pt-[50px] px-[50px] rounded-[10px]'>
                            {/** iterate from initialArr*/}
                            <div className='grid grid-cols-10 py-3 gap-2'>
                                <div className='col-span-1 text-[#348EED]'>ID</div>
                                <div className='col-span-2 text-[#348EED]'>Họ và tên khách hàng</div>
                                <div className='col-span-2 text-[#348EED]'>Email</div>
                                <div className='col-span-1 text-[#348EED]'>Số điện thoại</div>
                                <div className='col-span-3 text-[#348EED]'>Ngày báo giá</div>
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
                                                    className='col-span-1 text-black flex flex-col justify-center'>{item.customerInfo.phonenumber}</div>
                                                <div
                                                    className='col-span-3 text-black flex flex-col justify-center'>{getWarningByDate(item.listCreateDate,true)}
                                                </div>

                                                <div className='col-span-1 text-black flex flex-col justify-center'>
                                                    {console.log("lisy " + JSON.stringify(item.listID))}
                                                    <div className='flex justify-end gap-2'>
                                                        <Button
                                                            onClick={() => showConfirmDelete(item.quotationHeader.headerId)}
                                                            icon={<Icon classIcon={faTrashCan} color={"black"}
                                                                        size={"20px"}/>}/>
                                                        <Button onClick={() => showConfirmChangeStatusTo2(item.listID)}
                                                                icon={<Icon classIcon={faCheck} color={"black"}
                                                                            size={"20px"}/>}/>
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
                                <div className='col-span-1 text-[#60B664]'>Số điện thoại</div>
                                <div className='col-span-3 text-[#60B664]'>Ngày nhận báo giá</div>
                                <div className='col-span-1 text-[#60B664]'></div>
                            </div>
                            {headerS2.map((item, index) => (

                                <div className='grid grid-cols-10 border-t-2 border-[#D9D9D9] py-3 gap-2' key={index}>
                                    {/* {console.log("ok", )} */}
                                    <div
                                        className='col-span-1 text-black flex flex-col justify-center'>{item.customerInfo.userId}</div>
                                    <div className='col-span-2 text-black flex flex-col justify-center'>
                                        <span>{item.customerInfo.firstName} {item.customerInfo.lastName}</span></div>
                                    <div
                                        className='col-span-2 text-black flex flex-col justify-center'>{item.customerInfo.email}</div>
                                    <div
                                        className='col-span-1 text-black flex flex-col justify-center'>{item.customerInfo.phonenumber}</div>
                                    <div
                                        className='col-span-3 text-black flex flex-col justify-center'>{getWarningByDate(item.listReceiptDate, false)}
                                    </div>
                                    <div className='col-span-1 text-black flex flex-col justify-center'>
                                        <div className='flex justify-end gap-2'>
                                            <Button onClick={() => showConfirmDelete(item.quotationHeader.headerId)}
                                                    icon={<Icon classIcon={faTrashCan} color={"black"}
                                                                size={"20px"}/>}/>
                                            <div onClick={() => handleQuotationList(item.quotationHeader.headerId)}>
                                                <Icon classIcon={faPencil} color={"black"} size={"20px"}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <>


                        {console.log(selectedQuotationItem)}
                        <div className='w-full bg-white shadow1 pt-[50px] px-[50px] rounded-[10px]'>
                            <div className='grid grid-cols-10 py-3 gap-2'>
                                <div className='col-span-1 text-[#348EED]'>ID</div>
                                <div className='col-span-2 text-[#348EED]'>Ngày Tạo</div>
                                <div className='col-span-2 text-[#348EED]'>Giá ước tính</div>
                                <div className='col-span-1 text-[#348EED]'>Giá thực tế</div>
                                <div className='col-span-1 text-[#348EED]'>Trạng Thái</div>
                                <div className='col-span-3 text-[#348EED]'>Hành động</div>
                            </div>

                            {quotationList.map((item, index) => (

                                <div className='grid grid-cols-10 border-t-2 border-[#D9D9D9] py-3 gap-2' key={index}>
                                    {/* {console.log("hok" + JSON.stringify(item))} */}
                                    <div className='col-span-1 text-black flex flex-col justify-center'>{item.listId}</div>
                                    <div className='col-span-2 text-black flex flex-col justify-center'>{item.createdDate}</div>
                                    <div className='col-span-2 text-black flex flex-col justify-center'>{getValidCurrency(item.estimateTotalPrice)}</div>
                                    <div className='col-span-1 text-black flex flex-col justify-center'>{getValidCurrency(item.realTotalPrice)}</div>
                                    <div className='col-span-1 text-black flex flex-col justify-center'>{item.status.statusName}</div>
                                    {/* Render other fields as needed */}
                                    {/* <div className='col-span-1 text-black flex flex-col justify-center'>Render other fields as needed</div> */}
                                    <div className='col-span-1 text-black flex flex-col justify-center'>
                                        <div className='flex justify-end gap-2' >
                                            <Button onClick={() => showConfirmDeleteList(item.listId)} icon={<Icon classIcon={faTrashCan} color={"black"} size={"20px"} />} />

                                            <div onClick={() => handleOpenQuote(item.listId)}> {/* Pass the selected quotation item */}
                                                <Icon classIcon={faPencil} color={"black"} size={"20px"} />
                                            </div>

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
    )
}

export default ManageQuotation