import React, {useEffect, useRef, useState} from "react";
import {Link, useParams} from "react-router-dom";
import Header from "../../layouts/Header.jsx";
import Footer from "../../layouts/Footer.jsx";
import useScrollToTop from "../../utils/ScrollToTop.jsx";

function EnableAccount(){
    useScrollToTop()
    const { email } = useParams();
    const { enableCode } = useParams();
    const [enable, setEnable] = useState(false);
    const [announcement, setAnnouncement] = useState("");
    const sectionRef = useRef(null);
    useEffect(()=>{
        sectionRef.current.scrollIntoView({behavior: 'smooth'});
        if(email && enableCode){
            activate();
        }
    }, []);

    const activate = async() =>{
        try {
            const url = `http://localhost:8080/user/enable?email=${email}&enableCode=${enableCode}`;
            const response = await fetch(url,  {method: "GET"} );

            if(response.ok){
                setEnable(true);
            }else{
                const data = await response.json();
                console.log(data)
                setAnnouncement(data.content);
            }
        } catch (error) {
        }
    }
    return (
        <div>
            <Header/>
            <div className="site-blocks-cover overlay" style={{backgroundImage: 'url(/images/hero_1.jpg)'}}
                 data-aos="fade"
                 data-stellar-background-ratio="0.5">
                <div className="container">
                    <div className="row align-items-center justify-content-center">
                        <div className="col-md-9 text-center" data-aos="fade">
                            <h1 className="mb-2">Welcome To VivaDecor</h1>
                            <h2 className="caption">Interior Construction Quotation</h2>
                        </div>
                    </div>
                </div>
            </div>
            <div className="site-section bg-light" style={{paddingBottom:'200px'}} ref={sectionRef}>
                <div className="container text-center">
                    <h1>Kích hoạt tài khoản</h1>
                    {
                        enable ? (<p> Tài khoản đã kích hoạt thành công, bạn hãy <Link to="/login" style={{color: "red"}}>đăng
                                nhập</Link> để tiếp tục sử dụng dịch vụ!</p>) :
                            (
                                <p>{announcement}</p>
                            )
                    }
                    {
                        !enable &&
                        <div className="btn btn-success"><Link to="/" style={{color: "white"}}>Trang chủ</Link></div>
                    }
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default EnableAccount