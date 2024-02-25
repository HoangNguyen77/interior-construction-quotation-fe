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
    const maSach = props.blog.blogId;

    const [imageList, setImageList] = useState([]);
    const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);
    const [baoLoi, setBaoLoi] = useState(null);

    useEffect(()=>{
            get1ImageOfABlog(maSach).then(
                imageData => {
                    setImageList(imageData);
                    setDangTaiDuLieu(false);
                }
            ).catch(
                error => {
                    setBaoLoi(error.message);
                }
            );
        },[] //chi goi 1 lan
    )
    let imageData="";
    if(imageList[0] && imageList[0].imageData){
        imageData=imageList[0].imageData;
    }
    const formattedDate = format(new Date(props.blog.createdDate), 'MMM do, yyyy');
    return(
        <div>
            <hr/>
            <Link to={`/blog/${props.blog.blogId}`}>
                <div className="row bg-white mb-5 pt-4">
                    <div className="col-3">
                        <div className="media-with-text">
                            <div className="img-border-sm mb-4">
                                <div className="popup-vimeo image-play">
                                    <img src={imageData} alt="" className="img-fluid"/>
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