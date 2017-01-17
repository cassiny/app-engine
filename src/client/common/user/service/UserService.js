import injections from '../../injections';

export default class UserService {
  static _user = null;

  static getCurrentUser() {
    if (!UserService._user) {
      UserService._user = { username: injections.username };
    }
    return UserService._user;
  }
}
