/**
 * Model for a vet practice
 */

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

module.exports = vetSchema;