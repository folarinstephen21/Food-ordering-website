import userModel from "../models/userModel.js";

// add items to user cart
const addToCart = async (req, res) => {
  try {
    const user = await userModel.findByIdAndUpdate(
      req.userId,
      { $inc: { [`cartData.${req.body.itemId}`]: 1 } },
      { returnDocument: "after" },
    );

    res.json({
      success: true,
      cartData: user.cartData,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// remove Items from user cart
const removeFromCart = async (req, res) => {
  try {
    const user = await userModel.findByIdAndUpdate(
      req.userId,
      { $inc: { [`cartData.${req.body.itemId}`]: -1 } },
      { returnDocument: "after" },
    );

    res.json({
      success: true,
      cartData: user.cartData,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// get user cart data
const getCart = async (req, res) => {
  try {
    const user = await userModel.findById(req.userId);

    res.json({
      success: true,
      cartData: user.cartData,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error getting cart" });
  }
};


export {
    addToCart,
    removeFromCart,
    getCart
}