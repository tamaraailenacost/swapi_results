const mongoose = require('mongoose');

const db_connect = async() => {

    try {
        await mongoose.connect(process.env.MONGO);
        console.log("database running!")
    } catch (error) {

        console.log(`error to connect db ${error}`);
    }

}

module.exports = db_connect
    