import { createUser, verifyEmail, loginUser } from "../logic/auth";
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
  const token = req.params.token
  verifyEmail(token)
    .then(response => res.status(201).json({
      message: Messages.userVerification,
      user: response
    }))
    .catch(err => {
      next(err)
      res.status(400).json({...err})
    })
}

export const login = (req, res, next) => {
  loginUser(req.body)
    .then(response => res.status(200).json({...response}))
    .catch(err => {
      next(err)
      return res.status(err.status).json({...err})
    })
}
