import React, {useEffect, useRef, useState} from "react";
import Header from "../../layouts/Header.jsx";
import Footer from "../../layouts/Footer.jsx";
import useScrollToTop from "../../utils/ScrollToTop.jsx";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import {Link, useParams} from "react-router-dom";
import {getAllProductImages} from "../../api/product/ProductImageAPI.jsx";
import {getProductById, getProductRequestById} from "../../api/product/ProductAPI.jsx";

const ProductDetail = () => {
    useScrollToTop();
    const sectionRef = useRef(null);
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [imageList, setImageList] = useState([]);
    const [exception, setException] = useState(null);

    useEffect(() => {
        getProductRequestById(productId).then(product => {
            setProduct(product);
            console.log(product);
            if (sectionRef.current) {
                sectionRef.current.scrollIntoView({ behavior: 'smooth' });
            }
        }).catch(error => {
            console.log(error);
            setException(error.toString());
        });
        getAllProductImages(productId).then(
            imageList => {
                setImageList(imageList);
            }
        ).catch(error => console.log(error));
        // getRelatedProductsByRoomId(roomId).then(
        //     response => {
        //         setRelatedProductsList(response.productList);
        //     })
        //     .catch(error => {
        //         console.error("Error fetching related products:", error);
        //     });
    }, [productId]);

    if (exception) {
        return <div><h1>{productId}</h1></div>;
    }
    if (!product) {
        return <div><h1>Sản phẩm không tồn tại!</h1></div>;
    }

    return(
        <div>
            <Header/>
            <div className="site-blocks-cover overlay " style={{backgroundImage: "url(/images/hero_4.jpg)"}}
                 data-aos="fade"
                 data-stellar-background-ratio="0.5">
                <div className="container">
                    <div className="row align-items-center justify-content-center">
                        <div className="col-md-7 text-center" data-aos="fade">
                            <h1 className="mb-4">Showroom</h1>
                        </div>
                    </div>
                </div>
            </div>
            <div className="site-section bg-light" ref={sectionRef}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-8">
                            <Carousel showThumbs={true}>
                                {imageList.map((img, index) => (
                                    <div key={index} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '600px'}}>
                                        <img src={img.imageData} alt="" style={{objectFit: 'contain'}}/>
                                    </div>
                                ))}
                            </Carousel>
                        </div>


                        <div className="col-md-4">
                            <div className='h2'>{product.name}</div>
                            <hr/>
                            <p className="text-justify mt-3 ">Kích thước sản phẩm</p>
                            <p className="text-justify mt-1 h5">{product.width} x {product.length} x {product.height}</p>
                            <p className="text-justify mt-1 ">{product.typeName}</p>
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

                    <Link to="/product" className="p-2" style={{fontSize: '50px'}}><span
                        className="icon-arrow-circle-left"></span></Link>
                </div>
            </div>

            <Footer/>
        </div>
    )

}

export default ProductDetail