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
    // .get((req, res) => {
    //     let { article } = req.headers
    //     res.json(' /articles sent request for ' + article)
    // })
    // .post((req, res) => {
    //     res.json('user info sent here ' + user)
    // })
    .put(async (req, res) => {
        let { article, destination } = req.headers
        const { id } = req.decoded
        try {
            res.json(await contr.addToList(article, destination, id))
        } catch (e) {
            console.error(e)
            res.json({ success: false })
        }
    })
    .delete(async (req, res) => {
        let { itemnum, destination } = req.headers
        const { id } = req.decoded
        try {
            res.json(await contr.removeFromList(itemnum, destination, id))
        } catch (e) {
            console.error(e)
            res.json({ success: false })
        }
    })

apiRouter.route('/categories')
    .put(async (req, res) => {
        const { id } = req.decoded
        const { cat } = req.headers
        const method = 'push'
        try {
            res.json(await contr.updateCategories(cat, id, method))
        } catch (e) {
            console.error(e)
            res.json({ success: false })
        }
    })
    .delete( async (req, res) => {
        const { id } = req.decoded
        const { cat } = req.headers
        const method = 'pull'
        try {
            res.json(await contr.updateCategories(cat, id, method))
        } catch (e) {
            console.error(e)
            res.json({ success: false })
        }
    })

module.exports = apiRouter