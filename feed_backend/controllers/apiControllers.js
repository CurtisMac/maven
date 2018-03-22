const jwt = require('jsonwebtoken')
const config = require('../config')
const User = require('../models/user')
const Article = require('../models/article')
const scraper = require('../methods/scraper')
const convertArticleIds = require('../methods/convertArticleIds')
const getCurrentSugs = require('../methods/getCurrentSugs')

const contr = {

    getArticles: async (id) => {
        try {
            const ids = await User.findById(id, 'currentSuggestions', (e) => {
                if (e) {
                    console.error(e)
                }
            })
            let articles = await convertArticleIds(ids.currentSuggestions)
            return articles
        } catch (e) {
            console.error(e)
            return {
                success: false,
                error: 'couldn\'t query database'
            }
        }
    },

    getProfile: async (id) => {
        try {
            await getCurrentSugs(id)
            let data = await User.findById(id)
            let articles = await convertArticleIds(data.currentSuggestions)
            return {
                languages: data.languages,
                categories: data.categories.map((obj)=>{
                    return {
                            name: obj.name,
                            id: obj._id    
                        }
                }),
                toRead: data.toRead,
                username: data.username,
                haveRead: data.haveRead,
                articles: articles
            }
        } catch (e) {
            console.error(e)
            return {
                success: false,
                error: 'couldn\'t find user profile'
            }
        }
    },

    updateUserArray: async (data, method, array, id) => {
        console.log('updateUserArray called')
        try {
            const user = await User.findById(id)
            if (method === 'push') {
                console.log(id)
                user[array].push(data)
            } else if (method === 'pull') {
                user[array].pull(data)
            }
            user.save()
            return { success: true }
        } catch (e) {
            console.error(e)
            return {
                success: false,
                error: 'couldn\'t access database'
            }
        }
    },

    veriftyJWT: (req, res, next) => {
        let { token } = req.body
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
    },
}

module.exports = contr