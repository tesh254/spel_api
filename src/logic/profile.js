import valid from "validator";

import User from "../models/user";
import Profile from "../models/profile";
import Messages from "../constants/messages";

export const createProfile = async data => {
  // validation
  const user = await User.findOne(
    { username: data.user.username },
    { username: -1, email: -1, name: -1, avatar: -1 }
  );
  if (user) {
    const profile = await Profile.findOne({ user: user._id });
    if (!profile) {
      data.user = data.user._id;
      const profile = new Profile(data);

      await profile.save();

      return {
        message: Messages.profileCreation,
        profile: profile,
        user: user
      };
    } else {
      data.user = data.user._id;
      return updateProfile(data);
    }
  } else {
    throw {
      status: 404,
      message: Messages.userNotFound
    };
  }
};

export const updateProfile = async data => {
  data.user.password = null;
  const profile = await Profile.findOne({ user: data.user._id });
  const user = await User.findById(data.user, {
    username: -1,
    email: -1,
    name: -1,
    avatar: -1
  });
  if (profile) {
    Object.assign(profile, {
      ...data
    });
    await profile.save();

    return {
      message: Messages.profileUpdate,
      profile: profile,
      user: user
    };
  } else {
    return createProfile(data);
  }
};

export const fetchUser = async data => {
  const user = await User.findOne(
    { username: data.user.username },
    { username: -1, email: -1, name: -1, avatar: -1 }
  );
  const profile = await Profile.findOne({ user: user._id });

  if (user) {
    if (profile) {
      return {
        profile: profile,
        user: user
      };
    }
    return {
      profile: {},
      user: user
    };
  } else {
    throw {
      status: 400,
      message: Messages.userNotFound
    };
  }
};

export const fetchUserByEmail = async data => {
  const user = await User.findOne(
    { email: data.user.email },
    { username: -1, email: -1, name: -1, avatar: -1 }
  );

  if (user) {
    return {
      user: user
    };
  } else {
    throw {
      status: 400,
      message: Messages.userNotFound
    };
  }
};
