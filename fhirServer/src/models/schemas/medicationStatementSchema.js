const mongoose = require('mongoose')
const dosageSchema = require('./dosageSchema')


const medSchema = new mongoose.Schema({
    isDeleted: {
        type: Boolean,
        default: false
    },
    identifier: {
        use: {
            type: String
        },
        _type: {
            codeableConcept: {
                coding: {
                    system: {
                        type: String
                    },
                    version: {
                        type: String
                    },
                    code: {
                        type: String
                    },
                    display: {
                        type: String
                    },
                    userSelected: {
                        type: Boolean
                    }
                },
                text: {
                    type: String
                }
            }
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
    partOf: {
        type: Array
    },
    status: {
        type: String
    },
    statusReason: {
        type: Array
    },
    category: {
        type: String
    },
    medication: {
        medicationCodableConcept: {
            type: String
        },
        reference: {
            type: String
        }
    },
    subject: {
        type: String
    },
    context: {
        type: String
    },
    effective: {
        effectiveDateTime: {
            type: Date
        },
        effectivePeriod: {
            start: {
                type: Date
            },
            end: {
                type: Date
            }
        }
    },
    dateAsserted: {
        type: Date
    },
    informationSource: {
        type: String
    },
    reasonCode: {
        type: Array
    },
    reasonReference: {
        type: Array
    },
    note: {
        author: {
            authorReference: {
                type: String
            },
            authorString: {
                type: String
            }
        },
        time: {
            type: Date
        },
        text: {
            type: String
        }
    },
    dosage: [dosageSchema]
})


//Hide important details
medSchema.methods.toJSON = function () {
    const med = this
    const medObject = med.toObject()
    delete medObject.isDeleted

    return medObject
}


module.exports = medSchema