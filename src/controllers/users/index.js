import UserService from '../../services/users';
import {
    validateAge,
    validateLogin,
    validatePassword
} from '../../validations';

export default class UserController {
    constructor() {
        this.service = new UserService();
    }
    create(req, res) {
        const { login, password, age } = req.body;
        try {
            if (!login || !password || !age) {
                throw new Error('login, password, age should be required');
            }

            const loginValidation = validateLogin(login);
            if (!loginValidation.valid) {
                throw new Error(loginValidation.message);
            }

            const passwordValidation = validatePassword(password);
            if (!passwordValidation.valid) {
                throw new Error(passwordValidation.message);
            }

            const ageValidation = validateAge(age);
            if (!ageValidation.valid) {
                throw new Error(ageValidation.message);
            }

            const userId = this.service.createUser(login, password, age);
            res.json({
                id: userId,
                message: 'User successfully created'
            });
        } catch (e) {
            res.status(400).send(e.message);
        }
    }
    update(req, res) {
        const { id } = req.params;
        const { login, age, password } = req.body;
        try {
            if (id === undefined) {
                throw new Error('id is required');
            }
            const userId = this.service.updateUser(id, login, age, password);
            res.json({
                id: userId,
                message: 'User is successfully updated'
            });
        } catch (e) {
            res.status(400).send(e.message);
        }
    }
    delete(req, res) {
        const { id } = req.params;
        try {
            if (id === undefined) {
                throw new Error('id is required');
            }
            this.service.deleteUser(id);
            res.json({
                message: 'User is successfully deleted'
            });
        } catch (e) {
            res.status(400).send(e.message);
        }
    }
    get(req, res) {
        const { query = '', limit = 10 } = req.query;
        try {
            if (query && typeof query !== 'string') {
                throw new Error('query should be a string.');
            }

            if (limit && typeof limit !== 'number') {
                throw new Error('limit should be a number');
            }

            const users = this.service.getUsers(query, limit);
            res.json({
                users
            });
        } catch (e) {
            res.status(400).send(e.message);
        }
    }
}
