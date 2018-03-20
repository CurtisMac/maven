const express = require('express')
const apiRouter = express.Router()
const contr = require('../controllers/apiControllers')
const config = require('../config')
const jwt = require('jsonwebtoken')

apiRouter.use((req, res, next) => {
    let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVhYWM3MTdjMTYyNTBkNDU3MGVjNjNjMCIsImlhdCI6MTUyMTMxNzM3MCwiZXhwIjoxNTIxNTc2NTcwfQ.UQJ4sQb-TFyTRXzeeT6IJXzVfTJ1d2ULlY3XEBl6siM'
    // let {token} = req.body
    console.log(req.body)
    if (token) {
        try {
            let decoded = jwt.verify(token, config.tokenKey)
            req.decoded = decoded
            next()
        } catch (e) {
            console.error(e)
            return res.status(403).send({
                success: false,
                error: 'Invalid Token'
            })
        }
    } else {
        console.log('no key')
        return res.status(403).send({
            success: false,
            error: 'No token provided'
        })
    }
})

apiRouter.post('/profile', async (req, res) => {
    const { id } = req.decoded
    try {
        res.json(await contr.getProfile(id))
    } catch (e) {
        console.error(e)
        res.json({ success: false })
    }
})

apiRouter.route('/articles')
    .post(async (req, res) => {
        const { id } = req.decoded
        try {
            res.json(await contr.getArticles(id))
        } catch (e) {
            console.error(e)
            res.json({ success: false })
        }
    })
    .delete(async (req, res) => {
        const { article } = req.headers
        const { id } = req.decoded
        try {
            res.json(await contr.updateUserArray(article, 'pull', 'currentSuggestions', id))
        } catch (e) {
            console.error(e)
            res.json({ success: false })
        }
    })

apiRouter.post('/toread', async (req, res) => {
    const { article, method } = req.headers
    const { id } = req.decoded
    const data = method === 'push' ?
        {
            articleId: article,
            read: false
        } :
        {
            _id: article
        }
    try {
        res.json(await contr.updateUserArray(data, method, 'toRead', id))
    } catch (e) {
        console.error(e)
        res.json({ success: false })
    }
})

apiRouter.post('/categories', async (req, res) => {
    const { cat, method } = req.headers
    const { id } = req.decoded
    const data = method === 'push' ?
        {
            name: cat,
            lastUpdate: new Date(Date.now() - config.backDate)
        } :
        {
            _id: cat
        }
    try {
        res.json(await contr.updateUserArray(data, method, 'categories', id))
    } catch (e) {
        console.error(e)
        res.json({ success: false })
    }
})


module.exports = apiRouter