import React, { useState, useEffect } from "react";
import axios from "axios";
import SubHeader from "../images/subheader.jpg";
import ExploreItems from "../components/explore/ExploreItems";

const Explore = () => {

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const explorePage = true;
    const [visibleCount, setVisibleCount] = useState(8);
    const loadMore = () => {
      setVisibleCount((prev) => prev + 4);
    };

  
    const fetchExplore = async () => {
      setLoading(true);
      try {
        const response = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/explore");
        const data = response.data;
        setItems(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
  
      console.log("Fetched items:", items);
    };


    const filterItems = async (filter) => {
      setLoading(true);
      try {
        const result = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filter}`
        );
        setItems(result.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
  };


  useEffect(() => {
    window.scrollTo(0, 0);
    fetchExplore();
  }, []);

  useEffect(() => {
    setVisibleCount(8);
  }, [items]);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="subheader"
          className="text-light"
          style={{ background: `url("${SubHeader}") top` }}
        >
          <div className="center-y relative text-center">
            <div className="container">
              <div className="row">
                <div className="col-md-12 text-center">
                  <h1>Explore</h1>
                </div>
                <div className="clearfix"></div>
              </div>
            </div>
          </div>
        </section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
                <ExploreItems explorePage={explorePage} item={items} loading={loading} onFilterChange={filterItems} onLoadMore={loadMore}
                  visibleCount={visibleCount}/>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Explore;
