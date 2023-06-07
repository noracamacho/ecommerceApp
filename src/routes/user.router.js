const { getAll, create, remove, update, login, getLoggedUser } = require('../controllers/user.controllers');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT');


const userRouter = express.Router();

userRouter.route('/') // /users
    .get(verifyJWT, getAll)
    .post(create);

userRouter.route('/me') // /users/me
    .get(verifyJWT, getLoggedUser);

userRouter.route('/login')// /users/login
    .post(login);

userRouter.route('/:id') // /users/:id
    .delete(verifyJWT, remove)
    .put(verifyJWT, update);

module.exports = userRouter;