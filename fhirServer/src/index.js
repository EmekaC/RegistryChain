require('dotenv').config()
const express = require('express')
const cors = require('cors')
require('./db/mongoose')
const practRouter = require('./routers/practitioner')
const patientRouter = require('./routers/patient')
const phrRouter = require('./routers/phr')
const tempRouter = require('./routers/temp')

const app = express()
const port = process.env.PORT


app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(practRouter)
app.use(patientRouter)
app.use(phrRouter)
app.use(tempRouter)


app.listen(port, () => {
    console.log('Server is up on ' + port)
})
