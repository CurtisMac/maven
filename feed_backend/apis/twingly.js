const keys = require('./keys')
const axios = require('axios')
const parseString = require('xml2js').parseString
const ArticleObj = require('../methods/articleConstructor')

const twingly = ({ lang, query }) => {
    const url = `https://api.twingly.com/blog/search/api/v3/search?apikey=${keys.twingly}&q=${query}%20lang:${lang}%20sort:twinglyrank%20page-size:20`
    return axios.get(url)
        .then(response => {
            let rawData
            parseString(response.data, function (err, result) {
                rawData = result.twinglydata.post
            })
            const data = rawData.map(obj => {
                let newObj = new ArticleObj(
                    obj.title[0],
                    obj.author,
                    obj.url[0],
                    obj.publishedAt[0],
                    obj.text[0].substr(0, 250),
                    obj.languageCode[0],
                    'blog',
                    obj.blogName[0],
                    obj.blogUrl[0],
                    obj.tags[0].tag,
                    //obj.authority gets backlink information, prefer to get this off of another API, this is a workaround for API trial version limitations
                    obj.authority[0]
                )
                return newObj
            })
            return data
        })
        .catch(err => {
            console.log(err)
        })
}

module.exports = twingly