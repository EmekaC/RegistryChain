require('dotenv').config()
const jwt = require('jsonwebtoken')
const Patient = require('../models/patient')


//Verification of JWT to give access to a patient to other parts of their account and perform operations
const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.PATIENT_JWT_SECRET)
        const patient = await Patient.findOne({ _id: decoded._id, 'tokens.token': token })
        
        if (!patient) {
            throw new Error()
        }

        req.token = token
        req.patient = patient
        req.decoded = decoded
        next()
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate' })
    }
}


module.exports = auth
