const mongoose = require('mongoose')
const organizationSchema = require('./schemas/organizationSchema')


const Organization = mongoose.model('Organization', organizationSchema)

module.exports = Organization