import React, {useEffect} from "react";
import NFT from "../../images/nft.png";
import backgroundImage from "../../images/bg-shape-1.jpg";
import { Link } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';

const Landing = () => {

    useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);


  return (
    <section
      id="section-hero"
      aria-label="section"
      className="no-top no-bottom vh-100"
      data-bgimage="url(images/bg-shape-1.jpg) bottom"
      style={{ background: `url(${backgroundImage}) bottom / cover` }}
    >
      <div className="v-center">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6" data-aos="fade-right">
              <h6 data-aos="fade-up">
                <span className="text-uppercase id-color-2">
                  Ultraverse Market
                </span>
              </h6>
              <h1 data-aos="fade-up" data-aos-delay="200">
                Create, sell or collect digital items.
              </h1>
              <p className="lead" data-aos="fade-up" data-aos-delay="300">
                Unit of data stored on a digital ledger...
              </p>
              <Link
                className="btn-main lead"
                to="/explore"
                data-aos="fade-up"
                data-aos-delay="400">
                Explore
              </Link>
            </div>
            <div className="col-md-6 xs-hide" data-aos="fade-left">
              <img src={NFT} className="img-fluid" alt="" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
