import md5 from 'md5';

import User from './model/User';

export default class UserManager {
  static async registerUser({
    email,
    password,
    username,
  }) {
    if (!email || !password || !username) {
      throw new Error('Invalid user arguments.');
    }
    // TODO: Add registeration info verification, including
    // * Email regexp
    // * password regexp md5
    // * username regexp
    // * Duplicated email
    // * Duplicated username
    const user = new User({
      email: email.toLowerCase(),
      password: UserManager.encryptPassword(password),
      username: username.toLowerCase(),
      nickname: username,
    });
    await user.save();
    return user;
  }

  // static async changeUserPassword(id, oldPassword, newPassword) {
  //
  // }

  static async getUserByEmail(email) {
    const user = await User.findOneByEmail(email);
    return user;
  }

  static async getUserById(id) {
    const user = await User.findById(id);
    return user;
  }

  static async verifyEmailPassword(email, password) {
    const user = await this.getUserByEmail(email);
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
