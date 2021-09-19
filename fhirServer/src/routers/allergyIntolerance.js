const express = require('express')
const AllInt = require('../models/allergyIntolerance')
const router = new express.Router()


//Create
router.post('/allInts', async (req, res) => {
    const allInt = new AllInt(req.body)

    try {
        await allInt.save()
        res.status(201).send(allInt)
    } catch (e) {
        res.status(400).send(e)
    }
})


//Read all
router.get('/allInts', async (req, res) => {
    try {
        const allInt = await AllInt.find({ isDeleted: false })
        res.send(allInt)
    } catch (e) {
        res.status(500).send()
    }
})


//Read by id
router.get('/allInts/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const allInt = await AllInt.findOne({ _id, isDeleted: false })

        if (!allInt) {
            return res.status(404).send()
        }

        res.send(allInt)
    } catch (e) {
        res.status(500).send()
    }
})


//Read by the first 3 characters
router.get('/allIntRegex', async (req, res) => {
    try {
        const newSearchString = req.query.verificationStatus.substring(0, 3);
        const regexExpression = new RegExp(`${newSearchString}`, 'i');
        const allInt = await AllInt.find({ verificationStatus: { $regex: regexExpression }, isDeleted: false });

        if (!allInt) {
            return res.status(404).send()
        }

        res.send(allInt)
    } catch (e) {
        res.status(500).send(e)
    }
})


//Update
router.patch('/allInts/:id', async (req, res) => {
    _id = req.params.id
    try {
        const allInt = await AllInt.findOneAndUpdate({ _id, isDeleted: false }, req.body, { new: true })

        if (!allInt) {
            return res.status(404).send()
        }

        res.send(allInt)
    } catch (e) {
        res.status(400).send()
    }
})


//Delete
router.delete('/allInts/:id', async (req, res) => {
    _id = req.params.id
    try {
        const isDeleted = true
        const allInt = await AllInt.findOneAndUpdate({ _id, isDeleted: false }, { isDeleted })

        if (!allInt) {
            return res.status(404).send()
        }

        res.send('Deleted successfully!')
    } catch (e) {
        res.status(400).send()
    }
})


module.exports = router