import React, {useEffect, useRef} from "react";
import Header from "../../layouts/Header.jsx";
import Footer from "../../layouts/Footer.jsx";
import useScrollToTop from "../../utils/ScrollToTop.jsx";
import {Link} from "react-router-dom";
function Blog(){
    const sectionRef = useRef(null);
    useEffect(() => {
        sectionRef.current.scrollIntoView({behavior: 'smooth'});
    }, []);
    const handlePageChange = () => {
        sectionRef.current.scrollIntoView({behavior: 'smooth'});
    }
    return(
        <div>
            <Header/>
            <div className="site-blocks-cover overlay" style={{backgroundImage: "url(/images/hero_1.jpg)"}} data-aos="fade"
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


            <div className="site-section" ref={sectionRef}>
                <div className="container">
                    <div className="row">
                        <div className="col-3 mb-5">
                            <div className="media-with-text">
                                <div className="img-border-sm mb-4">
                                    <Link to="/blog/1" className="popup-vimeo image-play">
                                        <img src="/images/img_1.jpg" alt="" className="img-fluid"/>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-9 mb-5">
                            <div className="media-with-text">
                                <h2 className="heading mb-0"><a href="#">Lorem Ipsum Dolor Sit Amet</a></h2>
                                <span className="mb-3 d-block post-date">Dec 20th, 2018 &bullet; By <a
                                    href="#">Admin</a></span>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio dolores culpa qui
                                    aliquam placeat nobis veritatis tempora natus rerum obcaecati.</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3 mb-5">
                            <div className="media-with-text">
                                <div className="img-border-sm mb-4">
                                    <Link to="/blog/1" className="popup-vimeo image-play">
                                        <img src="/images/img_1.jpg" alt="" className="img-fluid"/>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-9 mb-5">
                            <div className="media-with-text">
                                <h2 className="heading mb-0"><a href="#">Lorem Ipsum Dolor Sit Amet</a></h2>
                                <span className="mb-3 d-block post-date">Dec 20th, 2018 &bullet; By <a
                                    href="#">Admin</a></span>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio dolores culpa qui
                                    aliquam placeat nobis veritatis tempora natus rerum obcaecati.</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3 mb-5">
                            <div className="media-with-text">
                                <div className="img-border-sm mb-4">
                                    <Link to="/blog/1" className="popup-vimeo image-play">
                                        <img src="/images/img_1.jpg" alt="" className="img-fluid"/>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-9 mb-5">
                            <div className="media-with-text">
                                <h2 className="heading mb-0"><a href="#">Lorem Ipsum Dolor Sit Amet</a></h2>
                                <span className="mb-3 d-block post-date">Dec 20th, 2018 &bullet; By <a
                                    href="#">Admin</a></span>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio dolores culpa qui
                                    aliquam placeat nobis veritatis tempora natus rerum obcaecati.</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3 mb-5">
                            <div className="media-with-text">
                                <div className="img-border-sm mb-4">
                                    <Link to="/blog/1" className="popup-vimeo image-play">
                                        <img src="/images/img_1.jpg" alt="" className="img-fluid"/>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-9 mb-5">
                            <div className="media-with-text">
                                <h2 className="heading mb-0"><a href="#">Lorem Ipsum Dolor Sit Amet</a></h2>
                                <span className="mb-3 d-block post-date">Dec 20th, 2018 &bullet; By <a
                                    href="#">Admin</a></span>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio dolores culpa qui
                                    aliquam placeat nobis veritatis tempora natus rerum obcaecati.</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3 mb-5">
                            <div className="media-with-text">
                                <div className="img-border-sm mb-4">
                                    <Link to="/blog/1" className="popup-vimeo image-play">
                                        <img src="/images/img_1.jpg" alt="" className="img-fluid"/>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-9 mb-5">
                            <div className="media-with-text">
                                <h2 className="heading mb-0"><a href="#">Lorem Ipsum Dolor Sit Amet</a></h2>
                                <span className="mb-3 d-block post-date">Dec 20th, 2018 &bullet; By <a
                                    href="#">Admin</a></span>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio dolores culpa qui
                                    aliquam placeat nobis veritatis tempora natus rerum obcaecati.</p>
                            </div>
                        </div>
                    </div>


                    <div className="row">
                        <div className="col-md-12 text-center">
                            <div className="site-block-27">
                                <ul>

                                    <li onClick={handlePageChange} style={{cursor: "pointer"}}>
                                        <a>&lt;</a></li>
                                    <li className="active" onClick={handlePageChange} style={{cursor: "pointer"}}>
                                        <a>1</a></li>
                                    <li onClick={handlePageChange} style={{cursor: "pointer"}}>
                                        <a>2</a></li>
                                    <li onClick={handlePageChange} style={{cursor: "pointer"}}>
                                        <a>3</a></li>
                                    <li onClick={handlePageChange} style={{cursor: "pointer"}}>
                                        <a>4</a></li>
                                    <li onClick={handlePageChange} style={{cursor: "pointer"}}>
                                        <a>5</a></li>
                                    <li onClick={handlePageChange} style={{cursor: "pointer"}}>
                                        <a>&gt;</a></li>
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

export default Blog