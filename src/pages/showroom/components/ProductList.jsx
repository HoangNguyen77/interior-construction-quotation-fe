import React, {useEffect, useRef, useState} from "react";
import {Link} from "react-router-dom";
import Pagination from "../../../utils/Pagination.jsx";
import {FaSearch} from "react-icons/fa";
import ProductProps from "./ProductProps.jsx";
import {getAllProducts, getProductByName} from "../../../api/blog/ProductAPI.jsx";
const ProductList = () => {
    const sectionRef = useRef(null);

    const [productList, setProductList] = useState([]);
    const [exception, setException] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const [currentSearch, setCurrentSearch] = useState("");
    const [search, setSearch] = useState("")

    useEffect(() => {
        if (search === ''){
            getAllProducts(currentPage - 1).then(
                result => {
                    setProductList(result.productList);
                    setTotalPages(result.totalPages);
                }
            ).catch(
                error => {
                    setException(error.message);
                }
            )
        }else{
            getProductByName(search).then(
                result => {
                    setProductList(result.productList);
                    setTotalPages(result.totalPages);
                }
            )
                .catch(
                    error => {
                        setException(error.message);
                    }
                )
        }

    }, [currentPage, search]);

    if(exception){
        return (
            <div>
                <h1>{exception}</h1>
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
                <div >
                    <div className="col-md-6 mx-auto text-center mb-5 ">
                        <h2 className="mb-5">Sản phẩm</h2>
                    </div>
                </div>
                <div className="form-inline mb-3">
                    <input className="form-control mr-sm-2" type="search" placeholder="Tìm kiếm" aria-label="Search"
                           value={currentSearch}
                           onChange={e => setCurrentSearch(e.target.value)}
                           onKeyDown={handleKeyDown}
                    />
                    <button className="btn btn-outline-dark my-2 my-sm-0" type="button" onClick={handleSearch}>
                        <FaSearch/></button>
                </div>

                <div className="row">
                    {productList.map((product, index) => (
                        <div key={product.productId} className="col-lg-4 col-md-6 mb-4">
                            <ProductProps product={product}/>
                        </div>
                    ))}
                </div>


                <Pagination currentPage={currentPage} totalPage={totalPages} handlePageChange={handlePageChange}/>
            </div>
        </div>

    )
        ;
}
export default ProductList