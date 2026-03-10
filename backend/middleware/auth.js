import jwt from "jsonwebtoken"
const authMiddleware = async (req, res, next) => {
    const {token} = req.headers
    if(!token){
        res.json({success: false, message: "Not Authorized... Please Login Again"})
    }
    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET)
        // we'll get the user_id stored in the token provided above then store it in the request body(req.body.userId)
        req.body.userId = token_decode.id
        next()
    } catch (error) {
        console.log(error)
        res.json({success: false, message: "Error"})
    }
}

export default authMiddleware