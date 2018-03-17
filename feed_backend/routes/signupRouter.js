const express = require('express')
const signupRouter = express.Router()
const contr = require('../controllers/signupControllers')

signupRouter.route('/signup')
    .get(async (req, res) => {
        try {
            let { username } = req.query
        res.json(await contr.checkUsername(username))
        } catch (e) {
            res.json(e)
        }
    })
    .post(async (req, res) => {
        try {
            let { username, password } = req.body
            res.json(await contr.createAccount(username, password))
        } catch (e) {
            res.json(e)
        }
    })

module.exports = signupRouter