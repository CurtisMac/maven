const mongoose = require('mongoose')
const Schema = mongoose.Schema

const articleSchema = new Schema({
    title: String,
    authors: [String],
    url: {
        type: String,
        required: true,
        unique: true
    },
    pubDate: Date,
    addDate: Date,
    summary: String,
    lang: String,
    rank: Number,
    rankData: new Schema ({
        lastUpdate: Number,
        backlinks: Number,
        facebook: Number,
        pinterest: Number,
        stumbleUpon: Number,
        googlePlusOne: Number,
        linkedIn: Number,
        twitter: Number,
        reddit: Number
    }),
    src: new Schema ({
        type: String,
        title: String,
        url: String,
    }),
    tags: [String]
})

const Article = mongoose.model('Article', articleSchema)

module.exports = Article