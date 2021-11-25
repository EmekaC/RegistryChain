const express = require('express')
const Redis = require("ioredis")
const redis = new Redis(process.env.REDIS_URL)
const TemporaryDB = require('../models/temp')
const router = new express.Router()
const { verifyEmail } = require('../emails/mail')


//Create a temporary account before a user's email is verified
router.post('/temporary', async (req, res) => {
    const temp = await new TemporaryDB(req.body)
    try {
        let OTP = Math.floor(1000 + Math.random() * 9000);
        verifyEmail(temp.email, temp.name.given, OTP)
        
        const redisKey = 'otp'
        redis.multi([
            ['set', redisKey, JSON.stringify(OTP)],
            ['expire', redisKey, 120],
        ]).exec();

        await temp.save()
        res.status(201).send({ temp, OTP })
    } catch (e) {
        res.status(400).send(e)
    }
})


//Delete the temporary account after a user's email has been verified
router.delete('/temporary/:id', async (req, res) => {
    try {
        const temp = await TemporaryDB.findByIdAndDelete(req.params.id)

        if (!temp) {
            return res.status(400).send()
        }
        res.send()
    } catch (e) {
        res.status(400).send(e)
    }
})


//Export routes for operations on the temporary database
module.exports = router
