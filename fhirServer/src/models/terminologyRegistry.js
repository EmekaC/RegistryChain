const mongoose = require('mongoose')
const codeSystemSchema = require('./schemas/codeSystemSchema')


const terminologyRegSchema = new mongoose.Schema({
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
    codeSystem: [codeSystemSchema],
    ccodeSystem: [codeSystemSchema],
    cccodeSystem: [codeSystemSchema]
})


//Hide important details
terminologyRegSchema.methods.toJSON = function () {
    const termReg = this
    const termRegObject = termReg.toObject()
    delete termRegObject.isDeleted

    return termRegObject
}


const TerminologyRegistry = mongoose.model('TerminologyRegistry', terminologyRegSchema)

module.exports = TerminologyRegistry