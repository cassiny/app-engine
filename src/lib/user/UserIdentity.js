import UserManager from './UserManager';

export default class UserIdentity {
  constructor({ id, username, nickname, email }) {
    this._id = id;
    this._email = email;
    this._username = username;
    this._nickname = nickname;
  }

  get id() {
    return this._id;
  }

  get email() {
    return this._email;
  }

  get username() {
    return this._username;
  }

  get nickname() {
    return this._nickname;
  }

  serialize() {
    return this.id;
  }

  static async deserialize(id) {
    const user = await UserIdentity.findById(id);
    return user;
  }

  static async findById(id) {
    const user = await UserManager.getUserById(id);
    if (user) {
      return new UserIdentity(user);
    }
    return null;
  }
}
