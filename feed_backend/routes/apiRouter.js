const express = require('express')
const apiRouter = express.Router()
const contr = require('../controllers/apiControllers')
const config = require('../config')
const jwt = require('jsonwebtoken')

apiRouter.post('/profile', contr.veriftyJWT, async (req, res) => {
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

apiRouter.post('/categories', contr.veriftyJWT, async (req, res) => {
    const { cat, method } = req.body
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