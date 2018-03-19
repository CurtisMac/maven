const express = require('express')
const app = express()
const bodyParser = require('body-parser')

//import routes here
const loginRouter = require('./routes/loginRouter')
const signupRouter = require('./routes/signupRouter')
const apiRouter = require('./routes/apiRouter')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
    next()
})

app.use('/', loginRouter)
app.use('/', signupRouter)
app.use('/', apiRouter)

// const scraper = require('./methods/scraper')
// scraper({ lang: 'en', query: 'bitcoin' })

// const ranker = require('./functions/ranker')

const getCurrentSugs = require('./methods/getCurrentSugs')

module.exports = app