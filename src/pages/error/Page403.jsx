import React, {useEffect, useRef, useState} from "react";
import {Link, useParams} from "react-router-dom";
import useScrollToTop from "../../utils/ScrollToTop.jsx";
import Header from "../../layouts/Header.jsx";
import Footer from "../../layouts/Footer.jsx";


function Page403(){
    useScrollToTop()
    const sectionRef = useRef(null);
    useEffect(()=>{
        sectionRef.current.scrollIntoView({behavior: 'smooth'});
    }, []);

    return (
        <div>
            <Header/>
            <div className="site-blocks-cover overlay" style={{backgroundImage: 'url(/images/hero_1.jpg)'}}
                 data-aos="fade"
                 data-stellar-background-ratio="0.5">
                <div className="container">
                    <div className="row align-items-center justify-content-center">
                        <div className="col-md-9 text-center" data-aos="fade">
                            <h1 className="mb-2">Welcome To VivaDecor</h1>
                            <h2 className="caption">Interior Construction Quotation</h2>
                        </div>
                    </div>
                </div>
            </div>
            <div className="site-section bg-light" style={{paddingBottom:'200px'}} ref={sectionRef}>
                <div className="container text-center">
                    <div className="h1" style={{fontSize:'5em', color: '#818080' }}>403</div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Page403