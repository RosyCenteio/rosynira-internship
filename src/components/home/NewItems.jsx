import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Skeleton from "../UI/Skeleton";
import { sliderSettings } from "../UI/SliderSettings";


const NewItems = () => {

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
  
    const fetchNewItems = async () => {
      setLoading(true);
      try {
        const response = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems");
        const data = response.data;
        setItems(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
  
      console.log("Fetched items:", items);
    };
  
    useEffect(() => {
      fetchNewItems();
    }, []);

    function getTimeLeft(date) {
      const now = new Date();
      const expiry = new Date(date);

      const diff = expiry - now;

      if (diff <= 0){
        return null;
      } 

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor(diff / (1000 * 60)) % 60;
      const seconds = Math.floor(diff / 1000) % 60;
      return`${hours}h ${minutes}m ${seconds}s`;
    }

    

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <Slider {...sliderSettings}>
             {items ?.map((item, index) => (
              !loading ? (
                  <div className="collection-slide" key={index}>
                    <div className="nft__item">
                      <div className="author_list_pp">
                        <Link
                          to={`/author/${item.authorId}`}
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title={`Creator: ${item.authorName}`}
                        >
                          <img className="lazy" src={item.authorImage} alt="" />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>

                     {getTimeLeft(item.expiryDate) && (
                      <div className="de_countdown">
                        {getTimeLeft(item.expiryDate)}
                      </div>
                    )}
 
                      <div className="nft__item_wrap">
                        <div className="nft__item_extra">
                          <div className="nft__item_buttons">
                            <button>Buy Now</button>
                            <div className="nft__item_share">
                              <h4>Share</h4>
                              <a href="" target="_blank" rel="noreferrer">
                                <i className="fa fa-facebook fa-lg"></i>
                              </a>
                              <a href="" target="_blank" rel="noreferrer">
                                <i className="fa fa-twitter fa-lg"></i>
                              </a>
                              <a href="">
                                <i className="fa fa-envelope fa-lg"></i>
                              </a>
                            </div>
                          </div>
                        </div>
                        <Link to="/item-details">
                          <img
                            src={item.nftImage}
                            className="lazy nft__item_preview"
                            alt=""
                          />
                        </Link>
                      </div>
                      <div className="nft__item_info">
                        <Link to="/item-details">
                          <h4>{item.title}</h4>
                        </Link>
                        <div className="nft__item_price">{item.price} ETH</div>
                        <div className="nft__item_like">
                          <i className="fa fa-heart"></i>
                          <span>{item.likes}</span>
                        </div>
                      </div>
                    </div>
                  </div>
              ) : (
                <Skeleton key={index} width="90%" height="300px" borderRadius="10px" marginBottom="20px"></Skeleton>
              )
            ))} 
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
