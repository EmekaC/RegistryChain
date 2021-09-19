const express = require('express')
const OrganizationRegistry = require('../models/organizationRegistry')
const router = new express.Router()


//Create
router.post('/orgRegs', async (req, res) => {
    const orgReg = await new OrganizationRegistry(req.body)
    try {
        await orgReg.save()
        res.status(201).send(orgReg)
    } catch (e) {
        res.status(400).send(e)
    }
})


//Read all
router.get('/orgRegs', async (req, res) => {
    try {
        const orgReg = await OrganizationRegistry.find({ isDeleted: false })

        if (!orgReg) {
            return res.status(500).send()
        }

        res.send(orgReg)
    } catch (e) {
        res.status(500).send()
    }
})


//Read by id
router.get('/orgRegs/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const orgReg = await OrganizationRegistry.findOne({ _id, isDeleted: false })

        if (!orgReg) {
            return res.status(404).send()
        }

        res.send(orgReg)
    } catch (e) {
        res.status(500).send()
    }
})


//Read by the first 3 characters
router.get('/orgRegsRegex', async (req, res) => {
    try {
        const newSearchString = req.query._type.substring(0, 3);
        const regexExpression = new RegExp(`${newSearchString}`, 'i');
        const orgReg = await OrganizationRegistry.find({ _type: { $regex: regexExpression }, isDeleted: false });

        if (!orgReg) {
            return res.status(404).send()
        }

        res.send(orgReg)
    } catch (e) {
        res.status(500).send(e)
    }
})


//Update
router.patch('/orgRegs/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const orgReg = await OrganizationRegistry.findOneAndUpdate({ _id, isDeleted: false }, req.body, { new: true })

        if (!orgReg) {
            return res.status(404).send()
        }

        res.send(orgReg)
    } catch (e) {
        res.status(400).send(e)
    }
})


//Delete
router.delete('/orgRegs/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const isDeleted = true
        const orgReg = await OrganizationRegistry.findOneAndUpdate({ _id, isDeleted: false }, { isDeleted })

        if (!orgReg) {
            return res.status(404).send()
        }

        res.send('Deleted successfully')
    } catch (e) {
        res.status(400).send()
    }
})


module.exports = router