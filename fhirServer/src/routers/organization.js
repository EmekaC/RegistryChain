const express = require('express')
const Org = require('../models/organization')
const router = new express.Router()


//Create 
router.post('/orgs', async (req, res) => {
    const org = await new Org(req.body)

    try {
        await org.save()
        res.status(201).send(org)
    } catch (e) {
        res.status(400).send()
    }
})


//Read all
router.get('/orgs', async (req, res) => {
    try {
        const org = await Org.find({ isDeleted: false })
        res.send(org)
    } catch (e) {
        res.status(500).send()
    }
})


//Read by id
router.get('/orgs/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const org = await Org.findOne({ _id, isDeleted: false })

        if (!org) {
            return res.status(404).send()
        }

        res.send(org)
    } catch (e) {
        res.status(500).send()
    }
})


//Read by the first 3 characters
router.get('/orgsRegex', async (req, res) => {
    try {
        const newSearchString = req.query.name.substring(0, 3);
        const regexExpression = new RegExp(`${newSearchString}`, 'i');
        const org = await Org.find({ name: { $regex: regexExpression }, isDeleted: false });

        if (!org) {
            return res.status(404).send()
        }

        res.send(org)
    } catch (e) {
        res.status(500).send(e)
    }
})


//Update
router.patch('/orgs/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const org = await Org.findOneAndUpdate({ _id, isDeleted: false }, req.body, { new: true, runValidators: true })

        if (!org) {
            return res.status(404).send()
        }

        res.send(org)
    } catch (e) {
        res.status(400).send(e)
    }
})


//Delete
router.delete('/orgs/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const isDeleted = true
        const org = await Org.findOneAndDelete({ _id, isDeleted: false }, { isDeleted })

        if (!org) {
            return res.status(404).send()
        }

        res.send('Deleted successfully!')
    } catch (e) {
        res.status(400).send()
    }
})


module.exports = router