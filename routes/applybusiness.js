const router = require('express').Router()
const nodemailer = require('nodemailer')
const { fromString } = require('uuidv4')

const axios = require('axios')

const Apply = require('../models/applybusiness')
const Access = require('../models/AccessCodes')

const accountSid = process.env.TWILIO_ACCOUNT_SID
const autheToken = process.env.TWILIO_AUTH_TOKEN
const client = require('twilio')(accountSid, autheToken)

router.post('/apply', async (req, res) => {
  try {
    const apply = new Apply()
    /* first section */
    apply.FirstName = req.body.FirstName
    apply.LastName = req.body.LastName
    apply.Email = req.body.Email
    apply.PhoneNumber = req.body.PhoneNumber
    apply.MobileNumber = req.body.MobileNumber
    /* second section */
    apply.CompanyName = req.body.CompanyName
    apply.Category = req.body.Category
    apply.SocialMedia = req.body.SocialMedia
    apply.VATRegistered = req.body.VATRegistered
    apply.MonthlyRevenue = req.body.MonthlyRevenue
    /* third section */
    apply.BusinessOwnerFName = req.body.BusinessOwnerFName
    apply.BusinessOwnerLName = req.body.BusinessOwnerLName
    apply.BusinessOwnerEmail = req.body.BusinessOwnerEmail
    /* section four */
    apply.ProductsInfo = req.body.ProductsInfo
    apply.TypeofBrands = req.body.TypeofBrands
    apply.StockQn = req.body.StockQn
    apply.PhysicalStoreQn = req.body.PhysicalStoreQn
    apply.SupplierQn = req.body.SupplierQn
    apply.AdditionalInfo = req.body.AdditionalInfo
    apply.date = Date.now()
    apply.status = 'New'

    await apply.save()
    res.json({
      success: true,
      message: 'successfully saved'
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
})

router.get('/apply', async (req, res) => {
  try {
    const apply = await Apply.find()
    res.json({
      success: true,
      apply: apply
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
})

router.get('/apply/:id', async (req, res) => {
  try {
    const apply = await Apply.findOne({ _id: req.params.id })
    res.json({
      success: true,
      apply: apply
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
})

// post access codes to email using nodemailer
router.post('/apply/send/:email', async (req, res) => {
  try {
    const AccessCode = fromString(req.params.email)
    const response = await Access.findOne({ accesscode: AccessCode })
    if (response === null || response.accesscode !== AccessCode) {
      const access = new Access()
      access.accesscode = AccessCode
      await access.save()
      console.log('saved')
    } else if (response.accesscode === AccessCode) {
      console.log('match found we do not save')
    }

    const output = `
<p> you have been accepted to sell on the Product Finder platform<p/>
<p>Your Access Code is :<p/>
<b>${AccessCode}<b/>
<p>NOTE: Use this code on signup<p/>
<p>Thank You<p/>
<a href="#">Click Here to go to ProductLocator<a>
<p>Please do not reply to this email use our official contact details on our platform<p/>
    `

    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      service: 'gmail', // true for 465, false for other ports
      auth: {
        user: 'mushyp1608@gmail.com', // generated ethereal user
        pass: 'emacl1608' // generated ethereal password
      },
      tls: {
        rejectUnauthorized: false
      }
    })

    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: '"Product Locator" <rosalyn.dickens@ethereal.email>', // sender address
      to: req.params.email, // list of receivers
      subject: 'Sellers Application Accept', // Subject line
      text: 'Regards', // plain text body
      html: output // html body
    })

    res.json({
      success: true,
      message: 'successfully send Email'
    })

    console.log('Message sent: %s', info.messageId)
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
})

// send access codes to phone using twilio
router.post('/apply/send/phone/:number/:email', async (req, res) => {
  try {
    const AccessCode = fromString(req.params.email)
    const response = await Access.findOne({ accesscode: AccessCode })
    if (response === null || response.accesscode !== AccessCode) {
      const access = new Access()
      access.accesscode = AccessCode
      await access.save()
      console.log('saved')
    } else if (response.accesscode === AccessCode) {
      console.log('match found we do not save')
    }

    await client.messages.create({
      body: 'Message From ProductLocator:Your Sellers Application was Accepted.HERE is your AccessCode' + ' ' + fromString(req.params.email) + ' ' + 'Use this on Signup',
      from: '+12016895929',
      to: '+2630784675999'
    })

    res.json({
      success: true,
      message: 'successfully send'
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
})

/* get list of countries */
/* i am calling an external api without cors policy so i decided to call it in the server not frontend for security purposes */
router.get('/countries', async (req, res) => {
  try {
    const response = await axios.get('https://restcountries.eu/rest/v2/all')

    res.json(response.data)
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
})

module.exports = router
