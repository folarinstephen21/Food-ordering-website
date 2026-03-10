import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";
import "./FoodDisplay.css";

import React, { useContext } from "react";

const FoodDisplay = ({ category, setCategory }) => {
  const { food_list } = useContext(StoreContext);

  return (
    <div>
      <div className="food-display" id="food-display">
        <div className="food-display-header">
          <h2>Top dishes near you</h2>
          {category !== "All" ? (
            <button onClick={() => setCategory("All")}>Show All</button>
          ) : (
            <></>
          )}
        </div>
        <div className="food-display-list">
          {food_list.length === 0 ? (
            <div>Content loading</div>
          ) : (
            food_list
              .filter(
                (item) => category === "All" || category === item.category,
              )
              .map((item, index) => (
                <FoodItem
                  key={index}
                  id={item._id}
                  name={item.name}
                  description={item.description}
                  price={item.price}
                  image={item.image}
                />
              ))
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodDisplay;
