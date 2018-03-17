const twingly = require('../apis/twingly')
const Article = require('../models/article')
const ranker = require('./ranker')

const scraper = async ({ lang, query }) => {
    try {
        const data = await twingly({ lang, query })
        data.forEach(obj => {
            let newArticle = Article({
                title: obj.title,
                authors: obj.authors,
                url: obj.url,
                pubDate: obj.pubDate,
                summary: obj.summary,
                lang: obj.lang,
                rank: 0,
                rankData: {
                    lastUpdate: 15000000000,
                    //bklinks should not be added by the scraper, this is a workaround for API trial version limitations
                    backlinks: obj.bklinks,
                    facebook: 0,
                    pinterest: 0,
                    stumbleUpon: 0,
                    googlePlusOne: 0,
                    linkedIn: 0,
                    twitter: 0,
                    reddit: 0
                },
                src: {
                    type: obj.srcType,
                    title: obj.srcTitle,
                    url: obj.srcUrl,
                },
                tags: obj.tags
            })
            newArticle.save()
                .then(article => {
                    ranker([article._id])
                })
                .catch(err => {
                    console.log(err)
                })
        })
    } catch (err) {
        console.log(err)
    }
}

module.exports = scraper

    //Promise
    //Check when twingly was last scraped for specified query
    //If more than specified timeout, run twingly
    //Update db

