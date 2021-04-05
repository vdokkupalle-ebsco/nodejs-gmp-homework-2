const errors = {
    loginAlreadyExisting: (login) =>
        `Login ${login} is already existing. Please choose another login`,
    invalidAge: (min, max) => `age should be in between ${min} - ${max}`,
    userCanNotBeFound: (id) => `User with id ${id} cannot be found`
};

export default errors;
