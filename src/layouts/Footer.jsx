import React from "react";
function Footer(){
    return (
        <footer className="site-footer">
            <div className="container">


                <div className="row">
                    <div className="col-md-4">
                        <h3 className="footer-heading mb-4 text-white">About</h3>
                        <p>ViVaDecor là một trong những website thiết kế  nội thất hàng đầu và
                        hỗ trợ khách hàng bằng tất cả những gì có thể!</p>
                        <p><a href="/about" className="btn btn-primary pill text-white px-4">Read More</a></p>
                    </div>
                    <div className="col-md-6">
                        <div className="row">
                            <div className="col-md-6">
                                <h3 className="footer-heading mb-4 text-white">Quick Menu</h3>
                                <ul className="list-unstyled">
                                    <li><a href="#">About</a></li>
                                    <li><a href="#">Services</a></li>
                                    <li><a href="#">Approach</a></li>
                                    <li><a href="#">Sustainability</a></li>
                                    <li><a href="#">News</a></li>
                                    <li><a href="#">Careers</a></li>
                                </ul>
                            </div>
                            <div className="col-md-6">
                                <h3 className="footer-heading mb-4 text-white">Ministries</h3>
                                <ul className="list-unstyled">
                                    <li><a href="#">Children</a></li>
                                    <li><a href="#">Women</a></li>
                                    <li><a href="#">Bible Study</a></li>
                                    <li><a href="#">Church</a></li>
                                    <li><a href="#">Missionaries</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>


                    <div className="col-md-2">
                        <div className="col-md-12"><h3 className="footer-heading mb-4 text-white">Social Icons</h3>
                        </div>
                        <div className="col-md-12">
                            <p>
                                <a href="#" className="pb-2 pr-2 pl-0"><span className="icon-facebook"></span></a>
                                <a href="#" className="p-2"><span className="icon-twitter"></span></a>
                                <a href="#" className="p-2"><span className="icon-instagram"></span></a>
                                <a href="#" className="p-2"><span className="icon-vimeo"></span></a>

                            </p>
                        </div>
                    </div>
                </div>
                <div className="row pt-5 mt-5 text-center">
                    <div className="col-md-12">
                        <p>
                            Copyright &copy;
                            <script>document.write(new Date().getFullYear());</script>
                            All Rights Reserved | This template is made with <i className="icon-heart text-primary"
                                                                                aria-hidden="true"></i> by <a
                            href="https://colorlib.com" target="_blank">Colorlib</a>
                        </p>
                    </div>

                </div>
            </div>
        </footer>
    );
}
export default Footer