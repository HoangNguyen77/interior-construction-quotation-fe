import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {format} from "date-fns";
import {get1ImageOfABlog} from "../../../api/blog/BlogImageAPI.js";

const getShortDescription = (description) => {
    const words = description.split(' ');
    const shortWords = words.slice(0, 50);
    const shortDescription = shortWords.join(' ');
    return shortDescription;
};
const BlogProps = (props) => {
    const blogId = props.blog.blogId;

    const [image, setImage] = useState("");
    const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);
    const [baoLoi, setBaoLoi] = useState(null);

    useEffect(()=>{
            get1ImageOfABlog(blogId).then(
                imageData => {
                    setImage(imageData.imageData);
                    setDangTaiDuLieu(false);
                }
            ).catch(
                error => {
                    setBaoLoi(error.message);
                }
            );
        },[] //chi goi 1 lan
    )

    const formattedDate = (createdDate) => {
        const date = new Date(createdDate);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };
    return(
        <div>
            <hr/>
            <Link to={`/blog/${props.blog.blogId}`}>
                <div className="row bg-white mb-5 pt-4">
                    <div className="col-3">
                        <div className="media-with-text">
                            <div className="img-border-sm mb-4">
                                <div className="popup-vimeo image-play">
                                    <img src={image} alt="" className="img-fluid"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-9">
                        <div className="media-with-text">
                            <h2 className="heading mb-0" style={{fontSize: '25px'}}>{props.blog.title}</h2>
                            <span className="mb-3 d-block post-date">{formattedDate}</span>
                            <p style={{color: '#00000080'}}>{getShortDescription(props.blog.description)}...</p>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}
export default BlogProps