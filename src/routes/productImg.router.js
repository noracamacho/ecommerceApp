const { getAll, create, remove } = require('../controllers/productImg.controller');
const express = require('express');
const upload = require('../utils/multer');
const verifyJWT = require('../utils/verifyJWT');

const productImgRouter = express.Router();

productImgRouter.route('/') // /product_images
    .get(verifyJWT, getAll)
    .post( verifyJWT , upload.single('image'), create);

productImgRouter.route('/:id') // /product_images/:id
    .delete(verifyJWT, remove);

module.exports = productImgRouter;