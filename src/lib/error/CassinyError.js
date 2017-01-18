// We do not extend the built-in Error type
// See http://stackoverflow.com/questions/31089801/extending-error-in-javascript-with-es6-syntax
class CassinyError {

  constructor(code, type, message) {
    this.message = message;
    this.name = this.constructor.name;
    this.type = type;
    this.code = code;
    this.isClientError = this.code > 1000;
    this.stack = new Error().stack;
  }

}

CassinyError.prototype = Object.create(Error.prototype);

const errorMap = {};

[
  // server side - internal errors.
  { type: 'UNHANDLE_ERROR', code: 0 },

  // server side - client visible errors.

  // register
  { type: 'INVALID_REGISTRATION', code: 1001 },
  { type: 'USERNAME_ALREADY_EXIST', code: 1002 },
  { type: 'EMAIL_ALREADY_EXIST', code: 1003 },

  // create project
  { type: 'PROJECT_PATH_ALREADY_EXIST', code: 1004 },
  { type: 'PROJECT_CREATE_PARAM_INVALID', code: 1005 },

].forEach((err) => {
  errorMap[err.type] = function error(message) {
    return new CassinyError(err.code, err.type, message);
  };
});

export default errorMap;
