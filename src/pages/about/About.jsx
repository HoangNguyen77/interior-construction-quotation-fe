import React from "react";
import Header from "../../layouts/Header.jsx";
import Footer from "../../layouts/Footer.jsx";
import useScrollToTop from "../../utils/ScrollToTop.jsx";

function About(){
    useScrollToTop()
    return(
        <div>
            <Header/>
            <div className="site-blocks-cover overlay" style={{backgroundImage: "url(images/hero_1.jpg)"}}
                 data-aos="fade"
                 data-stellar-background-ratio="0.5">
                <div className="container">
                    <div className="row align-items-center justify-content-center">
                        <div className="col-md-7 text-center" data-aos="fade">
                            <span className="caption mb-3">VivaDecor</span>
                            <h1 className="mb-4">About Us</h1>
                        </div>
                    </div>
                </div>
            </div>


            <div className="site-section">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-6 mb-5 mb-md-0">

                            <div className="img-border">
                                <a href="https://vimeo.com/28959265" className="popup-vimeo image-play">
                  <span className="icon-wrap">
                    <span className="icon icon-play"></span>
                  </span>
                                    <img src="/images/img_2.jpg" alt="" className="img-fluid"/>
                                </a>
                            </div>

                            <img src="/images/img_1.jpg" alt="Image" className="img-fluid image-absolute"/>

                        </div>
                        <div className="col-md-5 ml-auto">


                            <div className="section-heading text-left">
                                <h2 className="mb-5">About Us</h2>
                            </div>
                            <p className="mb-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque, nisi
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit nobis magni eaque velit
                                eum, id rem eveniet dolor possimus voluptas..</p>
                            <p><a href="https://vimeo.com/28959265" className="popup-vimeo text-uppercase">Watch
                                Video <span className="icon-arrow-right small"></span></a></p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="site-section bg-light">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 mx-auto text-center mb-5 section-heading">
                            <h2 className="mb-5">Hotel Staffs</h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 col-lg-4 mb-5">
                            <div className="hotel-room text-center">
                                <a href="#" className="d-block mb-4 thumbnail"><img src="/images/person_1.jpg"
                                                                                    alt="Image" className="img-fluid"/></a>
                                <div className="p-4">
                                    <h3 className="heading mb-3"><a href="#">Angella Lopez</a></h3>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta labore recusandae
                                        soluta quis.</p>
                                    <p><a href="#" className="text-primary">Read More <span
                                        className="icon-arrow-right small"></span></a></p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4 mb-5">
                            <div className="hotel-room text-center">
                                <a href="#" className="d-block mb-4 thumbnail"><img src="/images/person_2.jpg"
                                                                                    alt="Image" className="img-fluid"/></a>
                                <div className="p-4">
                                    <h3 className="heading mb-3"><a href="#">Marina Stalks</a></h3>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta labore recusandae
                                        soluta quis.</p>
                                    <p><a href="#" className="text-primary">Read More <span
                                        className="icon-arrow-right small"></span></a></p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4 mb-5">
                            <div className="hotel-room text-center">
                                <a href="#" className="d-block mb-4 thumbnail"><img src="/images/person_3.jpg"
                                                                                    alt="Image" className="img-fluid"/></a>
                                <div className="p-4">
                                    <h3 className="heading mb-3"><a href="#">Ethan Hoover</a></h3>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta labore recusandae
                                        soluta quis.</p>
                                    <p><a href="#" className="text-primary">Read More <span
                                        className="icon-arrow-right small"></span></a></p>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6 col-lg-4 mb-5">
                            <div className="hotel-room text-center">
                                <a href="#" className="d-block mb-4 thumbnail"><img src="/images/person_4.jpg"
                                                                                    alt="Image" className="img-fluid"/></a>
                                <div className="p-4">
                                    <h3 className="heading mb-3"><a href="#">Megan Pearson</a></h3>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta labore recusandae
                                        soluta quis.</p>
                                    <p><a href="#" className="text-primary">Read More <span
                                        className="icon-arrow-right small"></span></a></p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4 mb-5">
                            <div className="hotel-room text-center">
                                <a href="#" className="d-block mb-4 thumbnail"><img src="/images/person_1.jpg"
                                                                                    alt="Image" className="img-fluid"/></a>
                                <div className="p-4">
                                    <h3 className="heading mb-3"><a href="#">Cristine Smith</a></h3>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta labore recusandae
                                        soluta quis.</p>
                                    <p><a href="#" className="text-primary">Read More <span
                                        className="icon-arrow-right small"></span></a></p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4 mb-5">
                            <div className="hotel-room text-center">
                                <a href="#" className="d-block mb-4 thumbnail"><img src="/images/person_2.jpg"
                                                                                    alt="Image" className="img-fluid"/></a>
                                <div className="p-4">
                                    <h3 className="heading mb-3"><a href="#">Marina Stalks</a></h3>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta labore recusandae
                                        soluta quis.</p>
                                    <p><a href="#" className="text-primary">Read More <span
                                        className="icon-arrow-right small"></span></a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="py-5 upcoming-events"
                 style={{backgroundImage: "url(images/hero_1.jpg)", backgroundAttachment:"fixed"}}>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-6">
                            <h2 className="text-white">Summer Promo 50% Off</h2>
                            <a href="#" className="text-white btn btn-outline-warning rounded-0 text-uppercase">Avail
                                Now</a>
                        </div>
                        <div className="col-md-6">
                            <span className="caption">The Promo will start in</span>
                            <div id="date-countdown"></div>
                        </div>
                    </div>

                </div>
            </div>

            <div className="site-section">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 mx-auto text-center mb-5 section-heading">
                            <h2 className="mb-5">Hotel Features</h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-6 col-md-4 col-lg-3">
                            <div className="text-center p-4 item">
                                <span className="flaticon-pool display-3 mb-3 d-block text-primary"></span>
                                <h2 className="h5">Swimming Pool</h2>
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-4 col-lg-3">
                            <div className="text-center p-4 item">
                                <span className="flaticon-desk display-3 mb-3 d-block text-primary"></span>
                                <h2 className="h5">Hotel Teller</h2>
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-4 col-lg-3">
                            <div className="text-center p-4 item">
                                <span className="flaticon-exit display-3 mb-3 d-block text-primary"></span>
                                <h2 className="h5">Fire Exit</h2>
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-4 col-lg-3">
                            <div className="text-center p-4 item">
                                <span className="flaticon-parking display-3 mb-3 d-block text-primary"></span>
                                <h2 className="h5">Car Parking</h2>
                            </div>
                        </div>

                        <div className="col-sm-6 col-md-4 col-lg-3">
                            <div className="text-center p-4 item">
                                <span className="flaticon-hair-dryer display-3 mb-3 d-block text-primary"></span>
                                <h2 className="h5">Hair Dryer</h2>
                            </div>
                        </div>

                        <div className="col-sm-6 col-md-4 col-lg-3">
                            <div className="text-center p-4 item">
                                <span className="flaticon-minibar display-3 mb-3 d-block text-primary"></span>
                                <h2 className="h5">Minibar</h2>
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-4 col-lg-3">
                            <div className="text-center p-4 item">
                                <span className="flaticon-drink display-3 mb-3 d-block text-primary"></span>
                                <h2 className="h5">Drinks</h2>
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-4 col-lg-3">
                            <div className="text-center p-4 item">
                                <span className="flaticon-cab display-3 mb-3 d-block text-primary"></span>
                                <h2 className="h5">Car Airport</h2>
                            </div>
                        </div>


                    </div>
                </div>
            </div>


            <div className="site-section border-top">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 mx-auto text-center mb-5 section-heading">
                            <h2 className="mb-5">Our Gallery</h2>
                        </div>
                    </div>
                    <div className="row no-gutters">
                        <div className="col-md-6 col-lg-3">
                            <a href="/images/img_1.jpg" className="image-popup img-opacity"><img src="/images/img_1.jpg"
                                                                                                alt="Image"
                                                                                                className="img-fluid"/></a>
                        </div>
                        <div className="col-md-6 col-lg-3">
                            <a href="/images/img_2.jpg" className="image-popup img-opacity"><img src="/images/img_2.jpg"
                                                                                                alt="Image"
                                                                                                className="img-fluid"/></a>
                        </div>
                        <div className="col-md-6 col-lg-3">
                            <a href="images/img_3.jpg" className="image-popup img-opacity"><img src="/images/img_3.jpg"
                                                                                                alt="Image"
                                                                                                className="img-fluid"/></a>
                        </div>
                        <div className="col-md-6 col-lg-3">
                            <a href="/images/img_4.jpg" className="image-popup img-opacity"><img src="/images/img_4.jpg"
                                                                                                alt="Image"
                                                                                                className="img-fluid"/></a>
                        </div>

                        <div className="col-md-6 col-lg-3">
                            <a href="/images/img_4.jpg" className="image-popup img-opacity"><img src="/images/img_4.jpg"
                                                                                                alt="Image"
                                                                                                className="img-fluid"/></a>
                        </div>
                        <div className="col-md-6 col-lg-3">
                            <a href="images/img_5.jpg" className="image-popup img-opacity"><img src="/images/img_5.jpg"
                                                                                                alt="Image"
                                                                                                className="img-fluid"/></a>
                        </div>
                        <div className="col-md-6 col-lg-3">
                            <a href="/images/img_6.jpg" className="image-popup img-opacity"><img src="/images/img_6.jpg"
                                                                                                alt="Image"
                                                                                                className="img-fluid"/></a>
                        </div>
                        <div className="col-md-6 col-lg-3">
                            <a href="/images/img_7.jpg" className="image-popup img-opacity"><img src="/images/img_7.jpg"
                                                                                                alt="Image"
                                                                                                className="img-fluid"/></a>
                        </div>

                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default About