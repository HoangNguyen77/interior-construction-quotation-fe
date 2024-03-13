import React, {useEffect, useRef, useState} from "react";
import Header from "../../layouts/Header.jsx";
import Footer from "../../layouts/Footer.jsx";
import useScrollToTop from "../../utils/ScrollToTop.jsx";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import {Link, useParams} from "react-router-dom";
import {get3RandomBlog, getBlogById} from "../../api/blog/BlogAPI.js";
import {format} from "date-fns";
import {getAllBLogImage} from "../../api/blog/BlogImageAPI.js";

const BlogDetail = () => {
    useScrollToTop();
    const sectionRef = useRef(null);
    const { blogId } = useParams();

    const [blog, setBlog] = useState(null);
    const [imageList, setImageList] = useState([]);
    const [randomBlogList, setRandomBlogList] = useState([]);
    const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);
    const [baoLoi, setBaoLoi] = useState(null);

    const getShortDescription = (description) => {
        const words = description.split(' ');
        const shortWords = words.slice(0, 50);
        const shortDescription = shortWords.join(' ');
        return shortDescription;
    };

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
        get3RandomBlog(blogId).then(
            result=> {
                setRandomBlogList(result.blogList);
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
                        <div className="h1">{blog.title}</div>
                        <div className="h6"><span className="mb-3 d-block post-date">{formattedDate}</span></div>
                        <hr className="mb-3"/>
                        {/*<img src="/images/img_1.jpg" alt="" className="img-fluid mb-5 w-100"/>*/}
                        <Carousel showThumbs={false}>
                            {
                                imageList.map((img, index) => (
                                    <div key={index} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '600px'}}>
                                        <img src={img.imageData} alt="" style={{objectFit: 'contain'}}/>
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
            <div className="site-section bg-white">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 mx-auto text-center mb-1 section-heading">
                            <h1 className="mb-3">Các bài viết liên quan</h1>
                        </div>
                    </div>
                    {
                        randomBlogList.map(blog => (
                            <Link to={`/blog/${blog.blogId}`}>
                                <div className="row bg-light mb-5 pt-4" key={blog.blogId}>
                                    <div className="col-3">
                                        <div className="media-with-text">
                                            <div className="img-border-sm mb-4">
                                                <div className="popup-vimeo image-play">
                                                    <img src={blog.image} alt="" className="img-fluid"/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-9">
                                        <div className="media-with-text">
                                            <div className="h2 heading mb-0" style={{fontSize: '25px'}}>{blog.title}</div>
                                            <span
                                                className="mb-3 d-block post-date">{format(new Date(blog.createdDate), 'MMM do, yyyy')}</span>
                                            <p style={{color: '#00000080'}}>{getShortDescription(blog.description)}</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))
                    }
                </div>
            </div>
            <Footer/>
        </div>
    )

}

export default BlogDetail