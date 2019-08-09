import {
  createUser,
  verifyEmail,
  loginUser,
  sendResetEmail,
  handlePasswordReset
} from "../logic/auth";
import Messages from "../constants/messages";

export const registerUser = (req, res, next) => {
  const domain = req.protocol + "://" + req.get("host");
  req.body.domain = domain;
  req.body.username = req.body.username.toLowerCase();
  createUser(req.body)
    .then(response =>
      res.status(201).json({
        message: Messages.registrationSuccess,
        user: response
      })
    )
    .catch(err => {
      next(err);
      res.status(err.status).json(err);
    });
};

export const verifyUser = (req, res, next) => {
  const token = req.params.token;
  verifyEmail(token)
    .then(response =>
      res.status(201).json({
        message: Messages.userVerification,
        user: response
      })
    )
    .catch(err => {
      next(err);
      res.status(400).json({ ...err });
    });
};

export const login = (req, res, next) => {
  loginUser(req.body)
    .then(response => res.status(200).json({ ...response }))
    .catch(err => {
      next(err);
      res.status(err.status).json({ ...err });
    });
};

export const passwordReset = (req, res, next) => {
  sendResetEmail(req.body)
    .then(Res => res.status(200).json({ ...Res }))
    .catch(err => {
      next(err);
      res.status(err.status).json(err);
    });
};

export const updatePassword = (req, res, next) => {
  const data = {
    token: req.params.token,
    ...req.body
  }
  handlePasswordReset(data)
    .then(Res => res.status(201).json({...Res}))
    .catch(err => {
      next(err)
      res.status(err.status).json(err)
    })
};
