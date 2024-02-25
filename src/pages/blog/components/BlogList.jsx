import React, {useEffect, useRef, useState} from "react";
import {Link} from "react-router-dom";
import {getAllBlog, getBlogByTitle} from "../../../api/blog/BlogAPI.js";
import BlogProps from "./BlogProps.jsx";
import Pagination from "../../../utils/Pagination.jsx";
import {FaSearch} from "react-icons/fa";
const BlogList = () => {
    const sectionRef = useRef(null);

    const [blogList, setBlogList] = useState([]);
    const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);
    const [baoLoi, setBaoLoi] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);

    const [currentSearch, setCurrentSearch] = useState("");
    const [search, setSearch] = useState("")

    useEffect(() => {
        if (search === ''){
            getAllBlog(currentPage - 1).then(
                result => {
                    setBlogList(result.blogList);
                    setTotalPage(result.totalPages);
                    setDangTaiDuLieu(false);
                }
            ).catch(
                error => {
                    setDangTaiDuLieu(false);
                    setBaoLoi(error.message);
                }
            )
        }else{
            getBlogByTitle(search).then(
                result => {
                    setBlogList(result.blogList);
                    setTotalPage(result.totalPages);
                    setDangTaiDuLieu(false);
                }
            )
            .catch(
                error => {
                    setDangTaiDuLieu(false);
                    setBaoLoi(error.message);
                }
            )
        }

    }, [currentPage, search]);

    if(dangTaiDuLieu){
        return (
            <div>
                <h1>Đang tải dữ liệu</h1>
            </div>
        );
    }
    if(baoLoi){
        return (
            <div>
                <h1>Gặp lỗi {baoLoi}</h1>
            </div>
        );
    }
    const handlePageChange = (page) => {
        sectionRef.current.scrollIntoView({behavior: 'smooth'});
        setCurrentPage(page);
    }
    const handleSearch = () => {
        setSearch(currentSearch);
        setCurrentPage(1); // Cập nhật currentPage về 1 sau khi tìm kiếm
    }
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            setSearch(event.target.value);
            handleSearch();
        }
    }

    return (
        <div className="site-section bg-light" ref={sectionRef}>
            <div className="container">
                <div className="form-inline mb-3">
                    <input className="form-control mr-sm-2" type="search" placeholder="Tìm kiếm blog" aria-label="Search"
                            value={currentSearch}
                            onChange={e => setCurrentSearch(e.target.value)}
                            onKeyDown={handleKeyDown}
                    />
                    <button className="btn btn-outline-dark my-2 my-sm-0" type="button" onClick={handleSearch}><FaSearch /></button>
                </div>
                {
                    blogList.map(blog => (
                        <BlogProps key={blog.blogId} blog={blog}/>
                    ))
                }
                <Pagination currentPage={currentPage} totalPage={totalPage} handlePageChange={handlePageChange}/>
            </div>
        </div>
    )
        ;
}
export default BlogList