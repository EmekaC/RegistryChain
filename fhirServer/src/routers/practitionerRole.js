const express = require('express')
const PractitionerRole = require('../models/practitionerRole')
const router = new express.Router()


//Create
router.post('/practRoles', async (req, res) => {
    const role = await new PractitionerRole(req.body)

    try {
        await role.practitioner.push(req.body)
        await role.organization.push(req.body)
        await role.location.push(req.body)
        await role.healthcareService.push(req.body)
        await role.save()
        res.status(201).send(role)
    } catch (e) {
        res.status(400).send(e)
    }
})


//Read all
router.get('/practRoles', async (req, res) => {
    try {
        const role = await PractitionerRole.find({ isDeleted: false })

        res.send(role)
    } catch (e) {
        res.status(500).send()
    }
})


//Read by id
router.get('/practRoles/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const role = await PractitionerRole.findOne({ _id, isDeleted: false })

        if (!role) {
            return res.status(404).send()
        }

        res.send(role)
    } catch (e) {
        res.status(500).send()
    }
})


//Read by the first 3 characters
router.get('/practRolesRegex', async (req, res) => {
    try {
        const newSearchString = req.query.specialty.substring(0, 3);
        const regexExpression = new RegExp(`${newSearchString}`, 'i');
        const role = await PractitionerRole.find({ specialty: { $regex: regexExpression }, isDeleted: false });

        if (!role) {
            return res.status(404).send()
        }

        res.send(role)
    } catch (e) {
        res.status(500).send(e)
    }
})


//Update
router.patch('/practRoles/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const role = await PractitionerRole.findOneAndUpdate({ _id, isDeleted: false }, req.body)

        if (!role) {
            return res.status(404).send()
        }

        res.send(role)
    } catch (e) {
        res.status(400).send(e)
    }
})


//Delete
router.delete('/practRoles/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const isDeleted = true
        const role = await PractitionerRole.findOneAndUpdate({ _id, isDeleted: false }, { isDeleted })

        if (!role) {
            return res.status(404).send()
        }

        res.send('Deleted successfully')
    } catch (e) {
        res.status(400).send()
    }
})


module.exports = router