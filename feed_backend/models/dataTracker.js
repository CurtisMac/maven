const mongoose = require('mongoose')
const Schema = mongoose.Schema

const trackerSchema = new Schema({
    query: String,
    lastRun: Date
})

const Tracker = mongoose.model('Tracker', trackerSchema)
module.exports = Tracker