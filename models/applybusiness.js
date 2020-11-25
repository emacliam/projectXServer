const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ApplyBusiness = new Schema({
  FirstName: {
    type: String
  },
  LastName: {
    type: String
  },
  Email: {
    type: String
  },
  PhoneNumber: {
    type: String
  },
  MobileNumber: {
    type: String
  },
  CompanyName: {
    type: String
  },
  Category: {
    type: String
  },
  SocialMedia: {
    type: String
  },
  VATRegistered: {
    type: String
  },
  MonthlyRevenue: {
    type: String
  },
  BusinessOwnerFName: {
    type: String
  },
  BusinessOwnerLName: {
    type: String
  },
  BusinessOwnerEmail: {
    type: String
  },
  ProductsInfo: {
    type: String
  },
  TypeofBrands: {
    type: String
  },
  StockQn: {
    type: String
  },
  PhysicalStoreQn: {
    type: String
  },
  SupplierQn: {
    type: String
  },
  AdditionalInfo: {
    type: String
  },
  date: {
    type: Date
  },
  status: {
    type: String
  }

})

module.exports = mongoose.model('Apply', ApplyBusiness)
