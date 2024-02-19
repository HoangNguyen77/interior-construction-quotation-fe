import React from "react";
import HomeSlider from "./components/HomeSlider.jsx";
import Header from "../../layouts/Header.jsx";
import Footer from "../../layouts/Footer.jsx";
import useScrollToTop from "../../utils/ScrollToTop.jsx";

function Home(){
    useScrollToTop()
    return (
        <div>
            <Header/>
            <div className="site-blocks-cover overlay" style={{backgroundImage: 'url(images/hero_1.jpg)'}}
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
            <div className="site-section bg-light">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 mx-auto text-center mb-5 section-heading">
                            <h2 className="mb-5">Danh sách phòng</h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 col-lg-4 mb-5">
                            <div className="hotel-room text-center">
                                <a href="#" className="d-block mb-0 thumbnail"><img src="/images/img_1.jpg" alt="Image"
                                                                                    className="img-fluid"/></a>
                                <div className="hotel-room-body">
                                    <h3 className="heading mb-0"><a href="#">Phòng thường</a></h3>
                                    <strong className="price">350.000đ / một đêm</strong>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4 mb-5">
                            <div className="hotel-room text-center">
                                <a href="#" className="d-block mb-0 thumbnail"><img src="/images/img_2.jpg" alt="Image"
                                                                                    className="img-fluid"/></a>
                                <div className="hotel-room-body">
                                    <h3 className="heading mb-0"><a href="#">Phòng gia đình</a></h3>
                                    <strong className="price">500.000đ / một đêm</strong>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4 mb-5">
                            <div className="hotel-room text-center">
                                <a href="#" className="d-block mb-0 thumbnail"><img src="/images/img_3.jpg" alt="Image"
                                                                                    className="img-fluid"/></a>
                                <div className="hotel-room-body">
                                    <h3 className="heading mb-0"><a href="#">Phòng đơn</a></h3>
                                    <strong className="price">250.000đ / một đêm</strong>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6 col-lg-4 mb-5">
                            <div className="hotel-room text-center">
                                <a href="#" className="d-block mb-0 thumbnail"><img src="/images/img_1.jpg" alt="Image"
                                                                                    className="img-fluid"/></a>
                                <div className="hotel-room-body">
                                    <h3 className="heading mb-0"><a href="#">Phòng đôi</a></h3>
                                    <strong className="price">300.000đ / một đêm</strong>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4 mb-5">
                            <div className="hotel-room text-center">
                                <a href="#" className="d-block mb-0 thumbnail"><img src="/images/img_2.jpg" alt="Image"
                                                                                    className="img-fluid"/></a>
                                <div className="hotel-room-body">
                                    <h3 className="heading mb-0"><a href="#">Phòng cao cấp</a></h3>
                                    <strong className="price">800.000đ / một đêm</strong>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4 mb-5">
                            <div className="hotel-room text-center">
                                <a href="#" className="d-block mb-0 thumbnail"><img src="/images/img_3.jpg" alt="Image"
                                                                                    className="img-fluid"/></a>
                                <div className="hotel-room-body">
                                    <h3 className="heading mb-0"><a href="#">Phòng đơn</a></h3>
                                    <strong className="price">100.000đ / một đêm</strong>
                                </div>
                            </div>
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
                                <h2 className="mb-5">Thông tin</h2>
                            </div>
                            <p className="mb-4">Khách sạn Hoàng Hôn luôn mang vẻ đẹp hiện đại xen lẫn nét cổ kính. Đặt
                                khách sạn sớm nhất để hưởng trọn ưu đãi, hứa hẹn một kì nghỉ với những ...</p>
                            <p><a href="https://vimeo.com/28959265" className="popup-vimeo text-uppercase">Xem
                                Video <span className="icon-arrow-right small"></span></a></p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="site-section">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 mx-auto text-center mb-5 section-heading">
                            <h2 className="mb-5">TÍNH NĂNG HIỆN CÓ</h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-6 col-md-4 col-lg-3">
                            <div className="text-center p-4 item">
                                <span className="flaticon-pool display-3 mb-3 d-block text-primary"></span>
                                <h2 className="h5">Hồ bơi</h2>
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-4 col-lg-3">
                            <div className="text-center p-4 item">
                                <span className="flaticon-desk display-3 mb-3 d-block text-primary"></span>
                                <h2 className="h5">Gọi thức ăn nhanh</h2>
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-4 col-lg-3">
                            <div className="text-center p-4 item">
                                <span className="flaticon-exit display-3 mb-3 d-block text-primary"></span>
                                <h2 className="h5">Thoát hiểm an toàn</h2>
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-4 col-lg-3">
                            <div className="text-center p-4 item">
                                <span className="flaticon-parking display-3 mb-3 d-block text-primary"></span>
                                <h2 className="h5">Bãi đổ xe</h2>
                            </div>
                        </div>

                        <div className="col-sm-6 col-md-4 col-lg-3">
                            <div className="text-center p-4 item">
                                <span className="flaticon-hair-dryer display-3 mb-3 d-block text-primary"></span>
                                <h2 className="h5">Tạo mẫu tóc</h2>
                            </div>
                        </div>

                        <div className="col-sm-6 col-md-4 col-lg-3">
                            <div className="text-center p-4 item">
                                <span className="flaticon-minibar display-3 mb-3 d-block text-primary"></span>
                                <h2 className="h5">Quầy bar</h2>
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-4 col-lg-3">
                            <div className="text-center p-4 item">
                                <span className="flaticon-drink display-3 mb-3 d-block text-primary"></span>
                                <h2 className="h5">Thức uống</h2>
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-4 col-lg-3">
                            <div className="text-center p-4 item">
                                <span className="flaticon-cab display-3 mb-3 d-block text-primary"></span>
                                <h2 className="h5">Thuê ô tô</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="py-5 upcoming-events"
                 style={{backgroundImage: 'url(/images/hero_1.jpg)', backgroundAttachment: 'fixed'}}>
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
                            <h2 className="mb-5">Phòng còn trống</h2>
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
                            <a href="/images/img_3.jpg" className="image-popup img-opacity"><img src="/images/img_3.jpg"
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
                            <a href="/images/img_5.jpg" className="image-popup img-opacity"><img src="/images/img_5.jpg"
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
            <div className="site-section block-15">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 mx-auto text-center mb-5 section-heading">
                            <h2>Thông tin phòng</h2>
                        </div>
                    </div>


                    <div className="nonloop-block-15 owl-carousel">


                        <div className="media-with-text p-md-5">
                            <div className="img-border-sm mb-4">
                                <a href="#" className="popup-vimeo image-play">
                                    <img src="/images/img_1.jpg" alt="" className="img-fluid"/>
                                </a>
                            </div>
                            <h2 className="heading mb-0"><a href="#">Lorem Ipsum Dolor Sit Amet</a></h2>
                            <span className="mb-3 d-block post-date">Dec 20th, 2018 &bullet; By <a
                                href="#">Admin</a></span>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio dolores culpa qui aliquam
                                placeat nobis veritatis tempora natus rerum obcaecati.</p>
                        </div>

                        <div className="media-with-text p-md-4">
                            <div className="img-border-sm mb-4">
                                <a href="#" className="popup-vimeo image-play">
                                    <img src="/images/img_2.jpg" alt="" className="img-fluid"/>
                                </a>
                            </div>
                            <h2 className="heading mb-0"><a href="#">Lorem Ipsum Dolor Sit Amet</a></h2>
                            <span className="mb-3 d-block post-date">Dec 20th, 2018 &bullet; By <a
                                href="#">Admin</a></span>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio dolores culpa qui aliquam
                                placeat nobis veritatis tempora natus rerum obcaecati.</p>
                        </div>

                        <div className="media-with-text p-md-4">
                            <div className="img-border-sm mb-4">
                                <a href="#" className="popup-vimeo image-play">
                                    <img src="/images/img_3.jpg" alt="" className="img-fluid"/>
                                </a>
                            </div>
                            <h2 className="heading mb-0"><a href="#">Lorem Ipsum Dolor Sit Amet</a></h2>
                            <span className="mb-3 d-block post-date">Dec 20th, 2018 &bullet; By <a
                                href="#">Admin</a></span>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio dolores culpa qui aliquam
                                placeat nobis veritatis tempora natus rerum obcaecati.</p>
                        </div>

                        <div className="media-with-text p-md-4">
                            <div className="img-border-sm mb-4">
                                <a href="#" className="popup-vimeo image-play">
                                    <img src="/images/img_1.jpg" alt="" className="img-fluid"/>
                                </a>
                            </div>
                            <h2 className="heading mb-0"><a href="#">Lorem Ipsum Dolor Sit Amet</a></h2>
                            <span className="mb-3 d-block post-date">Dec 20th, 2018 &bullet; By <a
                                href="#">Admin</a></span>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio dolores culpa qui aliquam
                                placeat nobis veritatis tempora natus rerum obcaecati.</p>
                        </div>

                        <div className="media-with-text p-md-4">
                            <div className="img-border-sm mb-4">
                                <a href="#" className="popup-vimeo image-play">
                                    <img src="/images/img_2.jpg" alt="" className="img-fluid"/>
                                </a>
                            </div>
                            <h2 className="heading mb-0"><a href="#">Lorem Ipsum Dolor Sit Amet</a></h2>
                            <span className="mb-3 d-block post-date">Dec 20th, 2018 &bullet; By <a
                                href="#">Admin</a></span>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio dolores culpa qui aliquam
                                placeat nobis veritatis tempora natus rerum obcaecati.</p>
                        </div>

                        <div className="media-with-text p-md-4">
                            <div className="img-border-sm mb-4">
                                <a href="#" className="popup-vimeo image-play">
                                    <img src="/images/img_3.jpg" alt="" className="img-fluid"/>
                                </a>
                            </div>
                            <h2 className="heading mb-0"><a href="#">Lorem Ipsum Dolor Sit Amet</a></h2>
                            <span className="mb-3 d-block post-date">Dec 20th, 2018 &bullet; By <a
                                href="#">Admin</a></span>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio dolores culpa qui aliquam
                                placeat nobis veritatis tempora natus rerum obcaecati.</p>
                        </div>

                        <div className="media-with-text p-md-4">
                            <div className="img-border-sm mb-4">
                                <a href="#" className="popup-vimeo image-play">
                                    <img src="/images/img_1.jpg" alt="" className="img-fluid"/>
                                </a>
                            </div>
                            <h2 className="heading mb-0"><a href="#">Lorem Ipsum Dolor Sit Amet</a></h2>
                            <span className="mb-3 d-block post-date">Dec 20th, 2018 &bullet; By <a
                                href="#">Admin</a></span>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio dolores culpa qui aliquam
                                placeat nobis veritatis tempora natus rerum obcaecati.</p>
                        </div>

                        <div className="media-with-text p-md-4">
                            <div className="img-border-sm mb-4">
                                <a href="#" className="popup-vimeo image-play">
                                    <img src="/images/img_2.jpg" alt="" className="img-fluid"/>
                                </a>
                            </div>
                            <h2 className="heading mb-0"><a href="#">Lorem Ipsum Dolor Sit Amet</a></h2>
                            <span className="mb-3 d-block post-date">Dec 20th, 2018 &bullet; By <a
                                href="#">Admin</a></span>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio dolores culpa qui aliquam
                                placeat nobis veritatis tempora natus rerum obcaecati.</p>
                        </div>

                        <div className="media-with-text p-md-4">
                            <div className="img-border-sm mb-4">
                                <a href="#" className="popup-vimeo image-play">
                                    <img src="/images/img_3.jpg" alt="" className="img-fluid"/>
                                </a>
                            </div>
                            <h2 className="heading mb-0"><a href="#">Lorem Ipsum Dolor Sit Amet</a></h2>
                            <span className="mb-3 d-block post-date">Dec 20th, 2018 &bullet; By <a
                                href="#">Admin</a></span>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio dolores culpa qui aliquam
                                placeat nobis veritatis tempora natus rerum obcaecati.</p>
                        </div>


                    </div>

                </div>
            </div>
            <div className="site-section block-14 bg-light">

                <div className="container">

                    <div className="row">
                        <div className="col-md-6 mx-auto text-center mb-5 section-heading">
                            <h2>Phản hồi khách hàng</h2>
                        </div>
                    </div>

                    <div className="nonloop-block-14 owl-carousel">

                        <div className="p-4">
                            <div className="d-flex block-testimony">
                                <div className="person mr-3">
                                    <img src="/images/person_1.jpg" alt="Image" className="img-fluid rounded"/>
                                </div>
                                <div>
                                    <h2 className="h5">Katie Johnson</h2>
                                    <blockquote>&ldquo;Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias
                                        accusantium qui optio, possimus necessitatibus voluptate aliquam velit nostrum
                                        tempora ipsam!&rdquo;</blockquote>
                                </div>
                            </div>
                        </div>
                        <div className="p-4">
                            <div className="d-flex block-testimony">
                                <div className="person mr-3">
                                    <img src="/images/person_2.jpg" alt="Image" className="img-fluid rounded"/>
                                </div>
                                <div>
                                    <h2 className="h5">Jane Mars</h2>
                                    <blockquote>&ldquo;Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias
                                        accusantium qui optio, possimus necessitatibus voluptate aliquam velit nostrum
                                        tempora ipsam!&rdquo;</blockquote>
                                </div>
                            </div>
                        </div>
                        <div className="p-4">
                            <div className="d-flex block-testimony">
                                <div className="person mr-3">
                                    <img src="/images/person_3.jpg" alt="Image" className="img-fluid rounded"/>
                                </div>
                                <div>
                                    <h2 className="h5">Shane Holmes</h2>
                                    <blockquote>&ldquo;Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias
                                        accusantium qui optio, possimus necessitatibus voluptate aliquam velit nostrum
                                        tempora ipsam!&rdquo;</blockquote>
                                </div>
                            </div>
                        </div>
                        <div className="p-4">
                            <div className="d-flex block-testimony">
                                <div className="person mr-3">
                                    <img src="/images/person_4.jpg" alt="Image" className="img-fluid rounded"/>
                                </div>
                                <div>
                                    <h2 className="h5">Mark Johnson</h2>
                                    <blockquote>&ldquo;Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias
                                        accusantium qui optio, possimus necessitatibus voluptate aliquam velit nostrum
                                        tempora ipsam!&rdquo;</blockquote>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

            </div>
            <div className="py-5 quick-contact-info">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 text-center">
                            <div>
                                <span className="icon-room text-white h2 d-block"></span>
                                <h2>Location</h2>
                                <p className="mb-0">New York - 2398 <br/> 10 Hadson Carl Street</p>
                            </div>
                        </div>
                        <div className="col-md-4 text-center">
                            <div>
                                <span className="icon-clock-o text-white h2 d-block"></span>
                                <h2>Service Times</h2>
                                <p className="mb-0">Wednesdays at 6:30PM - 7:30PM <br/>
                                    Fridays at Sunset - 7:30PM <br/>
                                    Saturdays at 8:00AM - Sunset</p>
                            </div>
                        </div>
                        <div className="col-md-4 text-center">
                            <div>
                                <span className="icon-comments text-white h2 d-block"></span>
                                <h2>Get In Touch</h2>
                                <p className="mb-0">Email: info@yoursite.com <br/>
                                    Phone: (123) 3240-345-9348 </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default Home