const mongoose = require('mongoose');

function DbConnect() {
    const DB_URL = process.env.DB_URL;

    // Database
    mongoose.connect(DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useFindAndModify: false,
    });

    const db = mongoose.connection; // We are storing the mongoose connection in db and then we are appling some event listener on them
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => {
        console.log("Database Connected....");
    })
}

module.exports = DbConnect;