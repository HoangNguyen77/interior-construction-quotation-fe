import React, {useEffect, useRef, useState} from "react";
import { Carousel } from 'react-responsive-carousel';
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
    const getShortDescription = (description) => {
        const words = description.split(' ');
        const shortWords = words.slice(0, 50);
        const shortDescription = shortWords.join(' ');
        return shortDescription;
    };
    const formattedDate = (createdDate) => {
        const date = new Date(createdDate);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };
    // Danh sách hình ảnh nội thất bên trong
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

            <div className="site-section bg-light" ref={sectionRef}>
                <div className="container">
                    <div className="row">
                        {/*<div className="col-md-6 col-lg-6 mb-5">*/}
                        {/*    <Carousel*/}
                        {/*        prevLabel={null}*/}
                        {/*        nextLabel={null}*/}
                        {/*    >*/}
                        {/*        {imageList.map((image, index) => (*/}
                        {/*            <Carousel.Item key={index}>*/}
                        {/*                <img className="d-block w-100" src={image.imageData}*/}
                        {/*                     alt={`Slide ${index + 1}`}/>*/}
                        {/*            </Carousel.Item>*/}
                        {/*        ))}*/}
                        {/*    </Carousel>*/}
                        {/*</div>*/}
                        <div className="col-md-8">
                            <Carousel showThumbs={true}>
                                {imageList.map((img, index) => (
                                    <div key={index} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '600px'}}>
                                        <img src={img.imageData} alt="" style={{objectFit: 'contain'}}/>
                                    </div>
                                ))}
                            </Carousel>
                        </div>

                        <div className="col-md-4 ">
                            <div className="media-with-text ">
                                <div className=" mx-auto text-center mb-1 section-heading">
                                    <div className="h2 mb-3">{title}</div>
                                </div>
                                <span className="mb-3 d-block post-date">{formattedDate(finishedDate)}</span>
                                <div className="media-with-text">
                                    <div className="h5"
                                         style={{color: '#00000080'}}>{getShortDescription(content)}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="media-with-text">
                            <div className="h5" style={{color: '#00000080'}}>{content}</div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="my-4"></div>
                        <div className="col-md-6 mx-auto text-center mb-1 section-heading">
                            <h1 className="mb-1">Nội thất bên trong</h1>
                        </div>
                        <div className="my-4"></div>
                    </div>

                    <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
                        {imageList.map((image, index) => (
                            <div key={index} className="relative">
                                <img className="w-full h-auto" src={image.imageData} alt={`Slide ${index + 1}`}
                                     style={{marginBottom: '20px'}}/>
                            </div>
                        ))}
                    </div>


                    <Link to="/finished-project" className="p-2" style={{fontSize: '50px'}}><span
                        className="icon-arrow-circle-left"></span></Link>
                </div>
            </div>

            <Footer/>
        </div>
    );
}

export default DetailFinished;
