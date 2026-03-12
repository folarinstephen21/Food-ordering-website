import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const url = import.meta.env.VITE_API_URL;
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);

  const addToCart = async (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));

    if (token) {
      const res = await axios.post(
        url + "/api/cart/add",
        { itemId },
        { headers: { token } },
      );

      if (res.data.success) {
        setCartItems(res.data.cartData);
      }
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] - 1,
    }));

    if (token) {
      const res = await axios.post(
        url + "/api/cart/remove",
        { itemId },
        { headers: { token } },
      );

      if (res.data.success) {
        setCartItems(res.data.cartData);
      }
    }
  };

  const addCartTotal = () => {
    let sumTotalCartAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        sumTotalCartAmount += itemInfo.price * cartItems[item];
      }
    }

    return sumTotalCartAmount;
  };

  const fetchFoodList = async () => {
    const response = await axios.get(url + "/api/food/list");
    setFoodList(response.data.data);
  };

  const fetchCartItems = async () => {
    try {
      const res = await axios.post(url + "/api/cart/get", null, {
        headers: { token },
      });
      setCartItems(res.data.cartData);
    } catch (error) {
      console.log(error);
    }
  };
  // The useEffect below looks for token on local storage and if it finds it same will be used
  useEffect(() => {
    fetchFoodList();

    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    if (token) {
      fetchCartItems();
    }
  }, [token]);

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    addCartTotal,
    url,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
