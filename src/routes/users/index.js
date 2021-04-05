import express from 'express';
import UserController from '../../controllers/users';

const router = express.Router();

const userController = new UserController();

router
    .get('/', (req, res, next) =>
        userController.get(req, res, next)
    )
    .post('/', (req, res, next) => userController.create(req, res, next))
    .put('/:id', (req, res, next) => userController.update(req, res, next))
    .delete('/:id', (req, res, next) => userController.delete(req, res, next));

export default router;
