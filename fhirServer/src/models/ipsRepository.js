const mongoose = require('mongoose')
const medSchema = require('./schemas/medicationStatementSchema')
const allergyIntSchema = require('./schemas/allergyIntoleranceSchema')
const conditionSchema = require('./schemas/conditionSchema')
const valueSetSchema = require('./schemas/valueSetSchema')


const ipsRepoSchema = new mongoose.Schema({
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
    _type: {
            type: String
    },
    timestamp: {
        type: String
    },
    total: {
        type: Number
    },
    link: {
        relation: {
            type: String
        },
        url: {
            type: String
        }
    },
    entry: {
        link: {
            type: String
        },
        fullUrl: {
            type: String
        },
        resource: {
            type: String
        },
        search: {
            mode: {
                type: String
            },
            score: {
                type: Number
            }
        },
        request: {
            method: {
                type: String
            },
            url: {
                type: String
            },
            ifNoneMatch: {
                type: String
            },
            ifModifiedSince: {
                type: String
            },
            ifMatch: {
                type: String
            },
            ifNoneExist: {
                type: String
            }
        },
        response: {
            status: {
                type: String
            },
            location: {
                type: String
            },
            etag: {
                type: String
            },
            lastModified: {
                type: String
            },
            outcome: {
                type: String
            }
        }
    },
    signature: {
        _type: {
            type: Array
        },
        when: {
            instant: {
                type: Date
            }
        },
        who: {
            type: String
        },
        onBehalfOf: {
            type: String
        },
        targetFormat: {
            type: String
        },
        sigFormat: {
            type: String
        },
        data: {
            type: Buffer
        }
    },
    medicationStatement: [medSchema],
    allergyIntolerance: [allergyIntSchema],
    condition: [conditionSchema],
    valueSet: [valueSetSchema]
})


//Hide important details
ipsRepoSchema.methods.toJSON = function () {
    const ipsRepo = this
    const ipsRepoObject = ipsRepo.toObject()
    delete ipsRepoObject.isDeleted
    
    return ipsRepoObject
}


const IPSRepository = mongoose.model('IPSRepository', ipsRepoSchema)

module.exports = IPSRepository