/* eslint-disable jsx-a11y/img-redundant-alt */
import bannerImg from '../assets/images/banner-img.png';
import shapeImg from '../assets/images/banner-shape.png';
import icon1Img from '../assets/images/icon-1.png';
import icon2Img from '../assets/images/icon-2.png';
import icon3Img from '../assets/images/icon-3.png';
import icon4Img from '../assets/images/icon-4.png';

const Home = () => {
    return (
        <div className="main-board">
            <section className="banner-area used-hight">
                <div className="d-table">
                    <div className="d-table-cell">
                        <div className="container">
                            <div className="banner-content">
                                <h1>We help the kids to grow up in the right way</h1>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>

                                <div className="banner-btn">
                                    <a href="/sign-in" className="btn btn-orange">
                                        Get Start
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="banner-img">
                    <img src={bannerImg} alt="Image" />
                </div>
                <div className="banner-shape-1">
                    <img src={shapeImg} alt="Image" />
                </div>
            </section>
            <section className="our-mission-area bg-f9fafb pt-100 pb-70">
                <div className="container">
                    <div className="section-title section-title-left">
                        <h2>Donate services to people in times of need</h2>
                    </div>

                    <div className="row justify-content-center">
                        <div className="col-lg-3 col-sm-6">
                            <div className="single-mission">
                                <img src={icon1Img} alt="Image" />
                                    <h3>Help child</h3>
                                    <p>Nulla porttitor accumsan tincidunt. Donec rutrum congue leo eget malesuada. Pellentesque in ipsum id orci porta.</p>
                            </div>
                        </div>

                        <div className="col-lg-3 col-sm-6">
                            <div className="single-mission">
                                <img src={icon2Img} alt="Image" />
                                    <h3>Safe housing</h3>
                                    <p>Nulla porttitor accumsan tincidunt. Donec rutrum congue leo eget malesuada. Pellentesque in ipsum id orci porta.</p>
                            </div>
                        </div>

                        <div className="col-lg-3 col-sm-6">
                            <div className="single-mission">
                                <img src={icon3Img} alt="Image" />
                                    <h3>Education</h3>
                                    <p>Nulla porttitor accumsan tincidunt. Donec rutrum congue leo eget malesuada. Pellentesque in ipsum id orci porta.</p>
                            </div>
                        </div>

                        <div className="col-lg-3 col-sm-6">
                            <div className="single-mission">
                                <img src={icon4Img} alt="Image" />
                                    <h3>Healthy food</h3>
                                    <p>Nulla porttitor accumsan tincidunt. Donec rutrum congue leo eget malesuada. Pellentesque in ipsum id orci porta.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="copy-right-area bg-f9fafb">
                <div className="container">
                    <p>
                        Copyright <span>&copy;</span> {new Date().getFullYear()} Donate
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Home;