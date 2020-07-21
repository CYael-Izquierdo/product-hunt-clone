import {validateCompany, validateDescription, validateName, validateURL} from "./validations";

const validateNewProduct = values => {
    let errors = {};

    // Validations
    errors = validateName(values.name, errors);
    errors = validateCompany(values.company, errors);
    errors = validateURL(values.url, errors);
    errors = validateDescription(values.description, errors);

    return errors;
}

export default validateNewProduct;
