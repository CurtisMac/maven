const keys = require('./keys')
const axios = require('axios')

const sharedCount = (queryUrl) => {
    const url = `https://api.sharedcount.com/v1.0/?url=${queryUrl}&apikey=${keys.sharedCont}`
    return axios.get(url)
        .then(response => {
            let count = response.data
            let fbScore = count.Facebook.share_count + count.Facebook.comment_count / 2 + count.Facebook.comment_count / 2 + count.Facebook.reaction_count / 4
            return ({
                facebook: Math.floor(fbScore),
                pinterest: (count.Pinterest || 0),
                stumbleUpon: (count.StumbleUpon || 0),
                linkedIn: (count.LinkedIn || 0),
                googlePlusOne: (count.GooglePlusOne || 0)
            })
        })
}


module.exports = sharedCount