const mongoose = require('mongoose')
const Schema = mongoose.Schema

const toReadSchema = new Schema({
    articleId: 
    {
        type: String,
        required: true,
        unique: true,    
    },
    read: Boolean,
})

const archiveSchema = new Schema({
    articleId:
        {
            type: String,
            required: true,
            unique: true,
        },
    notes: String,
})

const categoriesSchema = new Schema({
    name:
        {
            type: String,
            required: true,
            unique: true,
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
    toRead: [toReadSchema],
    archive: [archiveSchema]
})

const User = mongoose.model('User', userSchema)
module.exports = User