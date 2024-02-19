import React from "react";
import Header from "../../layouts/Header.jsx";
import Footer from "../../layouts/Footer.jsx";
import useScrollToTop from "../../utils/ScrollToTop.jsx";
function QuotationCategory(){
    useScrollToTop()
    return(
        <div>
            <Header/>
            <div className="site-blocks-cover overlay" style={{backgroundImage: 'url(images/hero_1.jpg)'}} data-aos="fade"
                 data-stellar-background-ratio="0.5">
                <div className="container">
                    <div className="row align-items-center justify-content-center">
                        <div className="col-md-7 text-center" data-aos="fade">
                            <span className="caption mb-3">VivaDecor</span>
                            <h1 className="mb-4">Interior Construction</h1>
                        </div>
                    </div>
                </div>
            </div>


            <div className="site-section bg-light">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 mx-auto text-center mb-5 section-heading">
                            <h2 className="mb-5">Our Rooms</h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 col-lg-4 mb-5">
                            <div className="hotel-room text-center">
                                <a href="#" className="d-block mb-0 thumbnail"><img src="/images/img_1.jpg" alt="Image"
                                                                                    className="img-fluid"/></a>
                                <div className="hotel-room-body">
                                    <h3 className="heading mb-0"><a href="#">Standard Room</a></h3>
                                    <strong className="price">$350.00 / per night</strong>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4 mb-5">
                            <div className="hotel-room text-center">
                                <a href="#" className="d-block mb-0 thumbnail"><img src="/images/img_2.jpg" alt="Image"
                                                                                    className="img-fluid"/></a>
                                <div className="hotel-room-body">
                                    <h3 className="heading mb-0"><a href="#">Family Room</a></h3>
                                    <strong className="price">$400.00 / per night</strong>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4 mb-5">
                            <div className="hotel-room text-center">
                                <a href="#" className="d-block mb-0 thumbnail"><img src="/images/img_3.jpg" alt="Image"
                                                                                    className="img-fluid"/></a>
                                <div className="hotel-room-body">
                                    <h3 className="heading mb-0"><a href="#">Single Room</a></h3>
                                    <strong className="price">$255.00 / per night</strong>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6 col-lg-4 mb-5">
                            <div className="hotel-room text-center">
                                <a href="#" className="d-block mb-0 thumbnail"><img src="/images/img_1.jpg" alt="Image"
                                                                                    className="img-fluid"/></a>
                                <div className="hotel-room-body">
                                    <h3 className="heading mb-0"><a href="#">Deluxe Room</a></h3>
                                    <strong className="price">$150.00 / per night</strong>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4 mb-5">
                            <div className="hotel-room text-center">
                                <a href="#" className="d-block mb-0 thumbnail"><img src="/images/img_2.jpg" alt="Image"
                                                                                    className="img-fluid"/></a>
                                <div className="hotel-room-body">
                                    <h3 className="heading mb-0"><a href="#">Luxury Room</a></h3>
                                    <strong className="price">$200.00 / per night</strong>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4 mb-5">
                            <div className="hotel-room text-center">
                                <a href="#" className="d-block mb-0 thumbnail"><img src="/images/img_3.jpg" alt="Image"
                                                                                    className="img-fluid"/></a>
                                <div className="hotel-room-body">
                                    <h3 className="heading mb-0"><a href="#">Single Room</a></h3>
                                    <strong className="price">$155.00 / per night</strong>
                                </div>
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

export default QuotationCategory