import express from "express";
import Routes from "../constants/routes";
import { registerUser, verifyUser, login, passwordReset, updatePassword} from "../middlewares/auth";

const api = express.Router();

api.post(Routes.spel.auth.signin, login);

api.post(Routes.spel.auth.signup, registerUser);

api.put(Routes.spel.auth.verify, verifyUser);

api.post(Routes.spel.auth.password_reset_email_endpoint, passwordReset)

api.put(Routes.spel.auth.password_reset, updatePassword)

export default api;
