/**
 * Model for the profile of a vet practioner
 */

const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema({
    gender: String,
    name: {
        title: String,
        first: String,
        last: String,
    },
    email: String,
    dob: {
        date: String,
        age: String,
    },
    registered: {
        date: String,
        age: String,
    },
    picture: String,
    works_at: String,
}, { collection: 'profile' })

module.exports = profileSchema