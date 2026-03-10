import jwt from "jsonwebtoken"

// referrence: I add to change the code below to attach userId to  req object instead of req.body
// as doing that will equate to mutating request from the server which is wrong
const authMiddleware = async (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    return res.json({
      success: false,
      message: "Not Authorized... Please Login Again",
    });
  }

  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = token_decode.id; // attach to req instead
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export default authMiddleware