const mongoose = require('mongoose')

//PHR schema for patient database containing PHR's details
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
    genotype: {
        type: String
    },
    blood_group: {
        type: String
    },
    nationality: {
        type: String
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Patient'
    }
})


//Call mongoose model method to initialize the PHR model
const PHR = mongoose.model('PHR', phrSchema)


//Export the PHR model
module.exports = PHR
