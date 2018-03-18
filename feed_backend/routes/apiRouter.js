const express = require('express')
const apiRouter = express.Router()
const contr = require('../controllers/apiControllers')

apiRouter.use(contr.veriftyJWT)

apiRouter.get('/profile', async (req, res) => {
    const { id } = req.decoded
    try {
        res.json(await contr.getProfile(id))
    } catch (e) {
        console.error(e)
        res.json({ success: false })
    }
})

apiRouter.route('/articles')
    .get(async (req, res) => {
        const { id } = req.decoded
        try {
            res.json(await contr.getArticles(id))
        } catch (e) {
            console.error(e)
            res.json({ success: false })
        }
    })
    .post(async (req, res) => {
        const { article, method, array } = req.headers
        const { id } = req.decoded
        const data = method==='push' ?
            {
                articleId: article,
                read: false
            } :
            {
                _id: article
            }
        try {
            res.json(await contr.updateUserArray(data, method, array, id))
        } catch (e) {
            console.error(e)
            res.json({ success: false })
        }
    })

apiRouter.post('/categories', async (req, res) => {
        const { cat, method } = req.headers
        const { id } = req.decoded
        const array = 'categories'
        try {
            res.json(await contr.updateUserArray(cat, method, array, id))
        } catch (e) {
            console.error(e)
            res.json({ success: false })
        }
    })


module.exports = apiRouter