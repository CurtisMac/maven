const Article = require('../models/article')
const scraper = require('../methods/scraper')
const ranker = require('../methods/ranker')

const updateDB = async (array) => {
    try {
        await Promise.all(array.map(catObj => {
            return new Promise(async (resolve, reject) => {
                try {
                    const regex = new RegExp(catObj.name, 'i')
                    await Article.find({ tags: regex })
                        .exec(async (e, result) => {
                            try {
                                let ids = result.map(obj => {return obj._id})
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

module.exports = updateDB