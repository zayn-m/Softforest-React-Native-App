const validate = (val, rules, connectedValue) => {
  let isValid = true;
  for (let rule in rules) {
    switch (rule) {
      case "isEmail":
        isValid = isValid && emailValidator(val);
        break;
      case "minLength":
        isValid = isValid && minLengthValidator(val, rules[rule]);
        break;
      case "equalTo":
        isValid = isValid && equalToValidator(val, connectedValue[rule]);
        break;
      case "isUsername":
        isValid = isValid && usernameValidator(val);  
      break;
      case "isName":
        isValid = isValid && nameValidator(val);
        break;
      case "isNumber":
        isValid = isValid && numberValidator(val);
        break;
      case "isText":
        isValid = isValid && true;
        break;
      default:
        isValid = true;
    }
  }
  
  return isValid;
};

const numberValidator = val => {
  return /(?:^|[^\d])(\d{5})(?:$|[^\d])/.test(val);
};

const nameValidator = val =>{
  return /[a-zA-Z]+/.test(val);
}

const usernameValidator = val =>{
  return /(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{6,15})$/.test(val);
}

const emailValidator = val => {
  return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
    val
  );
};

const minLengthValidator = (val, minLength) => {
    return val.length >= minLength;
};

const equalToValidator = (val, checkValue) => {
    return val === checkValue;
};

export default validate;