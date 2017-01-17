import md5 from 'md5';
import Joi from 'joi';

import User from './model/User';
import logger from './../log/logger';
import CassinyError from './../error/CassinyError';

const userSchema = {

  // password => md5
  // password: Joi.string().hex().length(32),
  password: Joi.string().min(5).max(32).required(),

  // username =>
  // - username may only contain alphanumeric characters or single hyphens (-),
  //   and cannot begin or end with a hyphen.
  // - length shoudl between 3 and 30
  username: Joi.string()
               .lowercase()
               .regex(/^\w+-?\w+(?!-)$/)
               .min(3)
               .max(30)
               .required(),


  email: Joi.string().email().required(),
};


export default class UserManager {

  static async registerUser({
    email,
    password,
    username,
  }) {
    const registerUserSchema = Joi.object().keys(userSchema);
    // Add registeration info verification, including
    const validateResult = Joi.validate({ email, password, username }, registerUserSchema);
    if (validateResult.error !== null) {
      logger.warn(`Invalid register user arguments: ${validateResult.error.name}`);
      throw CassinyError.INVALID_REGISTRATION(validateResult.error.message);
    }

    // Check duplicated email
    const existedEmailUser = await User.findOneByEmail(email);
    if (existedEmailUser !== null) {
      throw CassinyError.EMAIL_ALREADY_EXIST('Email address has already been taken.');
    }

    // check duplicated username
    const existedUsernameUser = await User.findOneByUsername(username);
    if (existedUsernameUser !== null) {
      throw CassinyError.USERNAME_ALREADY_EXIST('Username has already been taken.');
    }

    const user = new User({
      email: email.toLowerCase(),
      password: UserManager.encryptPassword(password),
      username: username.toLowerCase(),
      nickname: username,
    });
    await user.save();
    return user;
  }

  static async changeUserPassword(id, oldPassword, newPassword) {
    // TODO :
    // - cannot empty
    // - cannot be same
    // - id exist
    // - password correct
    // - oldPassword valid
    // save new password

    // const validateResult = userSchema.password.validate(newPassword);
    // if (validateResult.error !== null) {

    // }
    return true;
  }

  static async getUserByEmail(email) {
    const user = await User.findOneByEmail(email);
    return user;
  }

  static async getUserById(id) {
    const user = await User.findById(id);
    return user;
  }

  static async getUserByUsername(username) {
    const user = await User.findOneByUsername(username);
    return user;
  }

  static async verifyPassword(loginName, password) {
    let user = null;
    if (loginName.includes('@')) {
      user = await this.getUserByEmail(loginName);
    } else {
      user = await this.getUserByUsername(loginName);
    }
    if (user) {
      if (user.password === UserManager.encryptPassword(password)) {
        return user;
      }
    }
    return false;
  }

  static encryptPassword(password) {
    return md5(`${password}+i$love%cassiny!`);
  }
}
