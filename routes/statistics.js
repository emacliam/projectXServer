const router = require('express').Router();
const Product = require('../models/products');
const verifyToken = require('../middlewares/verify-token');



router.get('/stats', verifyToken, async(req, res) => {
    try {

        const products = await Product.find({ owner: req.decoded._id });
        const prod = [];


        await products.forEach(product => {
            prod.push(product.date)

        })

        result = prod.reduce((a, c) => (a[c] = (a[c] || 0) + 1, a), Object.create(null));

        res.json({
            success: true,
            result: result,
            products: products
        })
    } catch (err) {
        res.json({
            success: false,
            message: err.message
        })
    }
})


module.exports = router;