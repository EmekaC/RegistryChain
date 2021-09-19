const mongoose = require('mongoose')


const locationSchema = new mongoose.Schema({
    address: {
        use: {
            type: String
        },
        _type: {
            type: String
        },
        text: {
            type: String
        },
        line: {
            type: String
        },
        city: {
            type: String
        },
        district: {
            type: String
        },
        state: {
            type: String
        },
        postalCode: {
            type: String
        },
        country: {
            type:  String
        },
        period: {
            start: {
                type: Date
            },
            end: {
                type: Date
            }
        }
    },
    position: {
        longitude: {
            type: Number
        },
        latitude: {
            type: Number
        },
        altitude: {
            type: Number
        }
    }
})


module.exports = locationSchema