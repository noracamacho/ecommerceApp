const request = require('supertest');
const app = require('../app');

let categoryId;
let token;

beforeAll(async () => {
    const credentials = {
        email: "testUser@gmail.com",
        password: "testUser123"
    }
    const res = await request(app).post('/users/login').send(credentials);
    token = res.body.token;
});

// Create one category
test('POST /categories should create one category', async () => {
    const category = {
        name: "Sports"
    }
    const res = await request(app)
        .post('/categories')
        .send(category)
        .set('Authorization', `Bearer ${token}`); // Hearder name, Bearer Token. Bearer token is the type of Aunthentification
    categoryId = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
});

// Get all categories
test('GET /categories should get all categories', async () => {
    const res = await request(app).get('/categories');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

// Update category test
test('PUT /categories/:id should update category', async () => {
    const categoryUpdated = {
        name: "Sports Updated"
    }
    const res = await request(app)
        .put(`/categories/${categoryId}`)
        .send(categoryUpdated)
        .set('Authorization', `Bearer ${token}`); // Hearder name, Bearer Token
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(categoryUpdated.name);
});

// Get one category
// N/A

// Delete Category test
test('DELETE /categories/:id should delete category', async () => {
    const res = await request(app)
        .delete(`/categories/${categoryId}`)
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
})




