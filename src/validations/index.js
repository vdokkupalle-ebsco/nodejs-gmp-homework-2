export const validateLogin = (login) => {
    let valid = true;
    let message = '';
    if (login.trim().length < 5) {
        valid = false;
        message = 'login should be atleast 5 characters length.';
    }
    return {
        valid,
        message
    };
};

export const validatePassword = (password) => {
    let valid = true;
    let message = '';
    const pattern = /^[0-9a-zA-Z]+$/;
    if (!password.match(pattern)) {
        valid = false;
        message = 'password should contain letters and numbers only.';
    }
    return {
        valid,
        message
    };
};

export const validateAge = (age) => {
    const valid = age >= 4 && age <= 130;
    const message = !valid ? 'Age should be between 4 and 130' : '';
    return {
        valid,
        message
    };
};
