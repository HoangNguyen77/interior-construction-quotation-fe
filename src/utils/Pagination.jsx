import React from "react";

export const Pagination = (props) => {
    const isFirstPage = props.currentPage === 1;
    const isLastPage = props.currentPage === props.totalPage;

    const handlePrevPage = () => {
        if (!isFirstPage) {
            props.handlePageChange(props.currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (!isLastPage) {
            props.handlePageChange(props.currentPage + 1);
        }
    };

    const pageList = [];
    if (props.currentPage === 1) {
        pageList.push(props.currentPage);
        if (props.totalPage >= props.currentPage + 1) {
            pageList.push(props.currentPage + 1);
        }
        if (props.totalPage >= props.currentPage + 2) {
            pageList.push(props.currentPage + 2);
        }
    } else if (props.currentPage > 1) {
        if (props.currentPage >= 3) {
            pageList.push(props.currentPage - 2);
        }
        if (props.totalPage >= 2) {
            pageList.push(props.currentPage - 1);
        }
        pageList.push(props.currentPage);
        if (props.totalPage >= props.currentPage + 1) {
            pageList.push(props.currentPage + 1);
        }
        if (props.totalPage >= props.currentPage + 2) {
            pageList.push(props.currentPage + 2);
        }
    }

    return (
        <div className="row mt-5">
            <div className="col-md-12 text-center">
                <div className="site-block-27">
                    <ul>
                        <li onClick={handlePrevPage} >
                            <a style={{cursor: isFirstPage ? "default" : "pointer"}}>&lt;</a>
                        </li>
                        {pageList.map((page, index) => (
                            <li key={index} className={props.currentPage === page ? 'active' : ''}
                                onClick={() => props.handlePageChange(page)} style={{cursor: "pointer"}}>
                                <a>{page}</a>
                            </li>
                        ))}
                        <li onClick={handleNextPage} >
                            <a style={{cursor: isLastPage ? "default" : "pointer"}}>&gt;</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Pagination;
