const mongoose = require('mongoose')


const allergyIntSchema = new mongoose.Schema({
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
        type: String
    },
    _type: {
        type: String
    },
    category: {
        type: Array
    },
    criticality: {
        type: String
    },
    code: {
        type: String
    },
    patient: {
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
    recordedDate: {
        type: Date
    },
    recorder: {
        type: String
    },
    asserter: {
        type: String
    },
    lastOccurence: {
        type: Date
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
    reaction: {
        substance: {
            type: String
        },
        manifestation: {
            type: Array
        },
        description: {
            type: String
        },
        onset: {
            type: Date
        },
        severity: {
            type: String
        },
        exposureRouter: {
            type: String
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
    }
})


//Hide important details
allergyIntSchema.methods.toJSON = function () {
    const allergy = this
    const allergyObject = allergy.toObject()
    delete allergyObject.isDeleted

    return allergyObject
}


module.exports = allergyIntSchema