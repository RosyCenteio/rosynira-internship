import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";

const Author = () => {
  const id = useParams().id;

  const [author, setAuthor] = useState({});
  const [collection, setCollection] = useState([]);
  const [followers, setFollowers] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);
  const[loading, setLoading] = useState(true);

  const fetchAuthor = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`
      );
      setAuthor(response.data);
      setCollection(response.data.nftCollection);
      setLoading(false);
      console.log("collection: "+ response.data.nftCollection);
    } catch (error) {
      console.error("Error fetching author:", error);
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchAuthor();
  }, []);

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    setFollowers(isFollowing ? followers - 1 : followers + 1);
  };

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage={`url(${AuthorBanner}) top`}
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      {loading ? (
                        <Skeleton width="150px" height="150px" borderRadius="50%" />
                        ) : ( 
                            <img src={ author.authorImage} alt="" />
                        )
                      }
                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {loading ? 
                            (<Skeleton width="100px" height="20px" borderRadius="5px" /> )
                            : 
                            (author.authorName)
                          }

                          <span className="profile_username">
                            {loading ? 
                            (<Skeleton width="80px" height="15px" borderRadius="5px" />)
                             :
                            `@${author.tag}`
                          }
                          </span> 
                          
                          <span id="wallet" className="profile_wallet">
                          {loading ? (
                            <Skeleton width="150px" height="15px" />
                          ) : (
                            author.address
                          )}
                        </span>
                                                  
                          <button id="btn_copy" title="Copy Text">
                            Copy
                          </button>
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <div className="profile_follower">
                        {loading ? (
                          <Skeleton width="100px" height="20px" borderRadius="5px" />
                        ) : (
                          `${author.followers + followers} followers`
                        )}
                      </div>
                      <button to="#" className="btn-main" onClick={handleFollow}>
                        {isFollowing ? "Unfollow" : "Follow"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  {author.nftCollection && (
                      <AuthorItems  items={collection} authorImage={author.authorImage} loading={loading} /> 
                  )}
                  
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
