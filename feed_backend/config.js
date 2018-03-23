const config = {
    updInt: 900000000,     //Max elapsed time (ms) before ranker.js will recalculate an article's rank
    tokenExpiry: '3d',
    tokenKey: 'secret',
    backDate: 604800000, //(ms) when a new category is added, new articles will be suggested going back no more than this
    maxArticlesTwingly: 20, //
    maxArticlesReturned: 10,
    minRank: 1000,
}

module.exports = config