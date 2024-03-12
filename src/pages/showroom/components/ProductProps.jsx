

import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {getFirstImageOfProduct} from "../../../api/product/ProductImageAPI.jsx";
import {FaSearch} from "react-icons/fa";

const ProductProps = (props) => {
    const productId = props.product.productId
    const [image, setImage] = useState("");

    useEffect(()=>{
        getFirstImageOfProduct(productId).then(
                imageData => {
                    setImage(imageData.imageData);
                }
            ).catch(
                error => {
                    console.log(error)
                }
            );
        },[] //chi goi 1 lan
    )
    return(

            <Link to={`/product/${props.product.productId}`}>
                        <div className="hotel-room text-center">
                            <a href="#" className="d-block mb-0 thumbnail" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px'}}>
                                <img src={image} alt="Product" className="img-fluid" style={{objectFit: 'contain'}}/>
                            </a>
                            <div className='hotel-room-body'>
                                <h3 className="heading mb-0"><a href="#">{props.product.name}</a></h3>
                                <p className="price">Price: {props.product.unitPrice}</p>
                            </div>
                        </div>
            </Link>
    )
}
export default ProductProps

