import express from "express";

import Routes from "../constants/routes";
import {
  profileCreation,
  editProfile,
  getUser,
  getUserByEmail
} from "../middlewares/profile";
import routeProtector from "../middlewares/routeProtection";

const api = express.Router();

api.post(Routes.spel.profile.create, routeProtector, profileCreation);

api.get(Routes.spel.profile.by_email, routeProtector, getUserByEmail);

api.put(Routes.spel.profile.update, routeProtector, editProfile);

api.get(Routes.spel.profile.get, getUser);

export default api;
