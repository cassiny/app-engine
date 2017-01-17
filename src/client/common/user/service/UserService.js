export default class UserService {
  static _user = null;

  static getCurrentUser() {
    return UserService._user;
  }
}

UserService._user = { username: $('meta[name="cassiny-username"]').attr('value') };
