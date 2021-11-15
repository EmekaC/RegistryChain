const express = require('express')
const PHR = require('../models/phr')
const auth1 = require('../middleware/practitionerAuth')
const auth = require('../middleware/patientAuth')


const router = new express.Router()


//Create
router.post('/phrs', auth1, async (req, res) => {
    const phr = await new PHR(req.body)

    try {
        await phr.save()
        res.status(201).send(phr)
    } catch (e) {
        res.status(400).send(e)
    }
})


//Practitioner: read all
router.get('/phrs', auth1, async (req, res) => {
    try {
        const phr = await PHR.find(req.body, { isDeleted: false })
        //await req.patient.populate('phrs').execPopulate()
        
        if (!phr) {
            return res.status(404).send()
        }

        res.send(phr)
    } catch (e) {
        res.status(500).send(e)
    }
})


//Patient: read all
router.get('/me/phrs', auth, async (req, res) => {
    try {
        //const phr = await PHR.find({ owner: req.patient._id, isDeleted: false })
        await req.patient.populate('phrs').execPopulate()
        res.send(req.patient.phrs)
    } catch (e) {
        res.status(500).send()
    }
})


//Practitioner: read by id
router.get('/phrs/:id', auth1, async (req, res) => {
    const _id = req.params.id
    try {
        const phr = await PHR.find({ _id, isDeleted: false })

        if (!phr) {
            return res.status(404).send()
        }

        res.send(phr)
    } catch (e) {
        res.status(500).send()
    }
})


//Patient: read by id
router.get('/me/phrs/:id', auth, async (req, res) => {
    const _id = req.params.id
    try {
        const phr = await PHR.findOne({ _id, owner: req.patient._id, isDeleted: false })

        if (!phr) {
            return res.status(404).send()
        }

        res.send(phr)
    } catch (e) {
        res.status(500).send()
    }
})


//Practitioner: read by the first 3 characters
router.get('/phrsSearch', auth1, async (req, res) => {
    try {
        const newSearchString = req.query._type.substring(0, 3);
        const regexExpression = new RegExp(`${newSearchString}`, 'i');
        const phr = await PHR.find({ _type: { $regex: regexExpression }, isDeleted: false });

        if (!phr) {
            return res.status(404).send()
        }

        res.send(phr)
    } catch (e) {
        res.status(500).send(e)
    }
})


//Patient: read by the first 3 characters
router.get('/me/phrsSearch', auth, async (req, res) => {
    try {
        const newSearchString = req.query._type.substring(0, 3);
        const regexExpression = new RegExp(`${newSearchString}`, 'i');
        const phr = await PHR.find({ _type: { $regex: regexExpression }, isDeleted: false });

        if (!phr) {
            return res.status(404).send()
        }

        res.send(phr)
    } catch (e) {
        res.status(500).send(e)
    }
})


//Update
router.patch('/phrs/:id', auth1, async (req, res) => {
    const _id = req.params.id
    try {
        const phr = await PHR.findOne({ _id, isDeleted: false })

        if (!phr) {
            return res.status(404).send()
        }

        await phr.updateOne(req.body, { runValidators: true, new: true })
        res.send(phr)
    } catch (e) {
        res.status(400).send(e)
    }
})


//Delete
router.delete('/phrs/:id', auth1, async (req, res) => {
    const _id = req.params.id
    try {
        const isDeleted = true
        const phr = await PHR.findOne({ _id, isDeleted: false })

        if (!phr) {
            return res.status(404).send()
        }

        await phr.updateOne({ isDeleted })
        res.send('Deleted successfully')
    } catch (e) {
        res.status(400).send()
    }
})


module.exports = router