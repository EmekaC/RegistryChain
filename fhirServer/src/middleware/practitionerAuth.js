require('dotenv').config()
const jwt = require('jsonwebtoken')
const Practitioner = require('../models/practitioner')


//Verification of JWT to give access to a practitioner to other parts of their account and perform operations
const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.PRACTITIONER_JWT_SECRET)
        const practitioner = await Practitioner.findOne({ _id: decoded._id, isDeleted: false, 'tokens.token': token })
        
        if (!practitioner) {
            throw new Error()
        }

        req.token = token
        req.practitioner = practitioner
        next()
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate' })
    }
}


module.exports = auth
