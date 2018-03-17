const sharedCount = require('../apis/sharedCount')
const Article = require('../models/article')
const config = require('../config')

const ranker = (idArray) => {
    idArray.forEach(async id => {
        const article = await Article.findById(id)
        if (article.rankData.lastUpdate + config.updInt < Date.now()) {
            const socialData = await sharedCount(article.url)
            //other api calls here
            const total = Object.values(socialData).reduce((a, c) => a + c, article.rankData.backlinks)
            Article.findByIdAndUpdate(id,
                {
                    rank: total,
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
                function (err, doc) {
                    console.log(err)
                }
            )
        } else {
            console.log(`${id} is up to date`)
            return
        }
    })
}

module.exports = ranker