const User = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require('../config')

const contr = {
    login: async (username, password) => {
        try {
            const user = await User.findOne({ username: username.toLowerCase() })
            if (user && user.password === password) {
                const payload = {id: user._id}
                const token = jwt.sign(payload, config.tokenKey, {
                    expiresIn: config.tokenExpiry 
                })
                return {
                    success: true,
                    token
                }
            } else {
                return { success: false }
            }
        } catch (e) {
            console.log(e)
            return { 
                success: false,
                error: true       
            }
        }
    }
}

module.exports = contr