const Article = require('../models/article')

const convertArticleIds = (array) => {
    return Promise.all(array.map(id => {
        return Article.findById(id)
    })
    ).then(function(articles){
        return articles
    })
}

module.exports = convertArticleIds 