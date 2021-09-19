const express = require('express')
const Condition = require('../models/condition')
const router = new express.Router()


//Create
router.post('/conditions', async (req, res) => {
    const con = new Condition(req.body)

    try {
        await con.save()
        res.status(201).send(con)
    } catch (e) {
        res.status(400).send(e)
    }
})


//Read all
router.get('/conditions', async (req, res) => {
    try {
        const con = await Condition.find({ isDeleted: false })
        res.send(con)
    } catch (e) {
        res.status(500).send()
    }
})


//Read by id
router.get('/conditions/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const con = await Condition.findOne({ _id, isDeletd: false })

        if (!con) {
            return res.status(404).send()
        }

        res.send(con)
    } catch (e) {
        res.status(500).send()
    }
})


//Read by the first 3 characters
router.get('/conditionsRegex', async (req, res) => {
    try {
        const newSearchString = req.query.code.substring(0, 3);
        const regexExpression = new RegExp(`${newSearchString}`, 'i');
        const con = await Condition.find({ code: { $regex: regexExpression }, isDeleted: false });

        if (!con) {
            return res.status(404).send()
        }

        res.send(con)
    } catch (e) {
        res.status(500).send(e)
    }
})


//Update
router.patch('/conditions/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const con = await Condition.findOneAndUpdate({ _id, isDeleted: false }, req.body, { new: true })

        if (!con) {
            return res.status(404).send()
        }

        res.send(con)
    } catch (e) {
        res.status(400).send(e)
    }
})


//Delete
router.delete('/conditions/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const isDeleted = true
        const con = await Condition.findOneAndUpdate({ _id, isDeleted: false }, { isDeleted }, { new: true })

        if (!con) {
            return res.status(404).send()
        }

        res.send('Deleted successfully')
    } catch (e) {
        res.status(400).send()
    }
})


module.exports = router