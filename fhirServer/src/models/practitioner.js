const mongoose = require('mongoose')
const practitionerSchema = require('./schemas/practitionerSchema')

 

const Practitioner = mongoose.model('Practitioner', practitionerSchema)

module.exports = Practitioner