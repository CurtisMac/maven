const express = require('express')
const loginRouter = express.Router()
const contr = require('../controllers/loginControllers')

loginRouter.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body
        res.json(await contr.login(username, password))
    } catch (e) {
        res.json(e)
    }
})

module.exports = loginRouter

