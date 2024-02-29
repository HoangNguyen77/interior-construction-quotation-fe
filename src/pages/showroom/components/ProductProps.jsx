

import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {getFirstImageOfProduct} from "../../../api/product/ProductImageAPI.jsx";
import {FaSearch} from "react-icons/fa";

const ProductProps = (props) => {
    const productId = props.product.productId;

    const [imageList, setImageList] = useState([]);
    const [exception, setException] = useState(null);

    useEffect(()=>{
        getFirstImageOfProduct(productId).then(
                imageData => {
                    setImageList(imageData);
                }
            ).catch(
                error => {
                    setException(error.message);
                }
            );
        },[] //chi goi 1 lan
    )
    let imageData="";
    if(imageList[0] && imageList[0].imageData){
        imageData=imageList[0].imageData;
    }
    return(

            <Link to={`/product/${props.product.productId}`}>
                        <div className="hotel-room text-center">
                            <a href="#" className="d-block mb-0 thumbnail"><img src={imageData} alt="Product" className="img-fluid"/></a>
                            <div className='hotel-room-body'>
                                <h3 className="heading mb-0"><a href="#">{props.product.name}</a></h3>
                                <p className="price">Price: {props.product.unitPrice}</p>
                            </div>
                        </div>
            </Link>
    )
}
export default ProductProps

