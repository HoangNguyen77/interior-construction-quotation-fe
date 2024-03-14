import React from "react";
import Header from "../../layouts/Header.jsx";
import Footer from "../../layouts/Footer.jsx";
import useScrollToTop from "../../utils/ScrollToTop.jsx";
import RawMaterialQuotePage from "./components/RawMaterialQuotePage.jsx";

function QuotationCalculator(){
    useScrollToTop()
    return(
        <div>
            <Header/>
            <div className="site-blocks-cover overlay" style={{backgroundImage: "url(images/hero_4.jpg)"}} data-aos="fade"
                 data-stellar-background-ratio="0.5">
                <div className="container">
                    <div className="row align-items-center justify-content-center">
                        <div className="col-md-7 text-center" data-aos="fade">
                            <span className="caption mb-3">VivaDecor</span>
                            <h1 className="mb-4">Báo giá</h1>
                        </div>
                    </div>
                </div>
            </div>

            <section className="m-4 my-4">
                <RawMaterialQuotePage />
            </section>

            <Footer/>
        </div>
    )
}
export default QuotationCalculator