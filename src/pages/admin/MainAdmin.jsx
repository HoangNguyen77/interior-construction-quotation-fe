import React, {useEffect, useRef, useState} from 'react';
import ManageBlog from './ManageBlog';
import ManageUser from './ManageUser';
import TypeRoom from './ManageShowroom/Typeroom&Product';
import Description from './ManageShowroom/Description';
import ManageFinished from './ManageFinished';
import ManageQuotation from "./ManageQuotation.jsx";
// import RequireAdmin from "./RequireAdmin.jsx";
import {toast} from "react-toastify";
import {
    getIdUserByToken, isToken, isTokenExpired,
} from "../../utils/JwtService.js";
import {Link, useNavigate} from "react-router-dom";
import CancelQuotationAdmin from "./CancelQuotation.jsx";
import AdminChart from "./AdminChart.jsx";

const MainAdmin = () => {
    const [selectedTab, setSelectedTab] = useState(0);
    const navigation = useNavigate();

    const handleTabClick = (index) => {
        setSelectedTab(index);
    };

    const userId = parseInt(getIdUserByToken());
    const [user, setUser] = useState({
        firstName: "",
        lastName: ""
    })

    useEffect(() => {
        if (!isToken() || !isTokenExpired(localStorage.getItem('token'))) navigation("/403");

        const url = `http://localhost:8080/users/${userId}`;

        async function fetchData() {
            const response = await fetch(url);
            return response.json();
        }

        fetchData().then(data => {
            setUser({
                firstName: data.firstName,
                lastName: data.lastName
            })
        })

    }, []);

    const tabMenu = [
        'Thống kê',
        'Loại phòng và sản phẩm',
        'Mô tả sản phẩm',
        'Quản lý người dùng',
        'Dự án đã thi công',
        'Quản lý Blog',
        'Quản lý báo giá',
        'Báo giá đã bị hủy',
    ];


    return (
        <div className=' grid grid-cols-7 p-3'>
            <div
                className='bg-menu col-span-1 h-[96vh] w-full bg-[#202022] rounded-[0.75rem] text-white p-3 flex flex-col justify-between'>
                <div>
                    <div className='tag-name'>
                        <div className='pb-2 text-[14px]'>Tài khoản</div>
                        <div
                            className='name-user text-[24px] border-b-[0.5px] pb-2 border-[#5a5a5a]'>{user.firstName} {user.lastName}</div>
                    </div>


                    <div className='tab-menu mt-3'>
                        {tabMenu.map((tab, index) => (
                            <div
                                key={index}
                                className={`${index === selectedTab ? 'bg-[#348EED] pl-4' : ''}`}
                                onClick={() => {
                                    handleTabClick(index);
                                    toast.dismiss();
                                }
                                }
                            >
                                {tab}
                            </div>
                        ))}
                    </div>
                </div>


                <div className="flex justify-center mt-8">
                    <Link to="/home"
                          className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300">
                        Home Page
                    </Link>
                </div>


            </div>
            <div className='col-span-6 '>
                {selectedTab === 0 ? (
                    <AdminChart/>
                ) : selectedTab === 1 ? (
                    <TypeRoom/>
                ) : selectedTab === 2 ? (
                    <Description/>
                ) : selectedTab === 3 ? (
                    <ManageUser/>
                ) : selectedTab === 4 ? (
                    <ManageFinished/>
                ) : selectedTab === 5 ? (
                    <ManageBlog/>
                ) : selectedTab === 6 ? (
                    <ManageQuotation/>
                ) : selectedTab === 7 ? (
                    <CancelQuotationAdmin/>
                ) : (
                    ""
                )}
            </div>
        </div>
    );
};
export default MainAdmin;