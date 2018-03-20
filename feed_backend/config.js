const config = {
    updInt: 900000000,     //Max elapsed time (ms) before update ranker.js will recalculate an article's rank
    tokenExpiry: '3d',
    tokenKey: 'secret',
    backDate: 7889238000 //(ms) when a new category is added, new articles will be suggested going back no more than this
}

module.exports = config