require('dotenv').config()
const express = require('express')
const Redis = require("ioredis")
const redis = new Redis(process.env.REDIS_URL)
const multer = require('multer')
const sharp = require('sharp')
const Patient = require('../models/patient')
const router = new express.Router()
const auth = require('../middleware/patientAuth')
const { welcomeEmail, cancelEmail, otpEmail } = require('../emails/mail')


//Home page
router.get('/patients', async (req, res) => {
    res.send('Welcome to Health365!')
})


//Create patient profile
router.post('/patients', async (req, res) => {
    const patient = await new Patient(req.body)
    try {
        await patient.save()
        welcomeEmail(patient.email, patient.name.given)
        res.status(201).send(patient)
    } catch (e) {
        res.status(400).send(e)
    }
})


//Login into patient profile
router.post('/patients/login', async (req, res) => {
    try {
        const patient = await Patient.findByCredentials(req.body.email, req.body.password)
        const token = await patient.generateAuthToken()
        res.send({ patient, token })
    } catch (e) {
        res.status(400).send({ e: e.message })
    }
})


//Logout from patient profile
router.post('/patients/logout', auth, async (req, res) => {
    try {
        req.patient.tokens = req.patient.tokens.filter((token) => {
            return token.token != req.token
        })

        await req.patient.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})


//Logout of all devices at once
router.post('/patients/logoutAll', auth, async (req, res) => {
    try {
        req.patient.tokens = []
        await req.patient.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})


//Generate OTP to grant access to practitioner to perform operations on patient's PHR
router.get('/patients/assign', auth, async (req, res) => {
    try {
        const isAssigned = true
        await req.patient.updateOne({ isAssigned })
        let OTP = Math.floor(1000 + Math.random() * 9000);
        otpEmail(req.patient.email, req.patient.name.given, OTP)
        
        const redisKey = 'otp'
        redis.multi([
            ['set', redisKey, JSON.stringify(OTP)],
            ['expire', redisKey, 120],
        ]).exec();

        res.send('Sent')
        
    } catch (e) {
        res.status(400).send(e)
    }
})


//Read patient profile
router.get('/patients/me', auth, async (req, res) => {
    res.send(req.patient)
})



// //Read by the first 3 characters
// router.get('/patientsRegex', async (req, res) => {
//     try {
//         const newSearchString = req.query.email.substring(0, 3);
//         const regexExpression = new RegExp(`${newSearchString}`, 'i');
//         const patient = await Patient.find({ email: { $regex: regexExpression }, isDeleted: false });

//         if (!patient) {
//             return res.status(404).send()
//         }

//         res.send(patient)
//     } catch (e) {
//         res.status(500).send(e)
//     }
// })


//Update patient profile
router.patch('/patients/me', auth, async (req, res) => {
    try {
        await req.patient.update(req.body, { new: true, runValidators: true })
        await req.patient.save()
        res.send(req.patient)
    } catch (e) {
        res.status(400).send(e)
    }
})


//Delete patient profile
router.delete('/patients/me', auth, async (req, res) => {
    try {
        await req.patient.remove()
        cancelEmail(req.patient.email, req.patient.name.given)
        res.send('Deleted successfully')
    } catch (e) {
        res.status(400).send()
    }
})


//Function to configure profile picture upload
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


//Upload profile picture
router.post('/patients/me/avatar', auth, upload.single('avatar'), async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
    req.patient.avatar = buffer
    await req.patient.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})


//Delete profile picture
router.delete('/patients/me/avatar', auth, async (req, res) => {
    req.patient.avatar = undefined
    await req.patient.save()
    res.send()
})


//View profile picture in the browser
router.get('/patients/:id/avatar', async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id)
        
        if (!patient || !patient.avatar) {
            throw new Error()
        }

        res.set('Content-Type', 'image/png')
        res.send(patient.avatar)
    } catch (e) {
        res.status(404).send()
    }
})


//Export routes for operations on patient's account
module.exports = router
