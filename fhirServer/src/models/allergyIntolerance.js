const mongoose = require('mongoose')
const allergyIntSchema = require('./schemas/allergyIntoleranceSchema')



const AllergyIntolerance = mongoose.model('AllergyIntolerance', allergyIntSchema)

module.exports = AllergyIntolerance