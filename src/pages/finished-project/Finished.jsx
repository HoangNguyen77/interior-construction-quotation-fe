import React from "react";
import Carousel from 'react-bootstrap/Carousel';
import Header from "../../layouts/Header.jsx";
import Footer from "../../layouts/Footer.jsx";
import useScrollToTop from "../../utils/ScrollToTop.jsx";
import { Link } from "react-router-dom";

function Finished() {
    useScrollToTop();

    // Danh sách hình ảnh nội thất bên trong
    const interiorImages = ["/images/img_1.jpg", "/images/img_2.jpg", "/images/img_3.jpg", "/images/img_4.jpg", "/images/img_5.jpg", "/images/img_6.jpg", "/images/img_7.jpg"];

    return (
        <div>
            <Header />
            <div className="site-blocks-cover overlay" style={{ backgroundImage: "url(/images/hero_1.jpg)" }}
                 data-aos="fade"
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
                        <div className="col-md-6 col-lg-6 mb-5">
                            <Carousel
                                prevLabel={null}
                                nextLabel={null}
                            >
                                {interiorImages.map((image, index) => (
                                    <Carousel.Item key={index}>
                                        <img className="d-block w-100" src={image} alt={`Slide ${index + 1}`}/>
                                    </Carousel.Item>
                                ))}
                            </Carousel>
                        </div>

                        <div className="col-md-6 col-lg-6 mb-5">
                            <div className="media-with-text">
                                <div className="section-heading text-left">
                                    <h2 className="mb-5">Lorem Ipsum Dolor Sit Amet Ban Tumlum</h2>
                                </div>
                                <span className="mb-3 d-block post-date">created_date</span>
                                <div>
                                    <Link to="/contact">Nhận báo giá chi tiết</Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12 mb-5 text-center">
                            <h2 className="text-black">Nội Thất Bên Trong</h2>
                        </div>
                    </div>

                    <div className="row no-gutters text-center">
                        {interiorImages.map((image, index) => (
                            <div key={index} className="col-md-4 mb-4">
                                <img src={image} alt={`Interior Image ${index + 1}`} className="img-fluid"/>
                                <div className="product-details">
                                    <h3>Product Name {index + 1}</h3>
                                    <p className="category-product">Category</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default Finished;
