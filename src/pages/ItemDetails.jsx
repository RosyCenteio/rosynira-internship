import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";

const ItemDetails = () => {

  const id = useParams().id;
  const[item, setItem] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchItems = async () => {
    const result = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${id}`);
    const data = result.data;
    setItem(data);
    setLoading(false);
    console.log(data);
  }


  useEffect(() => {
    window.scrollTo(0, 0);
    fetchItems();
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                {loading ? (
                   <Skeleton width="480px" height="510px" borderRadius="2px" />
                ) : ( 
                <img
                  src={item.nftImage}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt=""
                />
                )}
              </div>
              <div className="col-md-6">
                <div className="item_info">
                    {loading ? (
                        <Skeleton width="460px" height="46px" borderRadius="2px" />
                    ) : (
                        <h2>{item.title} # {item.tag}</h2>
                    )}
                  <div className="item_info_counts">
                      {loading ? (
                        <Skeleton width="80px" height="24px" borderRadius="2px" />
                      ) : (
                        <div className="item_info_views">
                          <i className="fa fa-eye"></i>
                          {item.views}
                         </div>
                      )}
                      {loading ? (
                        <Skeleton width="80px" height="24px" borderRadius="2px" />
                      ) : (
                        <div className="item_info_like">
                          <i className="fa fa-heart"></i>
                          {item.likes}
                        </div>
                      )}
                  </div>
                  {loading ? (
                    <Skeleton width="100%" height="100px" borderRadius="2px" />
                  ) : (
                    <p>
                      {item.description}
                    </p>
                  )}
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          {loading ? (
                            <Skeleton width="50px" height="50px" borderRadius="50%" />
                          ) : (
                            <Link to={`/author/${item.ownerId}`}>
                              <img className="lazy" src={item.ownerImage} alt="" />
                              <i className="fa fa-check"></i>
                            </Link>
                          )}
                        </div>
                        <div className="author_list_info">
                          {loading ? (
                            <Skeleton width="100px" height="24px" borderRadius="2px" />
                          ) : (
                            <Link to={`/author/${item.ownerId}`}>{item.ownerName}</Link>
                          )}
                        </div>
                      </div>
                    </div>
                    <div></div>
                  </div>
                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      <h6>Creator</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          {loading ? (
                            <Skeleton width="50px" height="50px" borderRadius="50%" />
                          ) : (
                            <Link to={`/author/${item.creatorId}`}>
                              <img className="lazy" src={item.creatorImage} alt="" />
                              <i className="fa fa-check"></i>
                            </Link>
                          )}
                        </div>
                        <div className="author_list_info">
                          {loading ? (
                            <Skeleton width="100px" height="24px" borderRadius="2px" />
                          ) : (
                            <Link to={`/author/${item.creatorId}`}>{item.creatorName}</Link>
                          )}  
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    {loading ? (
                      <Skeleton width="80px" height="24px" borderRadius="2px" />
                    ) : (
                      <div className="nft-item-price">
                        <img src={EthImage} alt="" />
                        <span>{item.price}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
