const express = require('express')
const TerminologyRegistry = require('../models/terminologyRegistry')
const router = new express.Router()


//Create
router.post('/termRegs', async (req, res) => {
    const termReg = await new TerminologyRegistry(req.body)
    try {
        await termReg.save()
        res.status(201).send(termReg)
    } catch (e) {
        res.status(400).send(e)
    }
})


//Read all
router.get('/termRegs', async (req, res) => {
    try {
        const termReg = await TerminologyRegistry.find({ isDeleted: false })

        if (!termReg) {
            return res.status(500).send()
        }

        res.send(termReg)
    } catch (e) {
        res.status(500).send()
    }
})


//Read by id
router.get('/termRegs/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const termReg = await TerminologyRegistry.findOne({ _id, isDeleted: false })

        if (!termReg) {
            return res.status(404).send()
        }

        res.send(termReg)
    } catch (e) {
        res.status(500).send()
    }
})


//Read by the first 3 characters
router.get('/termRegsRegex', async (req, res) => {
    try {
        const newSearchString = req.query._type.substring(0, 3);
        const regexExpression = new RegExp(`${newSearchString}`, 'i');
        const termReg = await TerminologyRegistry.find({ _type: { $regex: regexExpression }, isDeleted: false });

        if (!termReg) {
            return res.status(404).send()
        }

        res.send(termReg)
    } catch (e) {
        res.status(500).send(e)
    }
})


//Update
router.patch('/termRegs/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const termReg = await TerminologyRegistry.findOneAndUpdate({ _id, isDeleted: false }, req.body, { new: true })

        if (!termReg) {
            return res.status(404).send()
        }

        res.send(termReg)
    } catch (e) {
        res.status(400).send(e)
    }
})


//Delete
router.delete('/termRegs/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const isDeleted = true
        const termReg = await TerminologyRegistry.findOneAndUpdate({ _id, isDeleted: false }, { isDeleted })

        if (!termReg) {
            return res.status(404).send()
        }

        res.send('Deleted successfully')
    } catch (e) {
        res.status(400).send()
    }
})


module.exports = router