const mongoose = require('mongoose');
const { Schema } = mongoose;

const planetSchema = new Schema({

    name: String,
    climate: String,
    terrain: String,
    population: String  
});

const Planet = mongoose.model('Planet', planetSchema);
module.exports = Planet;
