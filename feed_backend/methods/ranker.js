const sharedCount = require('../apis/sharedCount')
const Article = require('../models/article')
const config = require('../config')

const ranker = async (idArray) => {
    try {
        await Promise.all(idArray.map(id => {
            return new Promise(async (resolve, reject) => {
                try {
                    const article = await Article.findById(id)
                    if (article.rankData.lastUpdate + config.updInt < Date.now()) {
                        const socialData = await sharedCount(article.url)
                        /*other api's here*/
                        const sumOfSocialData = Object.values(socialData).reduce((a, c) => a + c, article.rankData.backlinks)
                        Article.findByIdAndUpdate(id,
                            {
                                rank: sumOfSocialData,
                                rankData: {
                                    lastUpdate: Date.now(),
                                    facebook: socialData.facebook,
                                    pinterest: socialData.pinterest,
                                    googlePlusOne: socialData.googlePlusOne,
                                    linkedIn: socialData.linkedIn,
                                    stumbleUpon: socialData.stumbleUpon,
                                    backlinks: article.rankData.backlinks
                                }
                            },
                            (e, doc) => {
                                if (e) {
                                    console.log(e)
                                } else {
                                    resolve({ success: true })
                                }
                            }
                        )
                    } else {
                        resolve({ success: true })
                        console.log(`${id} is up to date`)
                    }
                } catch (e) {
                    if (e) {
                        reject({ success: false })
                    }
                }
            })

        })
        )
    } catch (e) {
        console.error(e)
        return { success: false }
    }
    return { success: true }
}

module.exports = ranker