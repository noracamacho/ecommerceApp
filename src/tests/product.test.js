const request = require('supertest');
const app = require('../app');
const Category = require('../models/Category');
const ProductImg = require('../models/ProductImg');
require('../models');

let productId;
let token;

beforeAll(async () => {
    const credentials = {
        email: "testUser@gmail.com",
        password: "testUser123"
    }
    const res = await request(app).post('/users/login').send(credentials);
    token = res.body.token;
});

// Create one product
test('POST /products should create one product', async () => {
    // Create a category to have categoryId
    const category = await Category.create({ name: "Smart Phones"});
    const product = {
        title: "iPhone 14 Pro",
        description: "Iphone Apple",
        brand: "Apple",
        price: 1700,
        categoryId: category.id
    }
    const res = await request(app)
        .post('/products')
        .send(product)
        .set('Authorization', `Bearer ${token}`); // Hearder name, Bearer Token
    // Asign product id to variable
    productId = res.body.id;
    // destroy category to avoid conflicts with category tests
    await category.destroy();
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
});

// Get all products
test('GET /products should get all products', async () => {
    const res = await request(app).get('/products');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

// Update product test
test('PUT /products/:id should update product', async () => {
    const productUpdated = {
        title: "iPhone 14 Pro Updated",
    }
    const res = await request(app)
        .put(`/products/${productId}`)
        .send(productUpdated)
        .set('Authorization', `Bearer ${token}`); // Hearder name, Bearer Token
    expect(res.status).toBe(200);
    expect(res.body.title).toBe(productUpdated.title);
});

// Set product images test
test("POST /products/:id/images should set products images", async () => {
    const image = await ProductImg.create({
        url: "http://testimageUrl.com",
        publicId: "test image id"
    })
    const res = await request(app)
        .post(`/products/${productId}/images`)
        .send([image.id])
        .set('Authorization', `Bearer ${token}`); // Hearder name, Bearer Token
    await image.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

// Delete Product
test('DELETE /product/:id should delete product', async () => {
    const res = await request(app)
        .delete(`/products/${productId}`)
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
});

