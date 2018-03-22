const User = require('../models/user')
const Article = require('../models/article')
const scraper = require('../methods/scraper')
const ranker = require('../methods/ranker')
const updUserSug = require('../methods/updUserSug')
const updateDB = require('./updateDB')
const updateUser = require('./updateUser')

const getCurrentSugs = async (userId) => {
    try {
        //Get user's current categories
        const cats = await User.findById(userId,
            'categories', (e) => {
                if (e) {
                    console.error(e)
                }
            }
        )
        //Ensure the DB has most recent articles for those categories
        await updateDB(cats.categories)

        //Once DB has updated, update the user profile with the recently add articles
        await updateUser(userId, cats.categories)
    } catch (e) {
        console.log(e)
    }
}

module.exports = getCurrentSugs