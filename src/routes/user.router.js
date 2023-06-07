const { getAll, create, getOne, remove, update, login } = require('../controllers/user.controllers');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT');


const userRouter = express.Router();

userRouter.route('/') // /users
    .get(verifyJWT, getAll)
    .post(create);

userRouter.route('/login')// /users/login
    .post(login);

userRouter.route('/:id') // /users/:id
    // .get(verifyJWT, getOne)
    .delete(verifyJWT, remove)
    .put(verifyJWT, update);

module.exports = userRouter;