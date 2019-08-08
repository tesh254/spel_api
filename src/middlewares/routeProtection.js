import jwt from "jsonwebtoken";

import config from "../config";
import User from "../models/user";

const authorize = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(403).json({
      auth: false,
      message: "Please login a user"
    });
  }
  jwt.verify(token, config.secretkey, (err, decoded) => {
    if (err)
      return res.status(500).json({
        auth: false,
        message: "Failed to authenticate"
      });

    User.findOne({ email: decoded.data }, { password: 0 }, (err, user) => {
      if (err)
        return res.status(500).json({
          exists: false,
          message: "Something went wrong in identifying you"
        });
      if (!user)
        return res.status(404).json({
          exists: false,
          message: "You are registered, please signup"
        });
      req.user = user;
      next();
    });
  });
};

export default authorize;
