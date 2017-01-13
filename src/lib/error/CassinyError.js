class CassiniyError extends Error {


  constructor(code, message) {
    super(message);
    this.code = code;
  }

};

[
  'USERNAME_ALREADY_EXIST',
  'EMAIL_ALREADY_EXIST',
].forEach((name, index) => {
  Object.defineProperty(exports, name, {
    get: () => new CassiniyError(index, name),
    configurable: false,
  });
});



