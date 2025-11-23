import { User } from "../models/userModel.js";
import jwt from "jsonwebtoken";


export const isAuthenticated = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization ;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];

    //  Use the synchronous version of verify
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check decoded content
//  console.log("User model:", User);
// console.log("Decoded data:", decoded);

    if (!decoded?.id) {
      return res.status(401).json({ message: "Token Doesnt Exist." });
    }

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: "Seems You are Not Logged In. " });
    }

    req.userId = user._id;
    next();

  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }
    return res.status(401).json({ message: error.message, "Message":"Token doesnt seems Valid." });
  }
};
