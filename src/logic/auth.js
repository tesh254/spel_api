import bcrypt from "./node_modules/bcrypt";
import valid from "validator";

import User from "../models/user";

export const createUser = (userParam) => {
    // Check if email and username are in user
  if (valid.isEmpty(userParam.password)) {
    throw {
      status: 400,
      message: "Password should be provided"
    }
  } else if (!valid.isEmail(userParam.email)) {
    throw { status: 400, message: `Email ${userParam.email} is not valid` }
  } else if (valid.isEmpty(userParam.email)) {
    throw { status: 400, message: "Email should be provided" }
  } else if (!valid.isLength(userParam.password, { min: 6, max: 30 })) {
    throw {
      status: 400,
      message: "Password should be more than six characters"
    }
  } else if (!valid.equals(userParam.password, userParam.confirm)) {
    throw { status: 400, message: "Passwords do not match" }
  } else if (await User.findOne({ username: userParam.username })) {
    throw {
      status: 400,
      message: `Username ${userParam.username} has been taken`
    }
  } else if (await User.findOne({ email: userParam.email })) {
    throw {
      status: 400,
      message: `Email ${userParam.email} has been used already`
    }
  } else {
    const user = new User(userParam)
      if (userParam.password) {
        user.password = bcrypt.hashSync(userParam.password, 10)
      }

      // Save the user
      await user.save()
      // Send email to user
      await sendMail({
        toMail: user.email,
        subject: "Email Verification",
        body: "Verify email",
        domain: userParam.domain,
        username: user.username
      })
      return user
    }
}
