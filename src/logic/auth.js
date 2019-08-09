import bcrypt from "bcrypt";
import valid from "validator";

import User from "../models/user";
import sendMail, { passResetMail } from "../services/email";
import { jwtVerify, refreshToken, loginJwt } from "../services/jwt";
import Messages from "../constants/messages";

export const createUser = async userParam => {
  // Check if email and username are in user
  if (valid.isEmpty(userParam.password)) {
    throw {
      status: 400,
      message: "Password should be provided"
    };
  } else if (!valid.isEmail(userParam.email)) {
    throw { status: 400, message: `Email ${userParam.email} is not valid` };
  } else if (valid.isEmpty(userParam.email) && valid.isEmpty(userParam.name)) {
    throw { status: 400, message: "Email/Name should be provided" };
  } else if (!valid.isLength(userParam.password, { min: 6, max: 30 })) {
    throw {
      status: 400,
      message: "Password should be more than six characters"
    };
  } else if (!valid.equals(userParam.password, userParam.confirm)) {
    throw { status: 400, message: "Passwords do not match" };
  } else if (await User.findOne({ username: userParam.username })) {
    throw {
      status: 400,
      message: `Username ${userParam.username} has been taken`
    };
  } else if (await User.findOne({ email: userParam.email })) {
    throw {
      status: 400,
      message: `Email ${userParam.email} has been used already`
    };
  } else {
    const user = new User(userParam);
    if (userParam.password) {
      user.password = bcrypt.hashSync(userParam.password, 10);
    }

    // Save the user
    await user.save();
    // Send email to user
    await sendMail({
      toMail: user.email,
      subject: "Email Verification",
      body: "Verify email",
      domain: userParam.domain,
      username: user.username
    });
    return user;
  }
};

export const verifyEmail = async token => {
  let email = jwtVerify(token);
  let user = await User.findOne({ email: email });

  if (!user) {
    throw {
      status: 404,
      message: Messages.userNotFound
    };
  }
  if (user.isVerified) {
    throw {
      status: 400,
      message: Messages.userVerified
    };
  }

  Object.assign(user, {
    isVerified: true,
    avatar: `https://robohash.org/${user.username}`
  });

  await user.save();

  return user;
};

export const loginUser = async userParam => {
  // Validate user
  if (!valid.isEmail(userParam.email)) {
    throw { status: 400, message: `Email ${userParam.email} is not valid` };
  } else if (!valid.isLength(userParam.password, { min: 6, max: 30 })) {
    throw {
      status: 400,
      message: "Password should be more than six characters"
    };
  } else {
    const user = await User.findOne({ email: userParam.email });

    if (user) {
      if (bcrypt.compareSync(userParam.password, user.password)) {
        if (user.isVerified) {
          return {
            token: loginJwt(user.email),
            refresh_token: refreshToken(user.email),
            message: "Logged in successfully"
          };
        } else {
          throw {
            status: 403,
            message: "Please verify your account, check your email"
          };
        }
      } else {
        throw {
          status: 400,
          message: "Invalid email/password"
        };
      }
    } else {
      throw {
        status: 404,
        message: "Invalid email/password"
      };
    }
  }
};

export const sendResetEmail = async data => {
  if (!valid.isEmail(data.email) && valid.isEmpty(data.email)) {
    throw {
      status: 400,
      message: Messages.invalidEmail
    };
  } else {
    const user = await User.findOne({ email: data.email });
    if (!user) {
      throw {
        status: 404,
        message: Messages.userNotFound
      };
    } else {
      await passResetMail({
        toMail: data.email,
        subject: "Password Reset",
        body: "Password Reset",
        username: user.username
      });
      return {
        message: Messages.resetLink
      };
    }
  }
};

export const handlePasswordReset = async data => {
  const email = jwtVerify(data.token);
  const user = await User.findOne(
    { email: email },
    {
      username: -1,
      email: -1,
      name: -1,
      avatar: -1
    }
  );

  if (!user) {
    throw {
      status: 404,
      message: Messages.userNotFound
    };
  } else {
    if (data.password !== data.confirm) {
      throw {
        status: 400,
        message: "Passwords do not match"
      };
    } else if (data.password.length < 6) {
      throw {
        status: 400,
        message: "Password should be above 6 characters"
      };
    } else {
      const hashedPassword = bcrypt.hashSync(data.password, 10);

      Object.assign(user, {
        password: hashedPassword
      });

      await user.save();

      return {
        user,
        message: Messages.passwordChange
      };
    }
  }
};
