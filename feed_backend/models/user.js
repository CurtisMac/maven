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

const haveReadSchema = new Schema({
    articleId:
        {
            type: String,
            required: true,
            unique: true,
        },
    notes: String,
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
    categories: [],
    currentSuggestions: [],
    excludedArticles: [],
    toRead: [toReadSchema],
    haveRead: [haveReadSchema]
})

const User = mongoose.model('User', userSchema)
module.exports = User