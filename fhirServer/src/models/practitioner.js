require('dotenv').config()
const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


//Practitioner schema for patient database containing practitioner's details
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
            },
            text: {
                type: String
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
            type: String
        }
    }
})


//Function to hide important details in the response that are sensitive and unimportant to the practitioner
practitionerSchema.methods.toJSON = function () {
    const practitioner = this
    const practitionerObject = practitioner.toObject()
    delete practitionerObject.isDeleted
    delete practitionerObject.password
    delete practitionerObject.tokens
    delete practitionerObject.avatar

    return practitionerObject
}


//Function to hash password
practitionerSchema.pre('save', async function (next) {
    const practitioner = this

    if (practitioner.isModified('password')) {
        practitioner.password = await bcrypt.hash(practitioner.password, 8)
    }
    next()
})


//Function for login credentials
practitionerSchema.statics.findByCredentials = async (email, password) => {
    const practitioner = await Practitioner.findOne({ email, isDeleted: false })

    if (!practitioner) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, practitioner.password)

    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return practitioner
}


//Function to generate JWT for authentication at the point of login
practitionerSchema.methods.generateAuthToken = async function () {
    const practitioner = this
    const token = jwt.sign({ _id: practitioner._id.toString() }, process.env.PRACTITIONER_JWT_SECRET, { expiresIn: '3 days' })
    
    practitioner.tokens = await practitioner.tokens.concat({ token })
    practitioner.name.text = await practitioner.name.given + ' ' + practitioner.name.family
    await practitioner.save()

    return token
}


//Call mongoose model method to initialize the practitioner model
const Practitioner = mongoose.model('Practitioner', practitionerSchema)


//Export the practitioner model
module.exports = Practitioner
