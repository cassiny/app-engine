class CassiniyError extends Error {


  constructor(code, message) {
    super(message);
    this.code = code;
  }

}

[
  // server side - internal errors.
  { type: 'UNHANDLE_ERROR', code: 0 },

  // server side - client visible errors.
  { type: 'USERNAME_ALREADY_EXIST', code: 1001 },
  { type: 'EMAIL_ALREADY_EXIST', code: 1002 },

].forEach((errorType) => {
  Object.defineProperty(exports, errorType.type, {
    get: () => new CassiniyError(errorType.code, errorType.type),
    configurable: false,
  });
});



