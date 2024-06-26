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
                                <h1>Connecting Donors with Those in Need</h1>
                                <p>Our platform allows donors to offer specific items and those in need to request donations anonymously. Let's make a difference together.</p>

                                <div className="banner-btn">
                                    <a href="/sign-in" className="btn btn-orange">
                                        Get Started
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="banner-img">
                    <img src={bannerImg} alt="Banner Image" />
                </div>
                <div className="banner-shape-1">
                    <img src={shapeImg} alt="Banner Shape" />
                </div>
            </section>
            <section className="our-mission-area bg-f9fafb pt-100 pb-70">
                <div className="container">
                    <div className="section-title section-title-left">
                        <h2>Our Mission: Bridging the Gap Between Donors and Recipients</h2>
                    </div>

                    <div className="row justify-content-center">
                        <div className="col-lg-3 col-sm-6">
                            <div className="single-mission">
                                <img src={icon1Img} alt="Helping Hand Icon" />
                                <h3>Help Children</h3>
                                <p>Your donations can provide essential items for children in need, ensuring they have the resources to grow and thrive.</p>
                            </div>
                        </div>

                        <div className="col-lg-3 col-sm-6">
                            <div className="single-mission">
                                <img src={icon2Img} alt="Housing Icon" />
                                <h3>Safe Housing</h3>
                                <p>Donate items that can help individuals and families secure safe and comfortable living conditions.</p>
                            </div>
                        </div>

                        <div className="col-lg-3 col-sm-6">
                            <div className="single-mission">
                                <img src={icon3Img} alt="Education Icon" />
                                <h3>Education Support</h3>
                                <p>Your contributions can provide educational materials and resources to those striving for a better future.</p>
                            </div>
                        </div>

                        <div className="col-lg-3 col-sm-6">
                            <div className="single-mission">
                                <img src={icon4Img} alt="Food Icon" />
                                <h3>Healthy Food</h3>
                                <p>Help ensure that everyone has access to nutritious food by donating non-perishable items and other essentials.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="copy-right-area">
                <div className="container">
                    <p>
                        Copyright <span>&copy;</span> {new Date().getFullYear()} ConnectDonate
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Home;
