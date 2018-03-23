const User = require('../models/user')
const Article = require('../models/article')
const updUserSug = require('../methods/updUserSug')

//Takes array of categories and updates user's profile for those categories

const updateUser = async (userId, array) => {
    try {
        await Promise.all(array.map(catObj => {
            return new Promise(async (resolve, reject) => {
                try {
                    const regex = new RegExp(catObj.name, 'i')
                    await Article.find({ tags: regex })
                        .where('addDate').gte(catObj.lastUpdate)
                        .where('rank').gte(0)
                        .exec(async (e, result) => {
                            try {
                                let ids = result.map(obj => {
                                    return String(obj._id)
                                })
                                let update = updUserSug(userId, ids)
                                if (update) {
                                    console.log('I did  update ' + catObj._id)
                                    const cats = await User.findById(userId,
                                        'categories', (e, result) => {
                                            result.categories
                                        }
                                    )
                                    User.update(
                                        { _id: userId, 'categories._id': catObj._id },
                                        { $set: { 'categories.$.lastUpdate': Date.now() } }, e => {
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

module.exports = updateUser