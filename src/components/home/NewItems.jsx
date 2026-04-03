import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { sliderSettings } from "../UI/SliderSettings";
import ExploreItems from "../explore/ExploreItems";
import Skeleton from "../UI/Skeleton";




const NewItems = () => {

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const explorePage = false;
  
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
            {
              loading ? (
                Array(4).fill(0).map((_, index) => (
                  <Skeleton key={index} width="240.81px" height="441px" borderRadius="10px" marginBottom="20px"></Skeleton>)
                )
              ) : (
              items ?.map((item, index) => (
                <ExploreItems key={index} explorePage={explorePage} item={item} loading={loading}/>
              )))
            }
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
