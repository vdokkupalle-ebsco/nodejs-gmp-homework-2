import express from 'express';
import UserController from '../../controllers/users';
import validator from '../../validator/joivalidator';
import {
    userGetQuerySchema,
    userCreateBodySchema,
    userUpdateBodySchema,
    userUpdateParamsSchema,
    userDeleteParamsSchema
} from '../../validator/schemas';

const router = express.Router();

const userController = new UserController();

router
    .get('/', validator.query(userGetQuerySchema), (req, res) =>
        userController.get(req, res)
    )
    .post('/', validator.body(userCreateBodySchema), (req, res) =>
        userController.create(req, res)
    )
    .put(
        '/:id',
        validator.params(userUpdateParamsSchema),
        validator.body(userUpdateBodySchema),
        (req, res) => userController.update(req, res)
    )
    .delete('/:id', validator.params(userDeleteParamsSchema), (req, res) =>
        userController.delete(req, res)
    );

export default router;
