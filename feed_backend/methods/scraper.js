const twingly = require('../apis/twingly')
const Article = require('../models/article')
const Tracker = require('../models/queryTracker')
const ranker = require('./ranker')

const scraper = async ({ lang, query }) => {
    try {
        //add logic that will check when query was last updated (if it exists) and only rescrape if necessary
        const data = await twingly({ lang, query })
        data.forEach(obj => {
            let newArticle = Article({
                title: obj.title,
                authors: obj.authors,
                url: obj.url,
                pubDate: new Date(obj.pubDate),
                addDate: Date.now(),
                summary: obj.summary,
                lang: obj.lang,
                rank: 0,
                rankData: {
                    lastUpdate: 15000000000,
                    //bklinks should not be added by the scraper, this is a workaround due to API trial version limitations
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
                .catch(e => {
                    if(e){
                    console.error(e)
                    }
                })
        })
        Tracker.findOneAndUpdate(
            { query: query },
            { lastRun: Date.now() },
            { upsert: true },
            function (e, doc) {
                if(e){
                console.error(e)}
            }
        )
        return {
            success: true
        }
    } catch (e) {
        console.error(e)
        return {
            success: false
        }
    }
}

module.exports = scraper


