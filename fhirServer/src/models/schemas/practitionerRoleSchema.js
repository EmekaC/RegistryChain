const mongoose = require('mongoose')


const roleSchema = new mongoose.Schema({
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
    active: {
        type: Boolean
    },
    period: {
        start: {
            type: Date
        },
        end: {
            type: Date
        }
    },
    practitioner: {
        type: String
    },
    organization: {
        type: String
    },
    code: {
        type: Array
    },
    specialty: {
        type: Array
    },
    location: {
        type: String
    },
    healthcareService: {
        type: String
    },
    telecom: {
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
                type: String
            }
        }
    },
    availableTime: {
        daysOfWeek: {
            type: Array
        },
        availableStartTime: {
            type: Date
        },
        availableEndTime: {
            type: Date
        }
    },
    notAvailable: {
        description: {
            type: String
        },
        during: {
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
    endPoint: {
        type: String
    }
})


//Hide important details
roleSchema.methods.toJSON = function () {
    const role = this
    const roleObject = role.toObject()
    delete roleObject.isDeleted

    return roleObject
}


module.exports = roleSchema