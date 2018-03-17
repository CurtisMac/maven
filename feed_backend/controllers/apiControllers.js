const jwt = require('jsonwebtoken')
const config = require('../config')
const User = require('../models/user')
const Article = require('../models/article')

const contr = {
    addToList: async (article, destination, id) => {
        try {
            const user = await User.findById(id)
            user[destination].push({
                articleId: article,
                read: false
            })
            user.save()
            return user[destination][0]
        } catch (e) {
            console.error(e)
            return {
                success: false,
                error: 'couldn\'t write to database'
            }
        }
    },

    getProfile: async (id) => {
        try {
            let data = await User.findById(id)
            return {
                languages: data.languages,
                categories: data.categories,
                currentSuggestions: data.currentSuggestions,
                excludedArticles: data.excludedArticles
            }
        } catch (e) {
            console.error(e)
            return {
                success: false,
                error: 'couldn\'t find user profile'

            }
        }
    },

    removeFromList: async (obj, destination, id) => {
        try {
            const user = await User.findById(id)
            user[destination].pull({
                _id: obj,
            })
            user.save()
            return 'success'
        } catch (e) {
            console.error(e)
            return {
                success: false,
                error: 'couldn\'t delete from database'
            }
        }
    },

    updateCategories: async (cat, id, method) => {
        try {
            const user = await User.findById(id)
            if (method === 'push') {
                user.categories.push(cat)
            } else if (method === 'pull') {
                user.categories.pull(cat)
            }
            user.save()
            return 'success'
        } catch (e) {
            console.error(e)
            return {
                success: false,
                error: 'couldn\'t access database'
            }
        }
    },

    veriftyJWT: (req, res, next) => {
        let { token } = req.headers
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
            return res.status(403).send({
                success: false,
                error: 'No token provided'
            })
        }
    },
}

module.exports = contr