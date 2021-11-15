const express = require('express')
require('dotenv').config()
require('./db/mongoose')
const practRouter = require('./routers/practitioner')
const patientRouter = require('./routers/patient')
const phrRouter = require('./routers/phr')


const app = express()
const port = process.env.PORT


app.use(express.json())
app.use(practRouter)
app.use(patientRouter)
app.use(phrRouter)


app.listen(port, () => {
    console.log('Server is up on ' + port)
})