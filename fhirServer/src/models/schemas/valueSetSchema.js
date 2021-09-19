const mongoose = require('mongoose')


const valueSetSchema = new mongoose.Schema({
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
    immutable: {
        type: Boolean
    },
    purpose: {
        type: String
    },
    copyright: {
        type: String
    },
    compose: {
        lockedDate: {
            type: Date
        },
        inactive: {
            type: Boolean
        },
        include: {
            system: {
                type: String
            },
            version: {
                type: String
            },
            concept: {
                code: {
                    type: String
                },
                display: {
                    type: String
                }
            },
            designation: {
                language: {
                    type: String
                },
                use: {
                    type: String
                },
                value: {
                    type: String
                }
            },
            filter: {
                property: {
                    type: String
                },
                op: {
                    type: String
                },
                value: {
                    type: String
                }
            },
            valueSet: {
                type: String
            }
        },
        exclude: {
            code: {
                type: String
            }
        }
    },
    expansion: {
        identifier: {
            type: String
        },
        timestamp: {
            type: Date
        },
        total: {
            type: Number
        },
        offset: {
            type: Number
        },
        parameter: {
            name: {
                type: String
            },
            value: {
                type: String
            }
        },
        contains: {
            system: {
                type: String
            },
            abstract: {
                type: Boolean
            },
            inactive: {
                type: Boolean
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
            designation: {
                language: {
                    type: String
                },
                use: {
                    type: String
                },
                value: {
                    type: String
                }
            },
            contains: {
                type: String
            }
        }
    }
})


module.exports = valueSetSchema