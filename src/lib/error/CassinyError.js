class CassiniyError extends Error {


  constructor(code, type, message) {
    super(message);
    this.type = type;
    this.code = code;
  }

}

[
  // server side - internal errors.
  { type: 'UNHANDLE_ERROR', code: 0 },

  // server side - client visible errors.
  { type: 'INVALID_REGISTRATION', code: 1001 },
  { type: 'USERNAME_ALREADY_EXIST', code: 1002 },
  { type: 'EMAIL_ALREADY_EXIST', code: 1003 },

].forEach((errorType) => {
  Object.defineProperty(exports, errorType.type, {
    get: () => CassiniyError.bind(errorType.code, errorType.type),
    configurable: false,
  });
});
