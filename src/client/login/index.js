import Joi from 'joi';

const schema = Joi.object().keys({
  loginName: Joi.string().min(3).max(30).required(),
  password: Joi.string().min(5).required(),
});

$(document).ready(() => {
  $('form').on('submit', () => {
    const loginName = $('#loginNameGroup > input').val();
    const password = $('#passwordGroup > input').val();

    const result = Joi.validate({ loginName, password }, schema, { abortEarly: false });
    if (result.error) {
      result.error.details.forEach((obj) => {
        showError($(`#${obj.path}Group`), generateInfo(obj.message, obj.path));
      });
      return false;
    }

    // Go on
    console.log(result.value);
  });

  $('#loginNameField').on('focus', () => {
    hideError($('#loginNameGroup'));
  });
  $('#passwordField').on('focus', () => {
    hideError($('#passwordGroup'));
  });

});

function showError($ele, message) {
  $ele.addClass('has-error');
  $ele.find('.help-block').text(message);
}

function hideError($ele) {
  $ele.removeClass('has-error');
  $ele.find('.help-block').text('');
}

function generateInfo(info, keyword) {
  let result = '';
  switch (keyword) {
    case 'loginName':
      result = info.replace('loginName', 'Username or email address');
      break;
    case 'password':
      result = info.replace('password', 'Password');
      break;
    default:
      result = '';
      break;
  }

  return result;
}
