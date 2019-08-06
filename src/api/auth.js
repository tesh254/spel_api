import express from "express";
import Routes from "../constants/routes";
import { registerUser, verifyUser, login } from "../middlewares/auth";

const api = express.Router();

// api.post(spel.social_auth)

api.post(Routes.spel.auth.signin, login);

api.post(Routes.spel.auth.signup, registerUser);

api.put(Routes.spel.auth.verify, verifyUser);

export default api;
