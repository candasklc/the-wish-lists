const mongoose = require('mongoose');
const dotenv = require('dotenv')

dotenv.config();

mongoose.connect(process.env.DB_URL, (err) => {
    if (!err) {
        console.log('Connected to the db.');
    } else {
        console.log('Error was raised while connecting to the db.');
    }
});

module.exports = mongoose;