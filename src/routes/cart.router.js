const { getAll, create, getOne, remove, update } = require('../controllers/cart.controller');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT')

const cartRouter = express.Router();

cartRouter.route('/') // /cart
    .get(verifyJWT, getAll)
    .post(verifyJWT, create);

cartRouter.route('/:id') //cart/:id
    // .get(getOne)
    .delete(verifyJWT, remove)
    .put(verifyJWT, update);

module.exports = cartRouter;