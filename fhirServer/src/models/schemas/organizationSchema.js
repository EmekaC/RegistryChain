const mongoose = require('mongoose')


const organizationSchema = new mongoose.Schema({
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
    _type: {
        organisationType: {
            type: Array
        }
    },
    name: {
        type: String
    },
    alias: {
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
                start: {
                    type: Date
                },
                end: {
                    type: Date
                }
            }
        }
    },
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
    partOf: {
        type: String
    },
    contact: {
        purpose: {
            type: Array
        },
        name: {
            humanName: {
                use: {
                    type: String
                },
                text: {
                    type: String
                },
                family: {
                    type: String
                },
                given: {
                    type: String
                },
                prefix: {
                    type: String
                },
                suffix: {
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
        }
    },
    endPoint: {
        type: String
    }
})


//Hide important details
organizationSchema.methods.toJSON = function () {
    const org = this
    const orgObject = org.toObject()
    delete orgObject.isDeleted

    return orgObject
}

module.exports = organizationSchema