import {validateEmail, validatePassword} from "./validations";

const validateLogIn = values => {
    let errors = {};

    // validate email
    errors = validateEmail(values.email, errors);

    // validate password
    errors = validatePassword(values.password, errors);

    return errors;
}

export default validateLogIn;
