const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categoriesSchema = new Schema({
    name:
        {
            type: String,
            required: true,
        },
    lastUpdate: Date,
})

const userSchema = new Schema({
    id: Number,
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    languages: [],
    categories: [categoriesSchema],
    currentSuggestions: [],
    toRead:[]
})

const User = mongoose.model('User', userSchema)
module.exports = User