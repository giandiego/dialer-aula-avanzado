import { verify } from "jsonwebtoken";
import Users from "../models/Users";

const auth = async (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    try {
      const token = req.header("Authorization").replace("Bearer ", "");
      const data = verify(token, process.env.JWT_KEY);
    
      const user = await Users.findOne({
        _id: data._id,
        "tokens.token": token,
      });
      if (!user) {
        throw new Error();
      }
      req.user = user;
      req.token = token;
      next();
    } catch (error) {
      console.log("ERROR 401 Token Middleware ");
      res.status(401).json({
        success: false,
        message: "No está autorizado para acceder a este recurso",
      });
    }
  } else {
    console.log("ERROR 403 Token Middleware");
    res.status(403).json({
      success: false,
      message: "No está autorizado para acceder a este recurso",
    });
  }
};
export default auth;
