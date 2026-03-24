import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import Skeleton from "../UI/Skeleton";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ExploreItems = ({explorePage,index, item, loading, onFilterChange, onLoadMore, visibleCount}) => {

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

    function getHtmlItem(item, index) {
      return (
        <div
        key={index}
        className={explorePage ? "d-item col-lg-3 col-md-6 col-sm-6 col-xs-12" : "collection-slide"}
        style={{ display: "block", backgroundSize: "cover" }}>
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
      </div>)
    }



  return (
    <>
      {explorePage &&
        <div>
          <select id="filter-items" defaultValue="" onChange={(e) => onFilterChange(e.target.value)}>
            <option value="">Default</option>
            <option value="price_low_to_high">Price, Low to High</option>
            <option value="price_high_to_low">Price, High to Low</option>
            <option value="likes_high_to_low">Most liked</option>
          </select>
        </div>
      }
      {!loading ? (
          explorePage ? item.slice(0, visibleCount).map((item, index) => getHtmlItem(item, index)) :  getHtmlItem(item, index)
          ) : (

          explorePage ? 
            item.slice(0, visibleCount).map((item, index)=> (
            <Skeleton key={index} width="228px" height="441px" borderRadius="10px" marginBottom="20px"></Skeleton>)
            ) : (
              <Skeleton key={index} width="228px" height="300px" borderRadius="10px" marginBottom="20px"></Skeleton>)
          )} 
        { explorePage && visibleCount < item.length && 
          <div className="col-md-12 text-center">
            <button onClick={onLoadMore} className="btn-main lead">
              Load more
            </button>
          </div>
        }
    </>
  );
};

export default ExploreItems;