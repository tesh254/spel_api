import express from "./node_modules/express";
import { spel } from "../constants/routes";

const api = express.Router();

api.post(spel.social_auth)

api.post(spel.signin)

api.post(spel.signup)

export default api;
