import React, {useEffect, useRef, useState} from "react";
import Carousel from 'react-bootstrap/Carousel';
import Header from "../../layouts/Header.jsx";
import Footer from "../../layouts/Footer.jsx";
import useScrollToTop from "../../utils/ScrollToTop.jsx";
import {Link, useParams} from "react-router-dom";
import {format} from "date-fns";
import {
    getAllProjectImageData,
    getFinishedProjectById,
    getFinishedProjectsByTitle
} from "../../api/finished/FinishedProjectAPI.js";

function DetailFinished() {
    useScrollToTop();
    const sectionRef = useRef(null);
    const {projectId} = useParams();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [finishedDate, setFinishedDate] = useState("");
    const [imageList, setImageList] = useState([]);
    const formattedDate = (createdDate) => {
        const date = new Date(createdDate);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };
    // Danh sách hình ảnh nội thất bên trong
    const interiorImages = ["/images/img_1.jpg", "/images/img_2.jpg", "/images/img_3.jpg", "/images/img_4.jpg", "/images/img_5.jpg", "/images/img_6.jpg", "/images/img_7.jpg"];
    useEffect(() => {
        sectionRef.current.scrollIntoView({behavior: 'smooth'});
        getFinishedProjectById(projectId).then(
            result => {
                setTitle(result.title);
                setContent(result.content);
                setFinishedDate(result.finishedDate);
            }
        )
        getAllProjectImageData(projectId).then(
            result => {
                setImageList(result)
            }
        )
    }, []);
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

            <div className="site-section" ref={sectionRef}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 col-lg-6 mb-5">
                            <Carousel
                                prevLabel={null}
                                nextLabel={null}
                            >
                                {imageList.map((image, index) => (
                                    <Carousel.Item key={index}>
                                        <img className="d-block w-100" src={image.imageData} alt={`Slide ${index + 1}`}/>
                                    </Carousel.Item>
                                ))}
                            </Carousel>
                        </div>

                        <div className="col-md-6 col-lg-6 mb-5 ">
                            <div className="media-with-text ">
                                <div className=" text-left">
                                    <div className="h2 mb-3">{title}</div>
                                </div>
                                <span className="mb-3 d-block post-date">{formattedDate(finishedDate)}</span>
                                <div>
                                    <Link to="/contact">Nhận báo giá chi tiết</Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="media-with-text">
                            <div className="h5" style={{color: '#00000080'}}>{content}</div>
                        </div>
                    </div>

                    {/*<div className="row no-gutters text-center">*/}
                    {/*    {interiorImages.map((image, index) => (*/}
                    {/*        <div key={index} className="col-md-4 mb-4">*/}
                    {/*            <img src={image} alt={`Interior Image ${index + 1}`} className="img-fluid"/>*/}
                    {/*            <div className="product-details">*/}
                    {/*                <h3>Product Name {index + 1}</h3>*/}
                    {/*                <p className="category-product">Category</p>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*    ))}*/}
                    {/*</div>*/}
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default DetailFinished;
