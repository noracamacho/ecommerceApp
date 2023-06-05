const User = require('../models/User');
const sequelize = require('../utils/connection');
require('../models/User');
require('../models/Category');
require('../models/Product');
require('../models/ProductImg');
require('../models/Cart');
require('../models');

const main = async() => {
    try{
        await sequelize.sync({ force: true });

        // Create a user to generate a token for tests
        // To be able to create a testUser, the password
        // encryption must be done with beforeCreate at the Users model
        await User.create({
            firstName: "testUser",
            lastName: "testUser",
            email: "testUser@gmail.com",
            password: "testUser123",
            phone: "5555555555"
        });
        
        process.exit();
    } catch(error){
        console.log(error);
    }
}

main();