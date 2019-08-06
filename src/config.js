import process from "process";
import dotenv from "dotenv";

let env = process.env.ENV;

dotenv.config();

const configuration = {
  mongo: {
    uri: process.env.DATABASE_URI
  },
  secretkey: process.env.SECRET_KEY,
  mail: {
    email: process.env.ZOHO_EMAIL,
    password: process.env.ZOHO_PASSWORD
  },
  protocol: process.env.PROTOCOL
};

export default configuration;
