import React, {useEffect, useRef} from "react";
import Header from "../../layouts/Header.jsx";
import Footer from "../../layouts/Footer.jsx";
import useScrollToTop from "../../utils/ScrollToTop.jsx";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import {Link} from "react-router-dom";

function BlogDetail() {
    useScrollToTop();
    const sectionRef = useRef(null);
    useEffect(() => {
        sectionRef.current.scrollIntoView({behavior: 'smooth'});
    }, []);
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
                        <h1>Lorem Ipsum Dolor Sit Amet</h1>
                        <h6><span className="mb-3 d-block post-date">Dec 20th, 2018 &bullet; By <a
                            href="#">Admin</a></span></h6>
                        <hr/>
                        {/*<img src="/images/img_1.jpg" alt="" className="img-fluid mb-5 w-100"/>*/}
                        <Carousel showThumbs={false}>
                            <div>
                                <img src="/images/img_1.jpg" alt=""/>
                            </div>
                            <div>
                                <img src="/images/img_2.jpg" alt=""/>
                            </div>
                            <div>
                                <img src="/images/img_3.jpg" alt=""/>
                            </div>
                        </Carousel>
                        <p style={{fontSize: "large", color: "black"}} className="text-justify mt-5">Lorem ipsum dolor sit
                            amet consectetur adipisicing elit. Optio dolores culpa qui
                            aliquam placeat nobis veritatis tempora natus rerum obcaecati. Lorem ipsum dolor sit amet
                            consectetur adipisicing elit. Optio dolores culpa qui
                            aliquam placeat nobis veritatis tempora natus rerum obcaecati. Lorem ipsum dolor sit amet
                            consectetur adipisicing elit. Optio dolores culpa qui
                            aliquam placeat nobis veritatis tempora natus rerum obcaecati. Lorem ipsum dolor sit amet
                            consectetur adipisicing elit. Optio dolores culpa qui
                            aliquam placeat nobis veritatis tempora natus rerum obcaecati. Lorem ipsum dolor sit amet
                            consectetur adipisicing elit. Optio dolores culpa qui
                            aliquam placeat nobis veritatis tempora natus rerum obcaecati. Lorem ipsum dolor sit amet
                            consectetur adipisicing elit. Optio dolores culpa qui
                            aliquam placeat nobis veritatis tempora natus rerum obcaecati. Lorem ipsum dolor sit amet
                            consectetur adipisicing elit. Optio dolores culpa qui
                            aliquam placeat nobis veritatis tempora natus rerum obcaecati. Lorem ipsum dolor sit amet
                            consectetur adipisicing elit. Optio dolores culpa qui
                            aliquam placeat nobis veritatis tempora natus rerum obcaecati. Lorem ipsum dolor sit amet
                            consectetur adipisicing elit. Optio dolores culpa qui
                            aliquam placeat nobis veritatis tempora natus rerum obcaecati. Lorem ipsum dolor sit amet
                            consectetur adipisicing elit. Optio dolores culpa qui
                            aliquam placeat nobis veritatis tempora natus rerum obcaecati. Lorem ipsum dolor sit amet
                            consectetur adipisicing elit. Optio dolores culpa qui
                            aliquam placeat nobis veritatis tempora natus rerum obcaecati. Lorem ipsum dolor sit amet
                            consectetur adipisicing elit. Optio dolores culpa qui
                            aliquam placeat nobis veritatis tempora natus rerum obcaecati. Lorem ipsum dolor sit amet
                            consectetur adipisicing elit. Optio dolores culpa qui
                            aliquam placeat nobis veritatis tempora natus rerum obcaecati. Lorem ipsum dolor sit amet
                            consectetur adipisicing elit. Optio dolores culpa qui
                            aliquam placeat nobis veritatis tempora natus rerum obcaecati.

                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio dolores culpa qui
                            aliquam placeat nobis veritatis tempora natus rerum obcaecati. Lorem ipsum dolor sit amet
                            consectetur adipisicing elit. Optio dolores culpa qui
                            aliquam placeat nobis veritatis tempora natus rerum obcaecati. Lorem ipsum dolor sit amet
                            consectetur adipisicing elit. Optio dolores culpa qui
                            aliquam placeat nobis veritatis tempora natus rerum obcaecati. Lorem ipsum dolor sit amet
                            consectetur adipisicing elit. Optio dolores culpa qui
                            aliquam placeat nobis veritatis tempora natus rerum obcaecati. Lorem ipsum dolor sit amet
                            consectetur adipisicing elit. Optio dolores culpa qui
                            aliquam placeat nobis veritatis tempora natus rerum obcaecati. Lorem ipsum dolor sit amet
                            consectetur adipisicing elit. Optio dolores culpa qui
                            aliquam placeat nobis veritatis tempora natus rerum obcaecati. Lorem ipsum dolor sit amet
                            consectetur adipisicing elit. Optio dolores culpa qui
                            aliquam placeat nobis veritatis tempora natus rerum obcaecati.
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