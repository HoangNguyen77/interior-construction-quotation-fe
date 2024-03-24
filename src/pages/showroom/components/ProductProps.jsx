

import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {getFirstImageOfProduct} from "../../../api/product/ProductImageAPI.jsx";
import {FaSearch} from "react-icons/fa";
const getShortDescription = (description) => {
    const words = description.split(' ');
    const shortWords = words.slice(0, 30);
    const shortDescription = shortWords.join(' ');
    return shortDescription;
};
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

        // eslint-disable-next-line react/prop-types
            <Link to={`/product/${props.product.productId}`}>
                        <div className="hotel-room text-center">
                            <a href="#" className="d-block mb-0 thumbnail" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px'}}>
                                <img src={image} alt="Product" className="img-fluid" style={{objectFit: 'contain'}}/>
                            </a>
                            <div className='hotel-room-body'>
                                <h3 className="heading mb-0"><a href="#">{getShortDescription(props.product.name)}</a></h3>
                            </div>
                        </div>
            </Link>
    )
}
export default ProductProps

