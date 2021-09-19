const express = require('express')
const IPSRepository = require('../models/ipsRepository')
const router = new express.Router()


//Create
router.post('/ipsRepos', async (req, res) => {
    const ipsRepo = await new IPSRepository(req.body)

    try {
        await ipsRepo.save()
        res.status(201).send(ipsRepo)
    } catch (e) {
        res.status(400).send(e)
    }
})


//Read all
router.get('/ipsRepos', async (req, res) => {
    try {
        const ipsRepo = await IPSRepository.find({ isDeleted: false })
        res.send(ipsRepo)
    } catch (e) {
        res.status(500).send()
    }
})


//Read by id
router.get('/ipsRepos/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const ipsRepo = await IPSRepository.findOne({ _id, isDeleted: false })

        if (!ipsRepo) {
            return res.status(404).send()
        }

        res.send(ipsRepo)
    } catch (e) {
        res.status(500).send()
    }
})


//Read by the first 3 characters
router.get('/ipsReposRegex', async (req, res) => {
    try {
        const newSearchString = req.query._type.substring(0, 3);
        const regexExpression = new RegExp(`${newSearchString}`, 'i');
        const ipsRepo = await IPSRepository.find({ _type: { $regex: regexExpression }, isDeleted: false });

        if (!ipsRepo) {
            return res.status(404).send()
        }

        res.send(ipsRepo)
    } catch (e) {
        res.status(500).send(e)
    }
})


//Update
router.patch('/ipsRepos/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const ipsRepo = await IPSRepository.findOneAndUpdate({ _id, isDeleted: false }, req.body, { new: true })

        if (!ipsRepo) {
            return res.status(404).send()
        }

        res.send(ipsRepo)
    } catch (e) {
        res.status(400).send(e)
    }
})


//Delete
router.delete('/ipsRepos/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const isDeleted = true
        const ipsRepo = await IPSRepository.findOneAndUpdate({ _id, isDeleted: false }, { isDeleted })

        if (!ipsRepo) {
            return res.status(404).send()
        }

        res.send('Deleted successfully')
    } catch (e) {
        res.status(400).send()
    }
})


module.exports = router