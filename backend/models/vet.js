const mongoose = require('mongoose')

const vetSchema = new mongoose.Schema({
    name: String,
    place_id: String,
    vicinity: String,
    location: {
        lat: Number,
        lng: Number
    },
    rating: Number,
}, { collection: 'vet' })
/*
vetSchema.statics.find = async function(user) {
    const vet = await this.findOne({ user })
}
*/
module.exports = vetSchema;