const User = require('../models/user')

const contr = {
    checkUsername: async (username) => {
        try {
            let user = await User.findOne({ username: username.toLowerCase() })
            return user ? 'taken' : 'available'
        } catch (e) {
            console.error(e)
            return {success: false}
        }
    },

    createAccount: async (username, password) => {
        try {
            let newUser = User({
                username: username.toLowerCase(),
                password
            })
            await newUser.save()
            return { success: true }
        } catch (e) {
            console.error(e)
            return {success: false}
        }
    },
}

module.exports = contr