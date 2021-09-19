const mongoose = require('mongoose')


const conditionSchema = new mongoose.Schema({
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
    clinicalStatus: {
        type: String
    },
    verificationStatus: {
        type: Array
    },
    category: {
        type: String
    },
    severity: {
        type: String
    },
    code: {
        type: String
    },
    bodySite: {
        type: String
    },
    subject: {
        type: String
    },
    encounter: {
        type: String
    },
    onset: {
        onsetDateTime: {
            type: Date
        },
        onsetAge: {
            type: Number
        },
        onsetPeriod: {
            start: {
                type: Date
            },
            end: {
                type: Date
            }
        },
        onsetRange: {
            high: {
                type: Number
            },
            low: {
                type: Number
            }
        },
        onsetString: {
            type: String
        }
    },
    abatement: {
        abatementDate: {
            type: Date
        },
        abatementAge: {
            type: Number
        },
        abatementPeriod: {
            start: {
                type: Date
            },
            end: {
                type: Date
            }
        },
        abatementRange: {
            high: {
                type: Number
            },
            low: {
                type: Number
            }
        },
        abatementString: {
            type: String
        }
    },
    recordedDate: {
        type: Date
    },
    recorder: {
        type: String
    },
    asserter: {
        type: String
    },
    stage: {
        summary: {
            type: String
        },
        _type: {
            type: String
        },
        asessment: {
            type: String
        }
    },
    evidence: {
        code: {
            type: String
        },
        detail: {
            type: String
        }
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
    }
})


//Hide important details
conditionSchema.methods.toJSON = function () {
    const con = this
    const conObject = con.toObject()
    delete conObject.isDeleted

    return conObject
}


module.exports = conditionSchema