import React from "react";
import Header from "../../layouts/Header.jsx";
import Footer from "../../layouts/Footer.jsx";
import useScrollToTop from "../../utils/ScrollToTop.jsx";
import {Link} from "react-router-dom";
function FinishedProject(){
    useScrollToTop()
    return(
        <div>
            <Header/>
            <div className="site-blocks-cover overlay" style={{backgroundImage: "url(images/hero_1.jpg)"}} data-aos="fade"
                 data-stellar-background-ratio="0.5">
                <div className="container">
                    <div className="row align-items-center justify-content-center">
                        <div className="col-md-7 text-center" data-aos="fade">
                            <span className="caption mb-3">VivaDecor</span>
                            <h1 className="mb-4">Our Project</h1>
                        </div>
                    </div>
                </div>
            </div>


            <div className="site-section">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 col-lg-8 mb-5">
                            <div className="media-with-text">
                                <div className="img-border-sm mb-4">
                                    <a href="DetailFinishedProject.jsx" className="popup-vimeo image-play">
                                        <img src="/images/img_1.jpg" alt="" className="img-fluid"/>
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6 col-lg-4 mb-5">
                            <div className="media-with-text">
                                <h2 className="heading mb-0">Lorem Ipsum Dolor Sit Amet</h2>
                                <span className="mb-3 d-block post-date">created_date</span>
                                <Link to="/login" >Đăng
                                    nhập</Link>
                            </div>
                        </div>

                    </div>

                    <div className="row mt-5">
                        <div className="col-md-12 text-center">
                            <div className="site-block-27">
                                <ul>
                                    <li><a href="#">&lt;</a></li>
                                    <li className="active"><span>1</span></li>
                                    <li><a href="#">2</a></li>
                                    <li><a href="#">3</a></li>
                                    <li><a href="#">4</a></li>
                                    <li><a href="#">5</a></li>
                                    <li><a href="#">&gt;</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                </div>
            </div>



            <Footer/>
        </div>
    )
}
export default FinishedProject