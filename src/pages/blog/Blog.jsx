import React, {useEffect, useRef, useState} from "react";
import Header from "../../layouts/Header.jsx";
import Footer from "../../layouts/Footer.jsx";
import useScrollToTop from "../../utils/ScrollToTop.jsx";
import {Link} from "react-router-dom";
import BlogList from "./components/BlogList.jsx";
function Blog(){
    useScrollToTop();
    const sectionRef = useRef(null);

    useEffect(() => {
        sectionRef.current.scrollIntoView({behavior: 'auto'});

    }, []);

    return(
        <div>
            <Header/>
            <div className="site-blocks-cover overlay" style={{backgroundImage: "url(/images/hero_6.jpg)"}}
                 data-aos="fade"
                 data-stellar-background-ratio="0.5">

                <div className="container">
                    <div className="row align-items-center justify-content-center">
                        <div className="col-md-7 text-center" data-aos="fade">
                            <span className="caption mb-3">VivaDecor</span>
                            <h1 className="mb-4">Bài Viết</h1>
                        </div>
                    </div>
                </div>
            </div>
            <div ref={sectionRef}></div>
            <BlogList />

            <Footer/>
        </div>
    )

}

export default Blog