const mongoose = require('mongoose')


const healthcareSchema = new mongoose.Schema({
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
    providedBy: {
        organization: {
            type: String
        }
    },
    category: {
        type: Array
    },
    _type: {
        type: Array
    },
    location: {
        type: String
    },
    name: {
        type: String
    },
    comment: {
        type: String
    },
    extraDetails: {
        type: String
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
    coverageArea: {
        location: {
            type: String
        }
    },
    serviceProvisionCode: {
        type: Array
    },
    eligibility: {
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
        comment: {
            type: String
        }
    },
    program: {
        type: String
    },
    characteristic: {
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
        }
    },
    communication: {
        commonLanguage: {
            type: Array
        }
    },
    referralMethod: {
        type: Array
    },
    appointmentRequired: {
        type: Boolean
    },
    availableTime: {
        daysOfWeek: {
            type: Array
        },
        allDay: {
            type: Boolean
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
    endpoint: {
        type: String
    }
})


module.exports = healthcareSchema