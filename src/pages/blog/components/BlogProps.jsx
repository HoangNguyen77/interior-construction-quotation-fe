import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {format} from "date-fns";
import {get1ImageOfABlog} from "../../../api/blog/BlogImageAPI.js";
import MyComponent from "../../../component/MyComponent.jsx";

const getShortDescription = (description, maxLength = 70) => {
    if (description.length <= maxLength) {
        return description;
    } else {
        // Cắt giảm nội dung nếu độ dài vượt quá maxLength và thêm dấu ba chấm
        return description.slice(0, maxLength) + '...';
    }
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
                            <div className="img-border-sm mb-4" style={{maxHeight: '180px', overflow: 'hidden'}}>
                                <div className="d-block mb-0 thumbnail" style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: '180px'
                                }}>
                                    <img src={image} alt="" className="img-fluid"
                                         style={{maxWidth: '100%', height: 'auto', objectFit: 'cover'}}/>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="col-9">
                        <div className="media-with-text">
                            <h2 className="heading mb-0"
                                style={{fontSize: '25px'}}>{getShortDescription(props.blog.title)}</h2>
                            <span className="mb-3 d-block post-date">{formattedDate}</span>
                            <p style={{color: '#00000080'}}>
                            <MyComponent htmlContent={getShortDescription(props.blog.description)}/>
                                ...
                            </p>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}
export default BlogProps