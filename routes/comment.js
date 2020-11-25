const router = require('express').Router()
const Comments = require('../models/comments');
const verifyToken = require('../middlewares/verify-token')

router.get('/comments/:id', async(req, res) => {
    try {
        const comments = await Comments.find({ productId: req.params.id })
        res.json({
            success: true,
            comments: comments
        })
    } catch (err) {
        res.json({
            success: false,
            message: "Not found"
        })
    }
})

//get all comments
router.get('/comments', async(req, res) => {
    try {
        const comments = await Comments.find()
        res.json({
            success: true,
            comments: comments
        })
    } catch (err) {
        res.json({
            success: false,
            message: "Not found"
        })
    }
})

router.post('/comments/:id', async(req, res) => {
    try {
        const comment = await Comments.findOne({ _id: req.params.id });
        console.log(comment)
        if (comment) {
            if (req.body.reply) comment.reply = req.body.reply
            const comments = await comment.save()
            res.json({
                success: true,
                comments: comments
            })
        }
    } catch (err) {
        res.json({
            success: false,
            message: err.message
        })
    }
})

module.exports = router