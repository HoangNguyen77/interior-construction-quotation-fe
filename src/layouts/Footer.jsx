import React from "react";
function Footer(){
    return (
        // <footer classNameName="site-footer">
        //     <div classNameName="container">
        //
        //
        //         <div classNameName="row">
        //             <div classNameName="col-md-4">
        //                 <h3 classNameName="footer-heading mb-4 text-white">About</h3>
        //                 <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat quos rem ullam, placeat
        //                     amet.</p>
        //                 <p><a href="#" classNameName="btn btn-primary pill text-white px-4">Read More</a></p>
        //             </div>
        //             <div classNameName="col-md-6">
        //                 <div classNameName="row">
        //                     <div classNameName="col-md-6">
        //                         <h3 classNameName="footer-heading mb-4 text-white">Quick Menu</h3>
        //                         <ul classNameName="list-unstyled">
        //                             <li><a href="#">About</a></li>
        //                             <li><a href="#">Services</a></li>
        //                             <li><a href="#">Approach</a></li>
        //                             <li><a href="#">Sustainability</a></li>
        //                             <li><a href="#">News</a></li>
        //                             <li><a href="#">Careers</a></li>
        //                         </ul>
        //                     </div>
        //                     <div classNameName="col-md-6">
        //                         <h3 classNameName="footer-heading mb-4 text-white">Ministries</h3>
        //                         <ul classNameName="list-unstyled">
        //                             <li><a href="#">Children</a></li>
        //                             <li><a href="#">Women</a></li>
        //                             <li><a href="#">Bible Study</a></li>
        //                             <li><a href="#">Church</a></li>
        //                             <li><a href="#">Missionaries</a></li>
        //                         </ul>
        //                     </div>
        //                 </div>
        //             </div>
        //
        //
        //             <div classNameName="col-md-2">
        //                 <div classNameName="col-md-12"><h3 classNameName="footer-heading mb-4 text-white">Social Icons</h3>
        //                 </div>
        //                 <div classNameName="col-md-12">
        //                     <p>
        //                         <a href="#" classNameName="pb-2 pr-2 pl-0"><span classNameName="icon-facebook"></span></a>
        //                         <a href="#" classNameName="p-2"><span classNameName="icon-twitter"></span></a>
        //                         <a href="#" classNameName="p-2"><span classNameName="icon-instagram"></span></a>
        //                         <a href="#" classNameName="p-2"><span classNameName="icon-vimeo"></span></a>
        //
        //                     </p>
        //                 </div>
        //             </div>
        //         </div>
        //         <div classNameName="row pt-5 mt-5 text-center">
        //             <div classNameName="col-md-12">
        //                 <p>
        //                     Copyright &copy;
        //                     <script>document.write(new Date().getFullYear());</script>
        //                     All Rights Reserved | This template is made with <i classNameName="icon-heart text-primary"
        //                                                                         aria-hidden="true"></i> by <a
        //                     href="https://colorlib.com" target="_blank">Colorlib</a>
        //                 </p>
        //             </div>
        //
        //         </div>
        //     </div>
        // </footer>
        <footer className="site-footer">
            <div className="container">


                <div className="row">
                    <div className="col-md-3">
                        <h3 className="footer-heading mb-4 text-white">THÔNG TIN LIÊN HỆ</h3>
                        <ul className="list-unstyled">
                            <li><a href="https://maps.app.goo.gl/crYUEMsPVPEpWShn8" target="_blank"
                                   rel="noopener"><strong>Showroom:
                            </strong>Bau Chinh, Châu Đức, An Giang, Vietnam</a>
                            </li>
                            <li>
                                <p><strong>Thời gian làm việc: </strong></p>
                                <ul className="list-unstyled">
                                    <li>Thứ 2 đến CN: Từ 8h đến 17h</li>
                                    <li>Online: Hỗ trợ 24/7</li>
                                </ul>
                            </li>
                            <li>
                                <p><strong>Hotline:</strong> 0703 937 521</p>
                            </li>
                            <li>
                                <p><strong>Email:</strong> info@vivadecor.vn</p>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-6">
                        <div className="row">
                            <div className="col-md-6">
                                <h3 className="footer-heading mb-4 text-white">DỊCH VỤ NỔI BẬT</h3>
                                <ul className="list-unstyled">
                                    <li><a href="#">Thiết kế nội thất</a></li>
                                    <li><a href="#">Thiết kế nội thất chung cư</a></li>
                                    <li><a href="#">Thiết kế nội thất nhà phố</a></li>
                                    <li><a href="#">Thiết kế nội thất biệt thự</a></li>
                                    <li><a href="#">Thi công nội thất</a></li>
                                </ul>
                            </div>
                            <div className="col-md-6">
                                <h3 className="footer-heading mb-4 text-white">HỖ TRỢ KHÁCH HÀNG</h3>
                                <ul className="list-unstyled">
                                    <li><a href="#">Quy trình và Bảo hành</a></li>
                                    <li><a href="#">Chính sách trả góp</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>


                    <div className="col-md-3">
                        <div id="map-container-google-1" className="z-depth-1-half map-container col-md-12"
                             style={{height: "180px"}}>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3917.6022959697216!2d106.75237519999999!3d10.917799299999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174d9117c703c31%3A0xb2a5fe0807dfb425!2zTMOidSDEkMOgaSBUw6xuaCDDgWk!5e0!3m2!1sen!2s!4v1706720039704!5m2!1sen!2s"
                                width="400" height="300" style={{border:0}} allowFullScreen="" loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"></iframe>
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
                            <script>document.write(new Date().getFullYear());</script> All Rights Reserved | Website is made
                            with <i className="icon-heart text-primary" aria-hidden="true"></i> by <a
                            href="https://colorlib.com" target="_blank">Team 7</a>
                        </p>
                    </div>

                </div>
            </div>
        </footer>
    );
}
export default Footer