const Cart = require('./Cart');
const Category = require('./Category');
const Product = require('./Product');
const ProductImg = require('./ProductImg');
const User = require('./User');

Category.hasMany(Product);
Product.belongsTo(Category); // Foreign Key

Product.hasMany(ProductImg);
ProductImg.belongsTo(Product); // Foreign Key

Product.hasMany(Cart);
Cart.belongsTo(Product); // Foreign Key

User.hasMany(Cart);
Cart.belongsTo(User); // Foreign Key