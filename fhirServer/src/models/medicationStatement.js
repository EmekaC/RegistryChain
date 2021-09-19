const mongoose = require('mongoose')
const medSchema = require('./schemas/medicationStatementSchema')



const MedicationStatement = mongoose.model('MedicationStatement', medSchema)

module.exports = MedicationStatement