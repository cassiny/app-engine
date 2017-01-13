export default class UserIdentity {
  constructor({ id, username, nickname, email }) {
    this.id = id;
    this.email = email;
    this.username = username;
    this.nickname = nickname;
  }

  serialize() {
    return JSON.stringify(this);
  }

  static async deserialize(json) {
    const user = JSON.parse(json);
    return user;
  }
}
