import React, {useEffect, useRef, useState} from 'react';
import ManageQuotation from "./ManageQuotation.jsx";
// import RequireAdmin from "./RequireAdmin.jsx";
import {toast} from "react-toastify";
import FinishedQuotationCustomer from "./FinishQuotation.jsx";
import Profile from "./Profile.jsx";
import Header from "../../layouts/Header.jsx";
import Footer from "../../layouts/Footer.jsx";
import {useLocation} from "react-router-dom";

const MainCustomer = () => {
    const [selectedTab, setSelectedTab] = useState(0);
    const sectionRef = useRef(null);
    useEffect(() => {
            sectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }, []);
    const handleTabClick = (index) => {
        setSelectedTab(index);
    };

    const tabMenu = [
        'Thông tin của bạn',
        'Quản lý báo giá',
        'Báo giá đã hoàn thành',
        'Báo giá đã bị hủy',
    ];


    return (
        <div>
            <Header/>
            <div className="site-blocks-cover overlay" style={{backgroundImage: "url(images/hero_5.jpg)"}}
                 data-aos="fade"
                 data-stellar-background-ratio="0.5">
                <div className="container">
                    <div className="row align-items-center justify-content-center">
                        <div className="col-md-7 text-center" data-aos="fade">
                            <span className="caption mb-3">VivaDecor</span>
                            <h1 className="mb-4">Thông tin của bạn</h1>
                        </div>
                    </div>
                </div>
            </div>
            <div  className='mb-5' ref={sectionRef}></div>
        <div className=' grid grid-cols-7 p-3'>
            <div
                className='bg-menu col-span-1 h-[75vh] w-full bg-[#202022] rounded-[0.75rem] text-white p-3 flex flex-col justify-between'>
                <div>
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
            </div>
            <div className='col-span-6 ' >
                {selectedTab === 0 ? (
                    <Profile/>
                ) : selectedTab === 1 ? (
                    <ManageQuotation/>
                ) : ( selectedTab === 2 ? (
                    <FinishedQuotationCustomer/>
                        ) :
                    ""
                )}

            </div>
        </div>
            <Footer/>
        </div>
    );
};
export default MainCustomer;