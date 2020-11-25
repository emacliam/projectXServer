const mongoose = require('mongoose')

const comment = mongoose.Schema({
    user: {
        id: String,
        name: String
    },
    productId: String,
    comment: String,
    timestamp: {
        type: Date,
        default: Date.now
    },
    reply: {
        type: String,
        default: null
    }

})

module.exports = mongoose.model('Comments', comment)