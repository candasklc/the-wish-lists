const mongoose = require('mongoose');
const dotenv = require('dotenv');
const options = {
    dbName: "myFirstDatabase"
};

dotenv.config();

mongoose.connect(process.env.DB_URL, options, (err) => {
    if (!err) {
        console.log('Connected to the db.');
    } else {
        console.log('Error was raised while connecting to the db.');
    }
});

module.exports = mongoose;
