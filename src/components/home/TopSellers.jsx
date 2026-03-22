import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Skeleton from "../UI/Skeleton";
 

const TopSellers = () => {

  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);


  const fetchTopSellers = async () => {
    setLoading(true);
    const result = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers");
    const data = result.data;
    setSellers(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchTopSellers();
  },[])


  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <ol className="author_list">
              {sellers.map((seller, index) => (
                !loading ? (
                <li key={index}>
                  <div className="author_list_pp">
                    <Link to="/author">
                      <img
                        className="lazy pp-author"
                        src={seller.authorImage}
                        alt=""
                      />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="author_list_info">
                    <Link to="/author">{seller.authorName}</Link>
                    <span>{seller.price} ETH</span>
                  </div>
                </li>
                ) :
                (
                <Skeleton key={index} width="80%" height="60px" borderRadius="10px" marginBottom="20px"></Skeleton>
                )
            ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
