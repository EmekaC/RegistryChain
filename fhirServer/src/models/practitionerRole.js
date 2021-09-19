const mongoose = require('mongoose')
const roleSchema = require('./schemas/practitionerRoleSchema')


const PractitionerRole = mongoose.model('PractitonerRole', roleSchema)

module.exports = PractitionerRole