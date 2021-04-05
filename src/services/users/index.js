import errors from '../../errors';
import { User } from '../../models/user';
import { v4 as uuid } from 'uuid';
import {
    validateAge,
    validateLogin,
    validatePassword
} from '../../validations';

export default class UserService {
    constructor() {
        this.users = [];
    }
    createUser(userLogin, userPassword, userAge) {
        const isLoginExisitng = !!this.getUserByLogin(userLogin);
        if (isLoginExisitng) {
            throw new Error(errors.loginAlreadyExisting(userLogin));
        }
        const userId = uuid();
        const createdUser = new User(userId, userLogin, userPassword, userAge);
        this.users.push(createdUser);
        return userId;
    }

    getUserByLogin(userLogin) {
        return this.users.find(({ login }) => login === userLogin);
    }

    getUserById(userId) {
        return this.users.find(({ id }) => id === userId);
    }

    updateUser(userId, userLogin, userPassword, userAge) {
        const userObject = this.getUserById(userId);
        if (!userObject || userObject.isDeleted) {
            throw new Error(errors.userCanNotBeFound(userId));
        }
        const isLoginExisting = !!this.getUserByLogin(userLogin);
        if (isLoginExisting) {
            throw new Error(errors.loginAlreadyExisting(userLogin));
        }
        if (userLogin) {
            const loginValidator = validateLogin(userLogin);
            if (!loginValidator.valid) {
                throw new Error(loginValidator.message);
            }
            userObject.login = userLogin;
        }
        if (userPassword) {
            const passwordValidator = validatePassword(userPassword);
            if (!passwordValidator.valid) {
                throw new Error(passwordValidator.message);
            }
            userObject.password = userPassword;
        }
        if (userAge) {
            const ageValidator = validateAge(userAge);
            if (!ageValidator.valid) {
                throw new Error(ageValidator.message);
            }
            userObject.userAge = userAge;
        }
    }

    deleteUser(userId) {
        const userObject = this.getUserById(userId);
        if (!userObject || userObject.isDeleted) {
            throw new Error(errors.userCanNotBeFound(userId));
        }
        userObject.isDeleted = true;
    }

    getUsers(query, limit) {
        /* eslint-disable no-unused-vars */
        let users = this.users
            .filter(({ login, isDeleted }) => !isDeleted && login.indexOf(query) > -1)
            .map(({ password, isDeleted, ...sanitizedUser }) => sanitizedUser);
        /* eslint-enable no-unused-vars */

        if (users.length > limit) {
            users = users.slice(0, limit);
        }
        return users;
    }
}
