const mongoose = require('mongoose')


const practitionerSchema = new mongoose.Schema({
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
    },
    gender: {
        type: String
    },
    birthDate: {
        type: Date
    },
    photo: {
        contentType: {
            type: String
        },
        data: {
            type: String
        },
        url: {
            type: String
        },
        size: {
            type: String
        },
        hash: {
            type: String
        },
        title: {
            type: String
        },
        creation: {
            type: Date
        }
    },
    qualification: {
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
        code: {
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
        period: {
            start: {
                type: Date
            },
            end: {
                type: Date
            }
        },
        issuer: {
            type: String
        }
    },
    communication: {
        commonLanguages: {
            type: Array
        }
    }
})


//Hide important details
practitionerSchema.methods.toJSON = function () {
    const pract = this
    const practObject = pract.toObject()
    delete practObject.isDeleted

    return practObject
}

module.exports =  practitionerSchema