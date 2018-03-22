const User = require('../models/user')
const Article = require('../models/article')

const updUserSug = async (userId, artIdArray) => {
    try {
        await Promise.all(artIdArray.map(art => {
            return new Promise(async (resolve, reject) => {
                try {
                    User.update(
                        { _id: userId },
                        {$addToSet: {currentSuggestions: [art]}}
                    )
                    .then(resolve(true))
                } catch (e) {
                    resolve('{ success: false }')
                    console.error(e)
                }
            })
        })
        )
        return { success: true }
    } catch (e) {
        reject({ success: false })
        console.error(e)
        return { success: false }
    }
}

module.exports = updUserSug