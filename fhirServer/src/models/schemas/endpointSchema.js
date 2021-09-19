const mongoose = require('mongoose')


const endpointSchema = new mongoose.Schema({
    identifier: {
        use: {
            type: String
         },
        _type: {
            type: String
         },
        system: {
            type: String
        },
         value: {
            type: String
        },
        assigner: {
             type: String
        }
    },
    status: {
        type: String
    },
    connectionType: {
        type: String
    },
    name: {
        type: String
    },
    managingOrganization: {
        type: String
    },
    contact: {
        contactPoint: {
            system: {
                type: String
            },
            value: {
                type: String
            },
            use: {
                type: String
            },
            period: {
                start: {
                    type: Date
                },
                end: {
                    type: Date
                }
            }
        }
    },
     payloadType: {
        type: Array
    },
    payloadMimeType: {
        type: Array
    },
    address: {
        type: String
    },
    header: {
        type: String
    }
})


module.exports = endpointSchema