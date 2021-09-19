const mongoose = require('mongoose')


const dosageSchema = new mongoose.Schema({
    dosage: {
        sequence: {
            type: Number
        },
        text: {
            type: String
        },
        additionalInstruction: {
            type: Array
        },
        patientInstruction: {
            type: String
        },
        timing: {
            event: {
                type: Date
            },
            code: {
                type: String
            }
        },
        asNeeded: {
            asNeededBoolean: {
                type: Boolean
            },
            asNeededCodeableConcept: {
                type: String
            }
        },
        site: {
            type: String
        },
        route: {
            type: String
        },
        method: {
            type: String
        },
        doseAndRate: {
            _type: {
                type: String
            },
            dose: {
                doseRange: {
                    low: {
                        type: Number
                    },
                    high: {
                        type: Number
                    }
                },
                doseQuantity: {
                    type: Number
                }
            },
            rate: {
                rateRatio: {
                    numerator: {
                        type: Number
                    },
                    denominator: {
                        type: Number
                    }
                },
                rateRange: {
                    low: {
                        type: Number
                    },
                    high: {
                        type: Number
                    }
                },
                rateQuantity: {
                    type: Number
                }
            }
        },
        maxDosePerPeriod: {
            numerator: {
                type: Number
            },
            denominator: {
                type: Number
            }
        },
        maxDosePerAdministration: {
            type: Number
        },
        maxDosePerLifetime: {
            type: Number
        }
    }
})


module.exports = dosageSchema