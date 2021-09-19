const mongoose = require('mongoose')
const conditionSchema = require('./schemas/conditionSchema')


const Condition = mongoose.model('Condition', conditionSchema)

module.exports = Condition