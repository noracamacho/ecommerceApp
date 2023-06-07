const catchError = require('../utils/catchError');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const getAll = catchError(async(req, res) => {
    const results = await User.findAll();
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const result = await User.create(req.body);
    return res.status(201).json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await User.destroy({ where: {id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    // Remove the property password from the body
    delete req.body.password;
    const result = await User.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

const login = catchError(async(req, res) => {
    // Get email and password
    const { email, password } = req.body;
    // Search for user by email and valdiate if it exists in db
    const user = await User.findOne({ where: { email } });
    if(!user) return res.status(401).json({ message: "Invalid Credentials" });
    // If user exists, validate the password
    const validPassword = await bcrypt.compare(password, user.password);
    if(!validPassword) return res.status(401).json({ message: "Invalid Credentials" });
    // Create Token
    const token = jwt.sign(
        { user }, // Payload
        process.env.TOKEN_SECRET, // Clave secreta
        { expiresIn: '1d' } // OPCIONAL: expiration time for token
    )
    return res.json({ user, token }); //return user and token 
});

// logged user
// Access logged user
const getLoggedUser = catchError(async(req, res) => {
    // Only returns information on protected endpoints -> req.user
    // If the endpoint is not protected req.user will return undefined
    const user = req.user;
    return res.json(user)
});

// https://ecommerceapp-verv.onrender.com
module.exports = {
    getAll,
    create,
    remove,
    update,
    login,
    getLoggedUser
}