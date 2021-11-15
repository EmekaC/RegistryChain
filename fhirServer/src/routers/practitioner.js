const express = require('express')
const Redis = require("ioredis")
require('dotenv').config()
const redis = new Redis({
    url: process.env.REDIS_URL
})
const multer = require('multer')
const sharp = require('sharp')
const Practitioner = require('../models/practitioner')
const router = new express.Router()
const auth = require('../middleware/practitionerAuth')
const { welcomeEmail, cancelEmail } = require('../emails/mail')


//Home page
router.get('/practitioners', async (req, res) => {
    res.send('Welcome to Health365!')
})


//Create
router.post('/practitioners', async (req, res) => {
    const practitioner = await new Practitioner(req.body)

    try {
        await practitioner.save()
        welcomeEmail(practitioner.email, practitioner.name.given)
        res.status(201).send(practitioner)
    } catch (e) {
        res.status(400).send(e)
    }
})

//Login
router.post('/practitioners/login', async (req, res) => {
    try {
        const practitioner = await Practitioner.findByCredentials(req.body.email, req.body.password)
        const token = await practitioner.generateAuthToken()
        res.send({ practitioner, token })
    } catch (e) {
        res.status(400).send(e)
    }
})

//Logout
router.post('/practitioners/logout', auth, async (req, res) => {
    try {
        req.practitioner.tokens = req.practitioner.tokens.filter((token) => {
            return token.token != req.token
        })

        await req.practitioner.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

//Logout all
router.post('/practitioners/logoutAll', auth, async (req, res) => {
    try {
        req.practitioner.tokens = []
        await req.practitioner.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

//Get OTP
const getRedisData = (redisKey) => {
    return new Promise(function (resolve, reject) {
        redis.get(redisKey,  function (err, reply) {
            resolve(reply)
        });
    });
}

//Verify OTP
router.get('/practitioners/verify', auth, async (req, res) => {
    try {
        const redisKey = 'otp'
        const isExist = await getRedisData(redisKey);
        
        if (isExist === null) {
            res.status(404).send({
                message: 'OTP has expired, kindly try again',
            });
        }
        const OTP = JSON.parse(isExist);

        if (parseInt(req.body.OTP) !== OTP) {
            res.status(400).send({
                message: 'OTP does not match',
            });
        }
        res.status(200).send({
            message: 'Verification was successful',
        });
    } catch (e) {
        res.status(400).send(e)
        console.log(e)
    }
})

//Read profile
router.get('/practitioners/me', auth, async (req, res) => {
    res.send(req.practitioner)
})


// //Read by id
// router.get('/practitioners/:id', async (req, res) => {
//     const _id = req.params.id
//     try {
//         const practitioner = await Practitioner.findOne({ _id, isDeleted: false })

//         if (!practitioner) {
//             return res.status(404).send()
//         }

//         res.send(practitioner)
//     } catch (e) {
//         res.status(500).send()
//     }
// })


// //Read by the first 3 characters
// router.get('/practitionersRegex', async (req, res) => {
//     try {
//         const newSearchString = req.query.gender.substring(0, 3);
//         const regexExpression = new RegExp(`${newSearchString}`, 'i');
//         const practitioner = await Practitioner.find({ gender: { $regex: regexExpression }, isDeleted: false });

//         if (!practitioner) {
//             return res.status(404).send()
//         }

//         res.send(practitioner)
//     } catch (e) {
//         res.status(500).send(e)
//     }
// })


//Update
router.patch('/practitioners/me', auth, async (req, res)=> {
    try {
        await req.practitioner.updateOne(req.body, { new: true, runValidators: true })
        await req.practitioner.save()
        res.send(req.practitioner)
    } catch (e) {
        res.status(400).send(e)
    }
})


//Delete
router.delete('/practitioners/me', auth, async (req, res) => {
    try {
        const isDeleted = true
        await req.practitioner.updateOne({ isDeleted })
        req.practitioner.tokens = []
        await req.practitioner.save()
        cancelEmail(req.practitioner.email, req.practitioner.name.given)
        res.send('Deleted successfully')
    } catch (e) {
        res.status(400).send()
    }
})

//Upload profile picture
const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
            return cb(new Error('Please upload a picture'))
        }

        cb(undefined, true)
    }
})


router.post('/practitioners/me/avatar', auth, upload.single('avatar'), async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
    req.practitioner.avatar = buffer
    await req.practitioner.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})


router.delete('/practitioners/me/avatar', auth, async (req, res) => {
    req.practitioner.avatar = undefined
    await req.practitioner.save()
    res.send()
})


router.get('/practitioners/:id/avatar', async (req, res) => {
    try {
        const practitioner = await Practitioner.findById(req.params.id)
        
        if (!practitioner || !practitioner.avatar) {
            throw new Error()
        }

        res.set('Content-Type', 'image/png')
        res.send(practitioner.avatar)
    } catch (e) {
        res.status(404).send()
    }
})


module.exports = router