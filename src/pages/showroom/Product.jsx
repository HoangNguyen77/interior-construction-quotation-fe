

import React, {useEffect, useRef, useState} from "react";
import Header from "../../layouts/Header.jsx";
import Footer from "../../layouts/Footer.jsx";
import useScrollToTop from "../../utils/ScrollToTop.jsx";
import {Link} from "react-router-dom";
import ProductList from "./components/ProductList.jsx";
function Product(){
    useScrollToTop();
    const sectionRef = useRef(null);

    useEffect(() => {
        sectionRef.current.scrollIntoView({behavior: 'smooth'});

    }, []);

    return(
        <div>

            <Header/>
            <div className="site-blocks-cover overlay" style={{backgroundImage: 'url(images/hero_4.jpg)'}}
                 data-aos="fade"
                 data-stellar-background-ratio="0.5">
                <div className="container">
                    <div className="row align-items-center justify-content-center">
                        <div className="col-md-9 text-center" data-aos="fade">
                            <h1 className="mb-2">Showroom</h1>
                        </div>
                    </div>
                </div>
            </div>
            <div ref={sectionRef}></div>
            <ProductList/>
            <Footer/>
        </div>
    )

}

export default Product