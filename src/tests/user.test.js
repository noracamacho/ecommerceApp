const request = require('supertest');
const app = require('../app');

let userId;
let token;

// ERROR 401 HAPPENS WHEN TOKEN IS NOT SENT
// ERROR 403 HAPPENS WHEN THE TOKEN IS NOT VALID
// Add user test
test('POST /users should create one user', async () => {
    const user = {
        firstName: "Daniel",
        lastName: "Arias",
        email: "daniel@gmail.com",
        password: "daniel123",
        phone: "5555555555"
    }
    const res = await request(app)
        .post('/users')
        .send(user);
    userId = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
});

// Login test
test('POST /users/login should do login', async () => {
    const credentials = {
        email: "daniel@gmail.com",
        password: "daniel123"
    }
    const res = await request(app)
        .post('/users/login')
        .send(credentials);
    token = res.body.token;
    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
});

// Get users test
test('GET /users should get all users', async () => {
    const res = await request(app)
        .get('/users')
        .set('Authorization', `Bearer ${token}`); // Hearder name, Bearer Token
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(2);
});

// Update user test
test('PUT /users/:id should update user', async () => {
    const userUpdated = {
        firstName: "Daniel Updated",
    }
    const res = await request(app)
        .put(`/users/${userId}`)
        .send(userUpdated)
        .set('Authorization', `Bearer ${token}`); // Hearder name, Bearer Token
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(userUpdated.firstName);
});

// Get one test
// test('GET /users/:id', async () => {
//     const res = await request(app)
//     .get(`/users/${userId}`)
//     .set('Authorization', `Bearer ${token}`); // Hearder name, Bearer Token
//     expect(res.status).toBe(200);
// });


// Invalid credentials test
// Incorrect password or email tests
test('POST /users/login with invalid credentials should throw an error', async () => {
    const credentials = {
        email: "daniel@gmail.com",
        password: "daniel124"
    }
    const res = await request(app)
        .post('/users/login')
        .send(credentials);
    expect(res.status).toBe(401);
});

// Delete user test
test('DELETE /userd/:id should delete user', async () => {
    const res = await request(app)
    .delete(`/users/${userId}`)
    .set('Authorization', `Bearer ${token}`); // Hearder name, Bearer Token
    expect(res.status).toBe(204);
});

