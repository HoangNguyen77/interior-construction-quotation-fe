// eslint-disable-next-line no-unused-vars
import React from "react";
import Header from "../../layouts/Header.jsx";
import Footer from "../../layouts/Footer.jsx";
import useScrollToTop from "../../utils/ScrollToTop.jsx";

function About() {
    useScrollToTop()
    return (
        <div>
            <Header/>
            <div className="site-blocks-cover overlay" style={{backgroundImage: "url(/images/hero_4.jpg)"}}
                 data-aos="fade"
                 data-stellar-background-ratio="0.5">
                <div className="container">
                    <div className="row align-items-center justify-content-center">
                        <div className="col-md-7 text-center" data-aos="fade">
                            <span className="caption mb-3">VivaDecor</span>
                            <h1 className="mb-4">Về Chúng Tôi</h1>
                        </div>
                    </div>
                </div>
            </div>


            <div className="site-section">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-6 mb-5 mb-md-0">

                            <div className="img-border">
                                <a href="" className="popup-vimeo image-play">
                                    {/* <span className="icon-wrap">
                    <span className="icon icon-play"></span>
                  </span>*/}
                                    <img src="/images/1.jpg" alt="" className="img-fluid"/>
                                </a>
                            </div>

                            <img src="/images/2.jpg" alt="Image" className="img-fluid image-absolute"/>

                        </div>
                        <div className="col-md-5 ml-auto">


                            <div className="section-heading text-left">
                                <h1 className="mb-5">Xin chào</h1>
                            </div>
                            <p className="mb-3">VivaDecor với hơn 20 năm kinh nghiệm và trải nghiệm trong lĩnh vực thiết
                                kế nội thất dịch vụ đầy đủ có trụ sở tại Thành phố Hồ Chí Minh chuyên về thiết kế cổ
                                điển có tầm ảnh hưởng toàn cầu.
                                Dù thiết kế không gian dân cư hay thương mại, VivaDecor đã tạo dựng được danh tiếng nhờ
                                đạt được những kết quả mang tính cá nhân cao cho nhóm khách hàng quốc tế sành điệu.
                            </p>
                            <p className="mb-3">
                                VivaDecor tạo ra những câu chuyện trực quan trở thành môi trường xung quanh đặc trưng.
                                Được hướng dẫn bởi nguyện vọng của khách hàng cũng như trải nghiệm đa dạng của họ, công
                                ty thiết kế nội thất độc đáo, cho phép khách hàng thể hiện đầy đủ họ là ai và điều gì có
                                ý nghĩa đối với họ.
                            </p>
                            <p className="mb-3">
                                Lịch sử và vị trí của dự án, cùng với bề dày kinh nghiệm của VivaDecor và niềm tin vững
                                chắc rằng thiết kế thành công phải được tạo ra bởi những đặc điểm riêng của từng dự án,
                                hãy cùng VivaDecor tạo ra những nội thất đặc biệt. Danh mục công việc đã hoàn thành bao
                                gồm việc phục hồi lịch sử, cải tạo hiện đại và các dự án xây dựng mới.
                            </p>
                            {/*<p><a href="https://vimeo.com/629819635" className="popup-vimeo text-uppercase">Xem Video <span className="icon-arrow-right small"></span></a></p>*/}
                        </div>
                    </div>
                </div>
            </div>
            <div className="site-section bg-light">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 mx-auto text-center mb-5 section-heading">
                            <h1 className="mb-5">Đội ngũ VivaDecor</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-3 mb-5 mb-md-0">
                            <div className="hotel-room text-center">
                                <a href="/about/nguyencongchien" className="d-block mb-1 thumbnail"><img
                                    src="/images/congchien.jpg"
                                    alt="Image" className="img-fluid"/></a>
                                <div className="p-4">
                                    <h3 className="heading mb-3"><a href="#">Nguyễn Công Chiến</a></h3>
                                    <p className="text-left mb-3">Nguyễn Công Chiến, CEO VivarDecor, là nhà thiết kế nội thất xuất sắc, kết hợp tinh
                                    tế giữa truyền thống và hiện đại. Lãnh đạo đầy tầm nhìn, ông tạo ra không gian sống
                                        độc đáo và góp phần tích cực vào cộng đồng qua hoạt động từ thiện.</p>
                                    <p>
                                    <a href="/about/nguyencongchien" className="text-primary">Xem thêm <span
                                        className="icon-arrow-right small"></span></a></p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 mb-5 mb-md-0">
                            <div className="hotel-room text-center">
                                <a href="/about/nguyenhuyhoang" className="d-block mb-1 thumbnail"><img
                                    src="/images/huyhoang.jpg"
                                    alt="Image" className="img-fluid"/></a>
                                <div className="p-4">
                                    <h3 className="heading mb-3"><a href="#">Nguyễn Công Chiến</a></h3>

                                   <p className="text-left mb-3">  Nguyễn Công Chiến, CEO VivarDecor, là nhà thiết kế nội thất xuất sắc, kết hợp tinh
                                    tế giữa truyền thống và hiện đại. Lãnh đạo đầy tầm nhìn, ông tạo ra không gian sống
                                       độc đáo và góp phần tích cực vào cộng đồng qua hoạt động từ thiện. </p>
                                    <p>
                                    <a href="/about/nguyenhuyhoang" className="text-primary">Xem thêm <span
                                        className="icon-arrow-right small"></span></a></p>
                                </div>
                            </div>
                        </div>


                        <div className="col-md-3 mb-5 mb-md-0">
                            <div className="hotel-room text-center">
                                <a href="/about/phamchicuong" className="d-block mb-4 thumbnail"><img
                                    src="/images/chicuong.jpg"
                                    alt="Image" className="img-fluid"/></a>
                                <div className="p-4">
                                    <h3 className="heading mb-3"><a href="#">Phạm Chí Cường</a></h3>
                                    <p className="text-left mb-3"> Bắt đầu sự nghiệp ấn tượng từ Đại học Bauhaus - Weimar.
                                        Với cơ hội làm việc cùng nhà thiết kế nổi tiếng Philippe Starck trong nhiều dự
                                        án quan trọng là  sự kết hợp giữa kiến thức chuyên sâu và tầm nhìn sáng tạo</p>
                                    <p><a href="/about/phamchicuong" className="text-primary">Xem thêm<span
                                        className="icon-arrow-right small"></span></a></p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 mb-5 mb-md-0">
                            <div className="hotel-room text-center">
                                <a href="#" className="d-block mb-5 thumbnail"><img src="/images/cd.jpg"
                                                                                    alt="Image" className="img-fluid"
                                /></a>
                                <div className="p-4">
                                    <h3 className="heading mb-3"><a href="#">Tôn Chí Dũng</a></h3>
                                    <p className="text-left mb-3">Người được mệnh danh -Phù thủy thành LonDon- với việc đã làm rất nhiều thiết kế
                                        mang tính chất vĩ đại.
                                        Ông là một trong số ít người từng học và làm việc tại University of Arts
                                        London.</p>
                                    <p><a href="#" className="text-primary">Xem thêm<span
                                        className="icon-arrow-right small"></span></a></p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>


            {/*<div className="py-5 upcoming-events"
                 style={{backgroundImage: "url(images/hero_1.jpg)", backgroundAttachment: "fixed"}}>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-6">
                            <h2 className="text-white">Spring Promo 50% Off</h2>
                            <a href="#" className="text-white btn btn-outline-warning rounded-0 text-uppercase">Avail
                                Now</a>
                        </div>
                        <div className="col-md-6">
                            <span className="caption">The Promo will start in</span>
                            <div id="date-countdown"></div>
                        </div>
                    </div>

                </div>
            </div>*/}

            {/*<div className="site-section">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 mx-auto text-center mb-5 section-heading">
                            <h2 className="mb-5"> Tính năng của VivaDecor </h2>
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
                                <h2 className="h5">ViVa Teller</h2>
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-4 col-lg-3">
                            <div className="text-center p-4 item">
                                <span className="flaticon-exit display-3 mb-3 d-block text-primary"></span>
                                <h2 className="h5">Door</h2>
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
                                <h2 className="h5">Bathroom</h2>
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
                                <h2 className="h5">Prenium Car</h2>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
*/}

            <div className="site-section">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="ml-lg-5">


                            {/* <span className="icon-wrap">
                    <span className="icon icon-play"></span>
                  </span>*/}
                            <span >
                                    <img src="/images/quytrinh.jpg" alt="" className="img-thumnail"/>


                                {/* <img src="/images/2.jpg" alt="Image" className="img-fluid image-absolute"/>*/}
                            </span>
                        </div>
                        <div className="col-md-6 mx-auto text-xl-left form-control:focus ">


                            {/*<div className="section-heading text-left">
                                <h2 className="mb-5">Xin chào</h2>
                            </div>*/}

                            <p className="h1">VivaDecor sở hữu quy trình khép kín với tiêu chí ba <a style={{color:"black", fontSize: "35px"}}>KHÔNG</a>:
                        </p>
                            <p className="display-5 text-black"> <strong className="h3">✔ KHÔNG</strong> trung gian phân phối </p>
                            <p className="display-5 text-black"><strong className="h3">✔ KHÔNG</strong> thợ khoán</p>
                            <p className="display-5 text-black"><strong className="h3">✔ KHÔNG</strong> thuê xưởng bên
                                thứ ba
                            </p>
                            <p className="h2">Đảm bảo tiến độ, chất lượng và cam kết với chi phí tốt
                                nhất</p>


                            {/*<p><a href="https://vimeo.com/629819635" className="popup-vimeo text-uppercase">Xem Video <span className="icon-arrow-right small"></span></a></p>*/}
                        </div>

                        <div className="col-md-10 mx-auto"  >
                            <span >
                                    <img src="/images/sodoquytrinh.jpg" alt="Image" className="img-fluid"/>


                                {/* <img src="/images/2.jpg" alt="Image" className="img-fluid image-absolute"/>*/}
                            </span>
                        </div>

                    </div>
                </div>
            </div>

            <div className="site-section border-top">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 mx-auto text-center scroll-mb-60 section-heading">
                            <h1 className="mb-5">Show room</h1>
                        </div>
                        <div className="row">
                            <div className=" mx-auto text-center">
                                <p className="mb-3"> Là một trong những showroom mang lại trải nghiệm mua sắm tốt nhất hiện nay.
                                    Với diện tích 800m², tách biệt các không gian thành 10 phong cách nội thất khác nhau, cùng với 1 phòng vật liệu và tư vấn. </p>

                            </div>
                        </div>
                    </div>
                    <div className="row no-gutters">
                        <div className="col-md-6 col-lg-3">
                            <a href="/images/japanliving1.jpg" className="image-popup img-opacity"><img
                                src="/images/japanliving1.jpg"
                                alt="Image"
                                className="img-fluid"/></a>
                        </div>
                        <div className="col-md-6 col-lg-3">
                            <a href="/images/livingandkitchen.jpg" className="image-popup img-opacity"><img
                                src="/images/livingandkitchen.jpg"
                                alt="Image"
                                className="img-fluid"/></a>
                        </div>
                        <div className="col-md-6 col-lg-3">
                            <a href="/images/kitchen1.jpg" className="image-popup img-opacity"><img
                                src="/images/kitchen1.jpg"
                                alt="Image"
                                className="img-fluid"/></a>
                        </div>
                        <div className="col-md-6 col-lg-3">
                            <a href="/images/bathroom.jpg" className="image-popup img-opacity"><img
                                src="/images/bathroom.jpg"
                                alt="Image"
                                className="img-fluid"/></a>
                        </div>

                        <div className="col-md-6 col-lg-3">
                            <a href="/images/7.jpg" className="image-popup img-opacity"><img src="/images/7.jpg"
                                                                                                 alt="Image"
                                                                                                 className="img-fluid"/></a>
                        </div>
                        <div className="col-md-6 col-lg-3">
                            <a href="/images/43.jpg" className="image-popup img-opacity"><img src="/images/43.jpg"
                                                                                                alt="Image"
                                                                                                className="img-fluid"/></a>
                        </div>
                        <div className="col-md-6 col-lg-3">
                            <a href="/images/5.jpg" className="image-popup img-opacity"><img src="/images/5.jpg"
                                                                                                 alt="Image"
                                                                                                 className="img-fluid"/></a>
                        </div>
                        <div className="col-md-6 col-lg-3">
                            <a href="/images/img_3.jpg" className="image-popup img-opacity"><img src="/images/img_3.jpg"
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

// <div className="col-md-6 col-lg-4 mb-5">
//                             <div className="hotel-room text-center">
//                                 <a href="#" className="d-block mb-4 thumbnail"><img src="/images/person_3.jpg"
//                                                                                     alt="Image" className="img-fluid"/></a>
//                                 <div className="p-4">
//                                     <h3 className="heading mb-3"><a href="#">Ethan Hoover</a></h3>
//                                     <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta labore recusandae
//                                         soluta quis.</p>
//                                     <p><a href="#" className="text-primary">Read More <span
//                                         className="icon-arrow-right small"></span></a></p>
//                                 </div>
//                             </div>
//                         </div>
//-------------------------------------------------------------------------------------------
//<div className="col-md-6 col-lg-4 mb-5">
//                             <div className="hotel-room text-center">
//                                 <a href="#" className="d-block mb-4 thumbnail"><img src="/images/person_2.jpg"
//                                                                                     alt="Image" className="img-fluid"/></a>
//                                 <div className="p-4">
//                                     <h3 className="heading mb-3"><a href="#">Marina Stalks</a></h3>
//                                     <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta labore recusandae
//                                         soluta quis.</p>
//                                     <p><a href="#" className="text-primary">Read More <span
//                                         className="icon-arrow-right small"></span></a></p>
//                                 </div>
//                             </div>
//                         </div>
export default About