const express = require('express')
const PHR = require('../models/phr')
const auth1 = require('../middleware/practitionerAuth')
const auth = require('../middleware/patientAuth')


const router = new express.Router()


//Create patient's PHR
router.post('/phrs', auth1, async (req, res) => {

    const phr = await new PHR(req.body)

    try {
        await phr.save()
        res.status(201).send(phr)
    } catch (e) {
        res.status(400).send(e)
    }
})


//Practitioner route to read patient's PHR encounter(fixed record)
router.get('/phrs/fixed_records', auth1, async (req, res) => {
    try {
        const phr = await PHR.find(req.body)
        //await req.patient.populate('phrs').execPopulate()
        
        if (!phr) {
            return res.status(404).send()
        }
        const encounter = phr[0].fixed_records[0]

        res.send(encounter)
    } catch (e) {
        res.status(500).send(e)
    }
})


//Patient route to read their PHR encounter(fixed record)
router.get('/me/phrs/fixed_records', auth, async (req, res) => {
    try {
        //const phr = await PHR.find({ owner: req.patient._id, isDeleted: false })
        await req.patient.populate('phrs').execPopulate()
        const encounter = req.patient.phrs[0].fixed_records[0]
        res.send(encounter)
    } catch (e) {
        res.status(500).send()
    }
})


//Practitioner route to read patient's PHR: all phrs(reccuring record)
router.get('/phrs', auth1, async (req, res) => {
    try {
        const phr = await PHR.find(req.body)
        //await req.patient.populate('phrs').execPopulate()
        
        if (!phr) {
            return res.status(404).send()
        }
        const recurring = phr[0].recurring_records[0]

        res.send(recurring)
    } catch (e) {
        res.status(500).send({ error: e.message })
    }
})


//Patient route to read their PHR: read encounter(recurring record)
router.get('/me/phrs', auth, async (req, res) => {
    try {
        //const phr = await PHR.find({ owner: req.patient._id, isDeleted: false })
        await req.patient.populate('phrs').execPopulate()
        const encounter = req.patient.phrs[0].recurring_records[0]
        res.send(encounter)
    } catch (e) {
        res.status(500).send()
    }
})


//Practitioner route to read patient's PHR by id
router.get('/phrs/:id', auth1, async (req, res) => {
    try {
        const phr = await PHR.findById(req.params.id)

        if (!phr) {
            return res.status(404).send()
        }

        res.send(phr)
    } catch (e) {
        res.status(500).send()
    }
})


//Patient route to read their PHR by id
router.get('/me/phrs/:id', auth, async (req, res) => {
    const _id = req.params.id
    try {
        const phr = await PHR.findOne({ _id, owner: req.patient._id })

        if (!phr) {
            return res.status(404).send()
        }

        res.send(phr)
    } catch (e) {
        res.status(500).send()
    }
})


//Practitioner route to search for PHR by the first 3 characters of their nationality (this is subject to change)
router.get('/phrsSearch', auth1, async (req, res) => {
    try {
        const newSearchString = req.query.nationality.substring(0, 3);
        const regexExpression = new RegExp(`${newSearchString}`, 'i');
        const phr = await PHR.find({ nationality: { $regex: regexExpression } });

        if (!phr) {
            return res.status(404).send()
        }

        res.send(phr)
    } catch (e) {
        res.status(500).send(e)
    }
})


//Patient route to search for PHR by the first 3 characters of their nationality (this is subject to change)
router.get('/me/phrsSearch', auth, async (req, res) => {
    try {
        const newSearchString = req.query.nationality.substring(0, 3);
        const regexExpression = new RegExp(`${newSearchString}`, 'i');
        const phr = await PHR.find({ nationality: { $regex: regexExpression } });

        if (!phr) {
            return res.status(404).send()
        }

        res.send(phr)
    } catch (e) {
        res.status(500).send(e)
    }
})


//Update patient's PHR
router.patch('/phrs/:id', auth1, async (req, res) => {
    try {
        const phr = await PHR.findById(req.params.id)

        if (!phr) {
            return res.status(404).send()
        }

        await phr.updateOne(req.body, { runValidators: true, new: true })
        res.send(phr)
    } catch (e) {
        res.status(400).send(e)
    }
})


//Delete patient's PHR
router.delete('/phrs/:id', auth1, async (req, res) => {
    try {
        const phr = await PHR.findByIdAndDelete(req.params.id)

        if (!phr) {
            return res.status(404).send()
        }

        res.send('Deleted successfully')
    } catch (e) {
        res.status(400).send()
    }
})


//Export routes for operations on patient's PHR
module.exports = router
