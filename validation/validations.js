export const validateEmail = (email, errors) => {
    if (email.trim() === "") {
        return {
            ...errors,
            email: "Email address is required."
        };
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
        return {
            ...errors,
            email: "Invalid email address format."
        };
    }
    return errors;
}

export const validatePassword = (password, errors) => {
    if (password.trim() === "") {
        return  {
            ...errors,
            password: "Password address is required."
        };
    } else if (password.length < 6) {
        return  {
            ...errors,
            password: "The password must be at least 6 characters."
        };
    }
    return errors;
}

export const validateName = (name, errors) => {
    if (name.trim() === "") {
        return  {
            ...errors,
            name: "Name is required."
        };
    }
    return errors;
}

export const validateCompany = (company, errors) => {
    if (company.trim() === "") {
        return  {
            ...errors,
            company: "Company name is required."
        };
    }
    return errors;
}

export const validateURL = (url, errors) => {
    if (url.trim() === "") {
        return  {
            ...errors,
            url: "Id URL is required."
        };
    } else if(!/^(ftp|http|https):\/\/[^ "]+$/.test(url)) {
        return  {
            ...errors,
            url: "Invalid URL format."
        };
    }
    return errors;
}

export const validateDescription = (description, errors) => {
    if (description.trim() === "") {
        return  {
            ...errors,
            description: "Description is required."
        };
    }
    return errors;
}
