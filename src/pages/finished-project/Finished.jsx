import React, {useEffect, useRef, useState} from "react";
import Header from "../../layouts/Header.jsx";
import Footer from "../../layouts/Footer.jsx";
import useScrollToTop from "../../utils/ScrollToTop.jsx";
import {Link} from "react-router-dom";
import {getFinishedProjectsByTitle} from "../../api/finished/FinishedProjectAPI.js";
import Pagination from "../../utils/Pagination.jsx";
import {FaSearch} from "react-icons/fa";
const Finished = () => {
    useScrollToTop();
    const sectionRef = useRef(null);

    const [projectList, setProjectList] = useState([]);
    const [totalPageProject, setTotalPageProject] = useState(0);
    const [currentPageProject, setCurrentPageProject] = useState(1);
    const [searchProject, setSearchProject] = useState("");
    const [currentSearchProject, setCurrentSearchProject] = useState("");

    const handlePageProjectChange = (page) => {
        setCurrentPageProject(page);
    }

    const formattedDate = (createdDate) => {
        const date = new Date(createdDate);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    useEffect(() => {
        sectionRef.current.scrollIntoView({behavior: 'auto'});
        getFinishedProjectsByTitle((currentPageProject - 1), searchProject, 6).then(
            result => {
                setProjectList(result.projectList);
                setTotalPageProject(result.totalPage);
            }
        )
        console.log(projectList);
    }, [currentPageProject, searchProject]);
    const handleSearch = () => {
        setSearchProject(currentSearchProject);
        setCurrentPageProject(1); // Cập nhật currentPage về 1 sau khi tìm kiếm
    }
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            setSearchProject(event.target.value);
            handleSearch();
        }
    }
    return(
        <div>
            <Header/>
            <div className="site-blocks-cover overlay" style={{backgroundImage: "url(images/hero_8.jpg)"}} data-aos="fade"
                 data-stellar-background-ratio="0.5">
                <div className="container">
                    <div className="row align-items-center justify-content-center">
                        <div className="col-md-7 text-center" data-aos="fade">
                            <span className="caption mb-3">VivaDecor</span>
                            <h1 className="mb-4">Dự Án Đã Thi Công</h1>
                        </div>
                    </div>
                </div>
            </div>


            <div className="site-section bg-light" ref={sectionRef}>
                <div className="container">
                    <div className="form-inline mb-5">
                        <input className="form-control mr-sm-2" type="search" placeholder="Tìm kiếm"
                               aria-label="Search"
                               value={currentSearchProject}
                               onChange={e => setCurrentSearchProject(e.target.value)}
                               onKeyDown={handleKeyDown}
                        />
                        <button className="btn btn-outline-dark my-2 my-sm-0" type="button" onClick={handleSearch}>
                            <FaSearch/></button>
                    </div>
                    <hr/>
                    <div className="row mt-3">
                        {
                            projectList.map(project => (
                                <div key={project.projectId} className="col-lg-4 col-md-6 mb-4">
                                    {/*style={{maxWidth: '300px', maxHeight: '250px', overflow: 'hidden', border: '1px solid #ccc'}}*/}
                                    {/*<div className="media-with-text" >*/}
                                    {/*    <div className="img-border-sm mb-4" >*/}
                                    {/*        <Link to={`/finished-project/detail-finished/${project.projectId}`}*/}
                                    {/*              className="popup-vimeo image-play">*/}
                                    {/*            /!*style={{minWidth: '100%', minHeight: "auto", display: 'block'}}*!/*/}
                                    {/*            <img src={project.image} alt="" className="img-fluid" />*/}
                                    {/*        </Link>*/}
                                    {/*    </div>*/}
                                    {/*    <div className="h2 heading mb-0"><a href="#">{project.title}</a></div>*/}
                                    {/*    <span*/}
                                    {/*        className="mb-3 d-block post-date">{formattedDate(project.finishedDate)}</span>*/}
                                    {/*</div>*/}
                                    <div className="hotel-room">
                                        <Link to={`/finished-project/detail-finished/${project.projectId}`} className="d-block mb-0 thumbnail" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px'}}>
                                            <img src={project.image} alt="Product" className="img-fluid" style={{objectFit: 'contain'}}/>
                                        </Link>
                                        <div className='hotel-room-body'>
                                            <h3 className="heading mb-0"><a href="#">{project.title}</a></h3>
                                            <p className="price">{formattedDate(project.finishedDate)}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <Pagination currentPage={currentPageProject} totalPage={totalPageProject}
                                handlePageChange={handlePageProjectChange}/>

                </div>
            </div>


            <Footer/>
        </div>
    )
}
export default Finished