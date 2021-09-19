const express = require('express')
const PractitionerRegistry = require('../models/practitionerRegistry')
const router = new express.Router()


//Create
router.post('/practRegs', async (req, res) => {
    const reg = await new PractitionerRegistry(req.body)
    try {
        await reg.save()
        res.status(201).send(reg)
    } catch (e) {
        res.status(400).send(e)
    }
})


//Read all
router.get('/practRegs', async (req, res) => {
    try {
        const practReg = await PractitionerRegistry.find({ isDeleted: false })
        res.send(practReg)
    } catch (e) {
        res.status(500).send()
    }
})


//Read by id
router.get('/practRegs/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const practReg = await PractitionerRegistry.findOne({ _id, isDeleted: false })

        if (!practReg) {
            return res.status(404).send()
        }

        res.send(practReg)
    } catch (e) {
        res.status(500).send()
    }
})


//Read by the first 3 characters
router.get('/practRegsRegex', async (req, res) => {
    try {
        const newSearchString = req.query._type.substring(0, 3);
        const regexExpression = new RegExp(`${newSearchString}`, 'i');
        const practReg = await PractitionerRegistry.find({ _type: { $regex: regexExpression }, isDeleted: false });

        if (!practReg) {
            return res.status(404).send()
        }

        res.send(practReg)
    } catch (e) {
        res.status(500).send(e)
    }
})


//Update
router.patch('/practRegs/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const practReg = await PractitionerRegistry.findOneAndUpdate({ _id, isDeleted: false }, req.body, { new: true })

        if (!practReg) {
            return res.status(404).send()
        }

        res.send(practReg)
    } catch (e) {
        res.status(400).send(e)
    }
})


//Delete
router.delete('/practRegs/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const isDeleted = true
        const practReg = await PractitionerRegistry.findOneAndUpdate({ _id, isDeleted: false }, { isDeleted })

        if (!practReg) {
            return res.status(404).send()
        }

        res.send('Deleted successfully')
    } catch (e) {
        res.status(400).send()
    }
})


module.exports = router