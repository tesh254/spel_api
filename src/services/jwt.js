import config from "../config";
import jwt from "jsonwebtoken";

export const jwtSignature = payload => {
  return jwt.sign(
    {
      data: payload
    },
    config.secretkey
  );
};

export const jwtVerify = token => {
  try {
    return jwt.verify(token, config.secretkey, (err, decoded) => {
      if (err) {
        throw {
          error: err.name,
          message: `Invalid token kindly, try again later`,
          status: 400
        };
      } else {
        return decoded.data;
      }
    });
  } catch (err) {
    throw {
      error: err.name,
      message: err.message,
      status: 400
    };
  }
};

export const loginJwt = payload => {
  return jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
      data: payload
    },
    config.secretkey
  );
};

export const refreshToken = payload => {
  return jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * 3600,
      data: payload
    },
    config.secretkey
  );
};
