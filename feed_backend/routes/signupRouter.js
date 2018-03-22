const express = require('express')
const signupRouter = express.Router()
const contr = require('../controllers/signupControllers')

signupRouter.route('/')
    .post(async (req, res) => {
        try {
            let { username } = req.body
        res.json(await contr.checkUsername(username))
        } catch (e) {
            res.json(e)
        }
    })
    .put(async (req, res) => {
        console.log(req.body)
        try {
            let { username, password } = req.body
            res.json(await contr.createAccount(username, password))
        } catch (e) {
            res.json(e)
        }
    })

module.exports = signupRouter