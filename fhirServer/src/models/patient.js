require('dotenv').config()
const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const PHR = require('../models/phr')


//Patient schema for patient database containing patient's details
const patientSchema = new mongoose.Schema({
    isDeleted: {
        type: Boolean,
        default: false
    },
    isAssigned: {
        type: Boolean,
        default: false
    },
    identifier: {
        use: {
            type: String
        },
        _type: {
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
        use: {
            type: String,
            default: 'Official'
        },
        text: {
            type: String
        },
        family: {
            type: String,
            required: true
        },
        given: {
            type: String,
            required: true
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
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowerCase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Please enter a valid email')
            }
        }
    },
    password: {
        type: String,
        trim: true,
        required: true,
        minLength: 6,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error("Password can not include 'password'")
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    avatar: {
        type: Buffer
    },
    telecom: {
        system: {
            type: String,
            default: 'phone'
        },
        value: {
            type: String,
            required: true
        },
        use: {
            type: String,
            default: 'mobile'
        },
        period: {
            type: String
        }
    },
    gender: {
        type: String,
        required: true
    },
    birthDate: {
        type: Date
    },
    deceased: {
        deceasedBoolean: {
            type: Boolean
        },
        deceasedDateTime: {
            type: Date
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
    maritalStatus: {
        type: String
    },
    multipleBirth: {
        multipleBirthBoolean: {
            type: Boolean
        },
        multipleBirthInteger: {
            type: Number
        }
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
    contact: {
        relationship: {
            type: String
        },
        name: {
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
        },
        telecom: {
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
        organization: {
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
    },
    communication: {
        language: {
            type: String
        },
        preferred: {
            type: Boolean
        }
    },
    generalPractitioner: {
        type: String
    },
    managingOrganization: {
        type: String
    },
    link: {
        other: {
            type: String
        },
        type: {
            type: String
        }
    }
})


//Function to hide important details in the response that are sensitive and unimportant to the patient
patientSchema.methods.toJSON = function () {
    const patient = this
    const patientObject = patient.toObject()

    delete patientObject.isDeleted
    delete patientObject.isAssigned
    delete patientObject.password
    delete patientObject.tokens
    delete patientObject.avatar

    return patientObject
}


//Function to hash password
patientSchema.pre('save', async function (next) {
    const patient = this

    if (patient.isModified('password')) {
        patient.password = await bcrypt.hash(patient.password, 8)
    }
    next()
})


//Function for login credentials 
patientSchema.statics.findByCredentials = async (email, password) => {
    const patient = await Patient.findOne({ email, isDeleted: false })

    if (!patient) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, patient.password)

    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return patient
}


//Function to generate JWT for authentication at the point of login
patientSchema.methods.generateAuthToken = async function () {
    const patient = this
    const token = jwt.sign({ _id: patient._id.toString() }, process.env.PATIENT_JWT_SECRET, { expiresIn: '3 days' })
    
    patient.tokens = await patient.tokens.concat({ token })
    patient.name.text = await patient.name.given + ' ' + patient.name.family
    await patient.save()

    return token
}


//Link between patient and their PHR
patientSchema.virtual('phrs', {
    ref: 'PHR',
    localField: '_id',
    foreignField: 'owner'
})


//Delete patient PHR when patient is deleted
patientSchema.pre('remove', async function (next) {
    const patient = this
    await PHR.deleteMany({ owner: patient._id })
    next()
})


//Call mongoose model method to initialize the patient model
const Patient = mongoose.model('Patient', patientSchema)


//Export the patient model
module.exports = Patient
