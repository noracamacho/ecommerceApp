const { getAll, create, getOne, remove, update, setProductImages } = require('../controllers/product.controllers');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT');


const productRouter = express.Router();

productRouter.route('/') // /products
    .get(getAll)
    .post(verifyJWT, create);

productRouter.route('/:id') // /products/:id
    .get(getOne)
    .delete(verifyJWT, remove)
    .put(verifyJWT, update);

productRouter.route('/:id/images') // /products/:id/images
    .post(verifyJWT, setProductImages);

module.exports = productRouter;