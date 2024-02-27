import React, {useEffect, useRef, useState} from "react";
import Header from "../../layouts/Header.jsx";
import Footer from "../../layouts/Footer.jsx";
import useScrollToTop from "../../utils/ScrollToTop.jsx";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import {Link, useParams} from "react-router-dom";
import {getBlogById} from "../../api/blog/BlogAPI.js";
import {format} from "date-fns";
import {getAllBLogImage} from "../../api/blog/BlogImageAPI.js";

const BlogDetail = () => {
    useScrollToTop();
    const sectionRef = useRef(null);
    const { blogId } = useParams();

    const [blog, setBlog] = useState(null);
    const [imageList, setImageList] = useState([]);
    const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);
    const [baoLoi, setBaoLoi] = useState(null);

    useEffect(() => {
        getBlogById(blogId).then(blog => {
            setBlog(blog);
            setDangTaiDuLieu(false);
            console.log(blog);
            // Chờ cho đến khi blog được tải và component đã mount
            if (sectionRef.current) {
                sectionRef.current.scrollIntoView({ behavior: 'smooth' });
            }
        }).catch(error => {
            console.log(error);
            setBaoLoi(error.toString());
            setDangTaiDuLieu(false);
        });
        getAllBLogImage(blogId).then(
            imageList => {
                setImageList(imageList);
            }
        ).catch(error => console.log(error));
    }, [blogId]); // Thêm blogId vào mảng phụ thuộc để useEffect chạy lại khi blogId thay đổi

    if (dangTaiDuLieu) {
        return <div><h1>Đang tải dữ liệu...</h1></div>;
    }
    if (baoLoi) {
        return <div><h1>Gặp lỗi: {baoLoi}</h1></div>;
    }
    if (!blog) {
        return <div><h1>Blog không tồn tại!</h1></div>;
    }

    const formattedDate = format(new Date(blog.createdDate), 'MMM do, yyyy');
    return(
        <div>
            <Header/>
            <div className="site-blocks-cover overlay" style={{backgroundImage: "url(/images/hero_1.jpg)"}}
                 data-aos="fade"
                 data-stellar-background-ratio="0.5">
                <div className="container">
                    <div className="row align-items-center justify-content-center">
                        <div className="col-md-7 text-center" data-aos="fade">
                            <span className="caption mb-3">Read Our</span>
                            <h1 className="mb-4">Blogs</h1>
                        </div>
                    </div>
                </div>
            </div>
                <div className="site-section bg-light" ref={sectionRef}>
                    <div className="container">
                        <div className="p-5 bg-white">
                            <h1 style={{fontSize: "3em"}}>{blog.title}</h1>
                            <h6><span className="mb-3 d-block post-date">{formattedDate}</span></h6>
                            <hr/>
                            <Carousel showThumbs={false}>
                                {
                                    imageList.map((img, index)=>(
                                        <div key={index}>
                                            <img src={img.imageData} alt=""/>
                                        </div>
                                    ))
                                }
                            </Carousel>
                            <p style={{fontSize: "large", color: "black"}} className="text-justify mt-5">{blog.description}
                            </p>
                        </div>
                        <Link to="/blog" className="p-2" style={{fontSize: '50px'}}><span
                            className="icon-arrow-circle-left"></span></Link>
                    </div>
                </div>
            <Footer/>
        </div>
    )

}

export default BlogDetail