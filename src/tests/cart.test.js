const request = require('supertest');
const app = require('../app');
const Product = require('../models/Product');
const Category = require('../models/Category');
require('../models');

let cartId;
let token;

beforeAll(async () => {
    const credentials = {
        email: "testUser@gmail.com",
        password: "testUser123"
    }
    const res = await request(app).post('/users/login').send(credentials);
    token = res.body.token;
});

// Create Cart
test('POST /cart should creat a cart', async () => {
    const category = await Category.create({ name: "Computers"});
    const product = await Product.create({
        title: "MacBook Pro 14",
        description: "Computer",
        brand: "Apple",
        price: 2500,
        categoryId: category.id
    })
    const cart = {
        productId: product.id,
        quantity: 4
    }
    const res = await request(app)
        .post('/cart')
        .send(cart)
        .set('Authorization', `Bearer ${token}`); // Hearder name, Bearer Token. Bearer token is the type of Aunthentification
    cartId = res.body.id;
    await product.destroy();
    await category.destroy();
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
});

// Get all cart test
test('GET /cart should get all cart', async () => {
    const res = await request(app)
        .get('/cart')
        .set('Authorization', `Bearer ${token}`); // Hearder name, Bearer Token
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

// Update Cart test
test('PUT /cart/:id should updtae cart', async () => {
    const cartUpdated = {
        quantity: 2
    }
    const res = await request(app)
        .put(`/cart/${cartId}`)
        .send(cartUpdated)
        .set('Authorization', `Bearer ${token}`); // Hearder name, Bearer Token
    expect(res.status).toBe(200);
    expect(res.body.quantity).toBe(cartUpdated.quantity);
});

// Delete Cart test
test('DELETE /cart/:id should delete cart', async () => {
    const res = await request(app)
        .delete(`/cart/${cartId}`)
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
});