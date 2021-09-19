const express = require('express')
const Practitioner = require('../models/practitioner')
const router = new express.Router()


//Create
router.post('/practitioners', async (req, res) => {
    const pract = await new Practitioner(req.body)

    try {
        await pract.save()
        res.status(201).send(pract)
    } catch (e) {
        res.status(400).send(e)
    }
})


//Read all
router.get('/practitioners', async (req, res) => {
    try {
        const pract = await Practitioner.find({ isDeleted: false })
        res.send(pract)
    } catch (e) {
        res.status(500).send()
    }
})


//Read by id
router.get('/practitioners/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const pract = await Practitioner.findOne({ _id, isDeleted: false })

        if (!pract) {
            return res.status(404).send()
        }

        res.send(pract)
    } catch (e) {
        res.status(500).send()
    }
})


//Read by the first 3 characters
router.get('/practitionersRegex', async (req, res) => {
    try {
        const newSearchString = req.query.gender.substring(0, 3);
        const regexExpression = new RegExp(`${newSearchString}`, 'i');
        const pract = await Practitioner.find({ gender: { $regex: regexExpression }, isDeleted: false });

        if (!pract) {
            return res.status(404).send()
        }

        res.send(pract)
    } catch (e) {
        res.status(500).send(e)
    }
})


//Update
router.patch('/practitioners/:id', async (req, res)=> {
    const _id = req.params.id
    try {
        const pract = await Practitioner.findOneAndUpdate({ _id, isDeleted: false }, req.body, { new: true })

        if (!pract) {
            return res.statsu(404).send()
        }

        res.send(pract)
    } catch (e) {
        res.status(400).send(e)
    }
})


//Delete
router.delete('/practitioners/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const isDeleted = true
        const pract = await Practitioner.findOneAndUpdate({ _id, isDeleted: false }, { isDeleted })

        if (!pract) {
            return res.status(404).send()
        }

        res.send('Deleted successfully')
    } catch (e) {
        res.status(400).send()
    }
})


module.exports = router