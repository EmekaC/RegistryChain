const mongoose = require('mongoose')


const codeSystemSchema = new mongoose.Schema({
    url: {
        type: String
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
    version: {
        type: String
    },
    name: {
        type: String
    },
    title: {
        type: String
    },
    status: {
        type: String
    },
    experimental: {
        type: Boolean
    },
    date: {
        type: Date
    },
    publisher: {
        type: String
    },
    contact: {
        contactDetail: {
            name: {
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
            }
        }
    },
    description: {
        type: String
    },
    useContext: {
        code: {
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
            }
        },
        value: {
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
        }
    },
    jurisdiction: {
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
    purpose: {
        type: String
    },
    copyright: {
        type: String
    },
    caseSensitive: {
        type: Boolean
    },
    valueSet: {
        trype: String
    },
    hierarchyMeaning: {
        type: String
    },
    compositional: {
        type: Boolean
    },
    versionNeeded: {
        type: Boolean
    },
    content: {
        type: String
    },
    supplements: {
        type: String
    },
    count: {
        type: String
    },
    filter: {
        code: {
            type: String
        },
        operator: {
            type: String
        },
        value: {
            type: String
        }
    },
    property: {
        code: {
            type: String
        },
        uri: {
            type: String
        },
        description: {
            type: String
        },
        _type: {
            type: String
        }
    },
    concept: {
        code: {
            type: String
        },
        display: {
            type: String
        },
        definition: {
            type: String
        },
        designation: {
            language: {
                type: String
            },
            use: {
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
                }
            },
            value: {
                type: String
            }
        },
        property: {
            code: {
                type: String
            },
            value: {
                type: String
            }
        },
        concept: {
            type: Array
        }
    }
})


//Hide important details
codeSystemSchema.methods.toJSON = function () {
    const code = this
    const codeObject = allergy.toObject()
    delete codeObject.isDeleted

    return codeObject
}

module.exports = codeSystemSchema