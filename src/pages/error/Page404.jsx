import React, {useEffect, useState} from "react";
import Header from "../../layouts/Header.jsx";
import Footer from "../../layouts/Footer.jsx";
import useScrollToTop from "../../utils/ScrollToTop.jsx";

function Page404() {
    useScrollToTop()
    return (
        <div>
            <Header/>
            <div className="site-blocks-cover overlay" style={{backgroundImage: 'url(/images/hero_4.jpg)'}}
                 data-aos="fade"
                 data-stellar-background-ratio="0.5">
                <div className="container">
                    <div className="row align-items-center justify-content-center">
                        <div className="col-md-12 text-center" data-aos="fade">
                            <h1 className="mb-2">404</h1>
                            <h2 className="caption">Không tìm thấy trang</h2>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
    }
    export default Page404;