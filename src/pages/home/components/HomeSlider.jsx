import React from "react";
function HomeSlider(){
    return (
        <div className="slide-one-item home-slider owl-carousel">

            <div className="site-blocks-cover overlay" style={{backgroundImage: 'url(images/hero_1.jpg)'}}
                 data-aos="fade"
                 data-stellar-background-ratio="0.5">
                <div className="container">
                    <div className="row align-items-center justify-content-center">
                        <div className="col-md-7 text-center" data-aos="fade">

                            <h1 className="mb-2">Welcome To Suites</h1>
                            <h2 className="caption">Hotel &amp; Resort</h2>
                        </div>
                    </div>
                </div>
            </div>

            <div className="site-blocks-cover overlay" style={{backgroundImage: 'url(images/hero_2.jpg)'}}
                 data-aos="fade"
                 data-stellar-background-ratio="0.5">
                <div className="container">
                    <div className="row align-items-center justify-content-center">
                        <div className="col-md-7 text-center" data-aos="fade">
                            <h1 className="mb-2">Unique Experience</h1>
                            <h2 className="caption">Enjoy With Us</h2>
                        </div>
                    </div>
                </div>
            </div>

            <div className="site-blocks-cover overlay" style={{backgroundImage: 'url(images/hero_3.jpg)'}}
                 data-aos="fade"
                 data-stellar-background-ratio="0.5">
                <div className="container">
                    <div className="row align-items-center justify-content-center">
                        <div className="col-md-7 text-center" data-aos="fade">
                            <h1 className="mb-2">Relaxing Room</h1>
                            <h2 className="caption">Your Room, Your Stay</h2>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
export default HomeSlider