const catchError = require('../utils/catchError');
const Purchase = require('../models/Purchase');
const Product = require('../models/Product');
const Cart = require('../models/Cart');
const ProductImg = require('../models/ProductImg');

const getAll = catchError(async(req, res) => {
    const userId = req.user.id;
    const results = await Purchase.findAll({ 
        include: [{
            model: Product,
            include: ProductImg
        }],
        where: { userId }
    });
    return res.json(results);
});

const buyCart = catchError(async(req, res) => {
    const userId = req.user.id;
    const cartProducts = await Cart.findAll({ 
        where: { userId },
        attributes: ["userId", "productId", "quantity"],
        raw: true
    });
    const result = await Purchase.bulkCreate(cartProducts);
    await Cart.destroy({
        where: { userId }
    })
    // return res.json(cartProducts);
    return res.json(result);
})


module.exports = {
    getAll,
    buyCart
}