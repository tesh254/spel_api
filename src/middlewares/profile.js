import {
  createProfile,
  updateProfile,
  fetchUser,
  fetchUserByEmail
} from "../logic/profile";

export const profileCreation = (req, res, next) => {
  const data = {
    ...req.body,
    user: req.user
  };

  createProfile(data)
    .then(Res => {
      res.status(201).json(Res);
    })
    .catch(err => {
      next(err);
      res.status(err.status).json({ ...err });
    });
};

export const editProfile = (req, res, next) => {
  const data = {
    ...req.body,
    user: req.user
  };

  updateProfile(data)
    .then(Res => {
      res.status(201).json({ ...Res });
    })
    .catch(err => {
      next(err);
      res.status(err.status).json({ ...err });
    });
};

export const getUser = (req, res, next) => {
  const data = {
    user: {
      username: req.params.username
    }
  };

  fetchUser(data)
    .then(Res => {
      res.status(200).json({ ...Res });
    })
    .catch(err => {
      next(err);
      res.status(err.status).json({ ...err });
    });
};

export const getUserByEmail = (req, res, next) => {
  const data = {
    user: {
      email: req.params.email
    }
  };

  fetchUserByEmail(data)
    .then(Res => {
      res.status(200).json({ ...Res });
    })
    .catch(err => {
      next(err);
      res.status(err.status).json({ ...err });
    });
};
