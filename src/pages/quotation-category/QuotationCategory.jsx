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
                            <h1 className="mb-4">Thi Công Nội Thất </h1>
                        </div>
                    </div>
                </div>
            </div>


            <div className="site-section bg-light">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 mx-auto text-center mb-5 section-heading">
                            <h2 className="mb-xl-0">Dịch vụ thi công nội thất trọn gói </h2>

                        </div>
                    </div>

                    <div className="row">
                        <div className=" col-md-6 mx-auto text-center">
                            <h5 className="mb-5">Các loại thi công nội thất </h5>

                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-6 col-md-4 col-lg-3">
                            <div className="hotel-room text-center">
                                <a href="#" className="d-block mb-0 thumbnail"><img src="/images/chungcuduan.jpg" alt="Image"
                                                                                    className="img-fluid"/></a>
                                <div className="hotel-room-body">
                                    <h5 className="heading"><a href="#" style={{fontSize: "15px"}}>Nội thất chung cư</a>
                                    </h5>
                                    {/* <strong className="price">$350.00 / per night</strong>*/}
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-4 col-lg-3">
                            <div className="hotel-room text-center">
                                <a href="#" className="d-block mb-0 thumbnail"><img src="/images/nhapphoduan.jpg" alt="Image"
                                                                                    className="img-fluid"/></a>
                                <div className="hotel-room-body">
                                    <h5 className="heading mb-0"><a href="#" style={{fontSize: "15px"}}>Nội thất nhà
                                        phố</a></h5>
                                    {/*  <strong className="price">$400.00 / per night</strong>*/}
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-4 col-lg-3">
                            <div className="hotel-room text-center">
                                <a href="#" className="d-block mb-0 thumbnail"><img src="/images/biethuduan.jpg" alt="Image"
                                                                                    className="img-fluid"/></a>
                                <div className="hotel-room-body">
                                    <h5 className="heading mb-0"><a href="#" style={{fontSize: "15px"}}>Nội thất biệt
                                        thự</a></h5>
                                    {/*        <strong className="price">$255.00 / per night</strong>*/}
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-6 col-md-4 col-lg-3">
                            <div className="hotel-room text-center">
                                <a href="#" className="d-block mb-0 thumbnail"><img src="/images/vanphongduan.jpg" alt="Image"
                                                                                    className="img-fluid"/></a>
                                <div className="hotel-room-body">
                                    <h4 className="heading mb-0"><a href="#" style={{fontSize: "15px"}}>Nội thất văn
                                        phòng</a></h4>
                                    {/*  <strong className="price">$150.00 / per night</strong>*/}
                                </div>
                            </div>
                        </div>
                        {/*  <div className="col-md-6 col-lg-4 mb-5">
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
                        </div>*/}
                    </div>

                    {/*<div className="row mt-5">
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
                    </div>*/}

                </div>
                <div className="site-section bg-light">
                    <div className="">
                        <div className="row">
                            <div className=" mx-auto text-center mb-5 section-heading">
                                <h2 className="mb-xl-0">Dự án hoàn thiện nội thất tiêu biểu</h2>

                            </div>
                        </div>


                        <div className="row">
                            <div className="col-sm-6 col-md-4 col-lg-4">
                                <div className="hotel-room text-center">
                                    <a href="#" className="d-block mb-0 thumbnail"><img src="/images/nhapho1.jpg"
                                                                                        alt="Image"
                                                                                        className="img-fluid"/></a>
                                    <div className="hotel-room-body text-left" style={{marginTop: "-30px"}}>
                                        <h6 className="heading mb-0"><a href="#" style={{fontSize: "15px"}}>Nhà phố đường Nguyễn Tri Phương, quận 10- 2 lầu - 42m2
                                            cư</a></h6>


                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6 col-md-4 col-lg-4">
                                <div className="hotel-room text-center">
                                    <a href="#" className="d-block mb-0 thumbnail"><img src="/images/nhapho2.jpg"
                                                                                        alt="Image"
                                                                                        className="img-fluid"/></a>
                                    <div className="hotel-room-body text-left" style={{marginTop: "-30px"}}>
                                        <h6 className="heading mb-0"><a href="#" style={{fontSize: "15px"}}>Nhà phố đường Tú Sương, Quận 3 - 3 lầu - 50m2
                                            cư</a></h6>


                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6 col-md-4 col-lg-4">
                                <div className="hotel-room text-center">
                                    <a href="#" className="d-block mb-0 thumbnail"><img src="/images/bietthu1.jpg"
                                                                                        alt="Image"
                                                                                        className="img-fluid"/></a>
                                    <div className="hotel-room-body text-center" style={{marginTop: "-10px"}}>
                                        <h6 className="heading mb-0"><a href="#" style={{fontSize: "15px"}}>Nội thất
                                            biệt thự của anh Quang Quận 1 - 2 lầu - 250m2</a></h6>


                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6 col-md-4 col-lg-4">
                                <div className="hotel-room text-center">
                                    <a href="#" className="d-block mb-0 thumbnail"><img src="/images/bietthu2.jpg"
                                                                                        alt="Image"
                                                                                        className="img-fluid"/></a>
                                    <div className="hotel-room-body text-center" style={{marginTop: "-10px"}}>
                                     <h6 className="heading mb-0">   <a href="#" style={{fontSize: "15px"}}>nội thất biệt thự Phú Gia - 280m2 - 2 lầu </a></h6>


                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6 col-md-4 col-lg-4">
                                <div className="hotel-room text-center">
                                    <a href="#" className="d-block mb-0 thumbnail"><img src="/images/vanphong1.jpg"
                                                                                        alt="Image"
                                                                                        className="img-fluid"/></a>
                                    <div className="hotel-room-body text-center" style={{marginTop: "-10px"}}>
                                        <h6 className="heading mb-0"><a href="#" style={{fontSize: "15px"}}><p>Văn phòng công ty Hoàng Phú
                                           - 25m2 - 1 phòng
                                            cư</p></a></h6>


                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6 col-md-4 col-lg-4">
                                <div className="hotel-room text-center">
                                    <a href="#" className="d-block mb-0 thumbnail"><img src="/images/vanphong2.jpg"
                                                                                        alt="Image"
                                                                                        className="img-fluid"/></a>
                                    <div className="hotel-room-body text-center" style={{marginTop: "-10px"}}>
                                        <h6 className="heading mb-0"><a href="#" style={{fontSize: "15px"}}>Văn phòng SCHANNEL- 27m2- 5 phòng
                                            cư</a></h6>


                                    </div>

                                </div>
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