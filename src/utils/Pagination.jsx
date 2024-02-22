import React from "react";

export const Pagination = (props) => {
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
        danhSachTrang.push(props.currentPage);
        if (props.totalPage >= props.currentPage + 1) {
            pageList.push(props.currentPage + 1);
        }
        if (props.totalPage >= props.currentPage + 2) {
            pageList.push(props.currentPage + 2);
        }
    }
    return (
        // <nav aria-label="...">
        //     <ul className="pagination">
        //         <li className="page-item" onClick={() => props.paging(1)}>
        //             <button className="page-link">
        //                 Trang đầu
        //             </button>
        //         </li>
        //         {
        //             pageList.map(page => (
        //                 <li className="page-item" key={page} onClick={() => props.paging(page)}>
        //                     <button className={"page-link " + (props.currentPage === page ? "active" : "")}>
        //                         {page}
        //                     </button>
        //                 </li>
        //             ))
        //         }
        //         <li className="page-item" onClick={() => props.paging(props.totalPage)}>
        //             <button className="page-link">Trang cuối</button>
        //         </li>
        //     </ul>
        // </nav>
        <div className="row mt-5">
            <div className="col-md-12 text-center">
                <div className="site-block-27">
                    <ul>
                        <li><a href="#">&lt;</a></li>
                        <li className="active"><span>1</span></li>
                        <li><a href="#">2</a></li>
                        <li><a href="#">3</a></li>
                        <li><a href="#">4</a></li>
                        <li><a href="#">5</a></li>
                        <li><a href="#">&gt;</a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}