import Joi from 'joi';

const schema = Joi.object().keys({
  loginName: Joi.string()
                .min(3)
                .max(30)
                .trim(),
  password: Joi.string()
                .min(5)
                .token()
                .trim(),
});

$(document).ready(() => {
  $('form').on('submit', () => {
    const result = validate(['loginName', 'password']);

    if (!result.ok) {
      result.value.forEach((obj) => {
        showError($(`#${obj.field}Group`), generateInfo(obj.message, obj.field));
      });
      return false;
    }

    // Go on
    return true;
  });

  $('#loginNameField, #passwordField').on('blur', (e) => {
    const currentFieldName = e.currentTarget.id.replace('Field', '');
    const result = validate(currentFieldName);

    if (!result.ok && result.value.length > 0) {
      showError($(`#${currentFieldName}Group`), generateInfo(result.value[0].message, result.value[0].field));
    } else {
      hideError($(`#${currentFieldName}Group`));
    }
  });
});

// fieldsForValidation can undefined, string and array
function validate(fieldsForValidation) {
  // Format undefined/string/array to array
  let ffv = [];
  if (typeof fieldsForValidation === 'string') {
    ffv.push(fieldsForValidation);
  } else if (Array.isArray(fieldsForValidation)) {
    ffv = fieldsForValidation;
  }

  // Validate all fields
  const validationsResult = Joi.validate({
    loginName: $('#loginNameField').val(),
    password: $('#passwordField').val(),
  }, schema, { abortEarly: false });

  if (!validationsResult.error) {
    return {
      ok: true,
      value: validationsResult.value,
    };
  }

  // Format error message
  const temp = validationsResult.error.details
                .map(obj => ({ field: obj.path, message: obj.message }));

  const result = [];
  const fieldsHasAdded = [];
  temp.filter(obj => ffv.indexOf(obj.field) > -1)
      .forEach((val) => {
        if (fieldsHasAdded.indexOf(val.field) === -1) {
          fieldsHasAdded.push(val.field);
          result.push(val);
        }
      });

  return {
    ok: false,
    value: result,
  };
}

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
