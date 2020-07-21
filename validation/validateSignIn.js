import {validateEmail, validateName, validatePassword} from "./validations";

const validateSignIn = values => {
    let errors = {};

    // user name validation
    errors = validateName(values.name, errors);

    // validate email
    errors = validateEmail(values.email, errors);

    // validate password
    errors = validatePassword(values.password, errors);

    return errors;
}

export default validateSignIn;
