const router = require('express').Router()
const Access = require('../models/AccessCodes')

// get request

router.get('/access', async (req, res) => {
  try {
    const access = await Access.find()
    res.json({
      success: true,
      access: access
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
})

module.exports = router
