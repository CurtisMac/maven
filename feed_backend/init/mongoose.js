const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/read_app_db');
mongoose.Promise = global.Promise
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log("Connected to db at 'mongodb://localhost:27017/read_app_db'")
});

module.exports = db