const mongoose = require('mongoose')
// const medSchema = require('./schemas/medicationStatementSchema')
// const allergyIntSchema = require('./schemas/allergyIntoleranceSchema')
// const conditionSchema = require('./schemas/conditionSchema')
// const valueSetSchema = require('./schemas/valueSetSchema')


// const phrSchema = new mongoose.Schema({
//     isDeleted: {
//         type: Boolean,
//         default: false
//     },
//     identifier: {
//         use: {
//             type: String
//         },
//         _type: {
//             coding: {
//                 system: {
//                     type: String
//                 },
//                 version: {
//                     type: String
//                 },
//                 code: {
//                     type: String
//                 },
//                 display: {
//                     type: String
//                 },
//                 userSelected: {
//                     type: Boolean
//                 }
//             },
//             text: {
//                 type: String
//             }
//          },
//         system: {
//             type: String
//         },
//         value: {
//             type: String
//         },
//         assigner: {
//             type: String
//         }
//     }, 
//     _type: {
//             type: String
//     },
//     timestamp: {
//         type: String
//     },
//     total: {
//         type: Number
//     },
//     link: {
//         relation: {
//             type: String
//         },
//         url: {
//             type: String
//         }
//     },
//     entry: {
//         link: {
//             type: String
//         },
//         fullUrl: {
//             type: String
//         },
//         resource: {
//             type: String
//         },
//         search: {
//             mode: {
//                 type: String
//             },
//             score: {
//                 type: Number
//             }
//         },
//         request: {
//             method: {
//                 type: String
//             },
//             url: {
//                 type: String
//             },
//             ifNoneMatch: {
//                 type: String
//             },
//             ifModifiedSince: {
//                 type: String
//             },
//             ifMatch: {
//                 type: String
//             },
//             ifNoneExist: {
//                 type: String
//             }
//         },
//         response: {
//             status: {
//                 type: String
//             },
//             location: {
//                 type: String
//             },
//             etag: {
//                 type: String
//             },
//             lastModified: {
//                 type: String
//             },
//             outcome: {
//                 type: String
//             }
//         }
//     },
//     signature: {
//         _type: {
//             type: Array
//         },
//         when: {
//             instant: {
//                 type: Date
//             }
//         },
//         who: {
//             type: String
//         },
//         onBehalfOf: {
//             type: String
//         },
//         targetFormat: {
//             type: String
//         },
//         sigFormat: {
//             type: String
//         },
//         data: {
//             type: Buffer
//         }
//     },
//     medicationStatement: [medSchema],
//     allergyIntolerance: [allergyIntSchema],
//     condition: [conditionSchema],
//     valueSet: [valueSetSchema],
//     owner: {
//         type: mongoose.Schema.Types.ObjectId,
//         required: true,
//         ref: 'Patient'
//     }
// })


const phrSchema = new mongoose.Schema({
    recurring_records: [{
        physical_examinations: {
            date: {
                type: Date
            },
            resource_type: {
                type: String
            },
            resource_name: {
                type: String
            },
            resource_code: {
                type: String
            },
            resource_performer: {
                type: String
            },
            resource_value: {
                type: String
            },
            resource_body_site: {
                type: String
            },
            resource_interpretation: {
                type: String
            }
        },
        diagnosis: {
            date: {
                type: Date
            },
            resource_type: {
                type: String
            },
            resource_name: {
                type: String
            },
            resource_code: {
                type: String
            },
            resource_performer: {
                type: String
            },
            resource_severity: {
                type: String
            },
            resource_note: {
                type: String
            }
        },
        drug_prescription: {
            date: {
                type: Date
            },
            resource_type: {
                type: String
            },
            resource_name: {
                type: String
            },
            resource_code: {
                type: String
            },
            resource_reason_name: {
                type: String
            },
            resource_reason_code: {
                type: String
            },
            resource_dosage: {
                type: String
            },
            resource_note: {
                type: String
            }
        }
    }],
    fixed_records: [{
        family_member_history: {
            relationship: {
                type: String
            },
            age: {
                type: Number
            },
            gender: {
                type: String
            },
            condition_name: {
                type: String
            },
            condition_code: {
                type: String
            },
            note: {
                type: String
            }
        },
        procedures: {
            date: {
                type: Date
            },
            procedure_name: {
                type: String
            },
            procedure_code: {
                type: String
            },
            procedure_performer: {
                type: String
            },
            procedure_reason_name: {
                type: String
            },
            procedure_reason_code: {
                type: String
            },
            procedure_note: {
                type: String
            }
        },
        medication_statements: {
            status: {
                type: String
            },
            status_reason: {
                type: String
            },
            medication_name: {
                type: String
            },
            medication_code: {
                type: String
            },
            effective: {
                type: String
            },
            medication_reason_name: {
                type: String
            },
            medication_reason_code: {
                type: String
            },
            medication_dosage: {
                type: String
            },
            note: {
                type: String
            }
        },
        allergy_intolerance: {
            clinical_status: {
                type: String
            },
            type: {
                type: String
            },
            criticality: {
                type: String
            },
            allergy_name: {
                type: String
            },
            allergy_code: {
                type: String
            },
            onset: {
                type: String
            },
            last_occurrence: {
                type: String
            },
            reaction_severity: {
                type: String
            },
            note: {
                type: String
            }
        }
    }],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Patient'
    }
})


// //Hide important details
// phrSchema.methods.toJSON = function () {
//     const phr = this
//     const phrObject = phr.toObject()
//     delete phrObject.isDeleted
    
//     return phrObject
// }


const PHR = mongoose.model('PHR', phrSchema)

module.exports = PHR