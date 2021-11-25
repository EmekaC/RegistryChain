const mongoose = require('mongoose')
const validator = require('validator')


//Temporary schema for temporary patient;s database containing few details details
const tempSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowerCase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Please enter a valid email')
            }
        }
    },
    name: {
        given: {
            type: String,
            required: true
        }
    }
})


//Call mongoose model method to initialize the temporary model
const TemporaryDB = mongoose.model('TemporaryDB', tempSchema)


//Export the temporary model
module.exports = TemporaryDB
