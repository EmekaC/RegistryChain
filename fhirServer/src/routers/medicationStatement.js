const express = require('express')
const MedState = require('../models/medicationStatement')
const router = new express.Router()


//Create
router.post('/medStates', async (req, res) => {
    const medState = new MedState(req.body)

    try {
        await medState.dosage.push(req.body)
        await medState.save()
        res.status(201).send(medState)
    } catch (e) {
        res.status(400).send(e)
    }
})


//Read all
router.get('/medStates', async (req, res) => {
    try {
        const medState = await MedState.find({ isDeleted: false })
        res.send(medState)
    } catch (e) {
        res.status(500).send()
    }
})


//Read by id
router.get('/medStates/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const medState = await MedState.findOne({ _id, isDeleted: false })

        if (!medState) {
            return res.status(404).send()
        }

        res.send(medState)
    } catch (e) {
        res.status(500).send()
    }
})


//Read by the first 3 characters
router.get('/medStatesRegex', async (req, res) => {
    try {
        const newSearchString = req.query.subject.substring(0, 3);
        const regexExpression = new RegExp(`${newSearchString}`, 'i');
        const medState = await MedState.find({ subject: { $regex: regexExpression }, isDeleted: false });

        if (!medState) {
            return res.status(404).send()
        }

        res.send(medState)
    } catch (e) {
        res.status(500).send(e)
    }
})


//Update
router.patch('/medStates/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const medState = await MedState.findOneAndUpdate({ _id, isDeleted: false }, req.body, { new: true })

        if (!medState) {
            return res.status(404).send()
        }

        res.send(medState)
    } catch (e) {
        res.status(400).send(e)
    }
})


//Delete
router.delete('/medStates/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const isDeleted = true
        const medState =  await MedState.findOneAndUpdate({ _id, isDeletd: false }, { isDeleted })

        if (!medState) {
            return res.status(404).send()
        }

        res.send('Deleted successfully')
    } catch (e) {
        res.status(400).send()
    }
})


module.exports = router