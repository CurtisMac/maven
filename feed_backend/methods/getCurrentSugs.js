const User = require('../models/user')
const Article = require('../models/article')
const scraper = require('../methods/scraper')
const ranker = require('../methods/ranker')
const updUserSug = require('../methods/updUserSug')

//recieves user id
//gets user categories
//updates DB for those categories
//queries DB for articles based on those categories and last updated date
//adds new articles to user's current articles

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
        //Update the DB for those categories
        const updateDB = async (array) => {
            try {
                await Promise.all(array.map(catObj => {
                    return new Promise(async (resolve, reject) => {
                        try {
                            const regex = new RegExp(catObj.name, 'i')
                            await Article.find({ tags: regex })
                                .exec(async (e, result) => {
                                    try {
                                        let ids = result.map(obj => {
                                            return obj._id
                                        })
                                        let rank = await ranker(ids)
                                        await scraper({ lang: 'en', query: catObj.name })
                                        if (rank) {
                                            resolve(true)
                                        }
                                    } catch (e) {
                                        if (e) {
                                            reject(false)
                                        }
                                    }
                                })
                        } catch (e) { console.error(e) }
                    }
                    )
                })
                )
            } catch (e) {
                console.error(e)
                return { success: false }
            }
            return { success: true }
        }

        await updateDB(cats.categories)

        //User cats from above to query DB for matching articles
        //Push those articles into user's currentCats array

        const updateUser = async (array) => {
            try {
                await Promise.all(array.map(catObj => {
                    return new Promise(async (resolve, reject) => {
                        try {
                            const regex = new RegExp(catObj.name, 'i')
                            await Article.find({ tags: regex })
                                .where('addDate').gte(catObj.lastUpdate)
                                .where('rank').gte(1000)
                                .exec(async (e, result) => {
                                    try {
                                        let ids = result.map(obj => {
                                            return String(obj._id)
                                        })   
                                        let update = await updUserSug(userId, ids)  
                                              
                                        
                                        if (update) {
                                            console.log('I did  update ' + catObj._id) 
                                            const cats = await User.findById(userId,
                                                'categories', (e, result) => {
                                                   result.categories
                                                }
                                            )
                                            User.update(
                                                {_id:userId, 'categories._id': catObj._id},
                                            {$set:{'categories.$.lastUpdate': Date.now()}}, e => {
                                                console.log(e)
                                            }
                                        )
                                            resolve(true)
                                        }
                                    } catch (e) {
                                        if (e) {
                                            reject(false)
                                        }
                                    }
                                })
                        } catch (e) { console.error(e) }
                    }
                    )
                })
                )
            } catch (e) {
                console.error(e)
                return { success: false }
            }
            return { success: true }
        }

        await updateUser(cats.categories)
        console.log('I want to be last!')
    } catch (e) {
        console.log(e)
    }
}

// getCurrentSugs('5aac717c16250d4570ec63c0')

module.exports = getCurrentSugs