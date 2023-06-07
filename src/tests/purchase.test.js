const request = require('supertest');
const app = require('../app');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const Category = require('../models/Category');
const { raw } = require('express');
const Purchase = require('../models/Purchase');
require('../models');

// let purchaseId;
let token;
let userId;

beforeAll(async () => {
    const credentials = {
        email: "testUser@gmail.com",
        password: "testUser123"
    }
    const res = await request(app).post('/users/login').send(credentials);
    token = res.body.token;
    userId = res.body.user.id;
});

// Buy Cart test
test('POST /purchases should create purchases', async () => {
    const category = await Category.create({ name: "Computers"});
    const product = await Product.create({
        title: "MacBook Pro 14",
        description: "Computer",
        brand: "Apple",
        price: 2500,
        categoryId: category.id
    })
    const cart = await Cart.create({
        userId,
        productId: product.id,
        quantity: 4
    })
    const purchase = {
        userId: cart.userId,
        productId: cart.productId,
        quantity: cart.quantity
    }
    // Validate that the putchase was made
    const res = await request(app)
        .post('/purchases')
        .send(purchase)
        .set('Authorization', `Bearer ${token}`); // Hearder name, Bearer Token
    expect(res.body[0].quantity).toBe(4);
    expect(res.body).toHaveLength(1);

    // Validate that cart is empty
    const resCart = await request(app)
        .get('/cart')
        .set('Authorization', `Bearer ${token}`); // Hearder name, Bearer Token
    expect(resCart.status).toBe(200);
    expect(resCart.body).toHaveLength(0);
    await product.destroy();
    await category.destroy();
});

// Get All Purchases test
test('GET /purchases should get all purchases', async () => {
    const res = await request(app)
        .get('/purchases')
        .set('Authorization', `Bearer ${token}`); // Hearder name, Bearer Token
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
    await request(app).delete('/purchases');
});