const express = require('express')
require('./db/mongoose')

const Org = require('./models/organization')
const AllInt = require('./models/allergyIntolerance')
const MedState = require('./models/medicationStatement')
const Condition = require('./models/condition')
const Practitioner = require('./models/practitioner')
const PractitionerRole = require('./models/practitionerRole')
const IPSRepository = require('./models/ipsRepository')
const PractitionerRegistry = require('./models/practitionerRegistry')
const OrganizationRegistry = require('./models/organizationRegistry')
const TerminologyRegistry = require('./models/terminologyRegistry')

const orgRouter = require('./routers/organization')
const allIntRouter = require('./routers/allergyIntolerance')
const medStateRouter = require('./routers/medicationStatement')
const conRouter = require('./routers/condition')
const practRouter = require('./routers/practitioner')
const roleRouter = require('./routers/practitionerRole')
const ipsRepoRouter = require('./routers/ipsRepository.js')
const practRegRouter = require('./routers/PractitionerRegistry')
const orgRegRouter = require('./routers/organizationRegistry')
const termRegRouter = require('./routers/terminologyRegistry')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(orgRouter)
app.use(allIntRouter)
app.use(medStateRouter)
app.use(conRouter)
app.use(practRouter)
app.use(roleRouter)
app.use(ipsRepoRouter)
app.use(practRegRouter)
app.use(orgRegRouter)
app.use(termRegRouter)


app.listen(port, () => {
    console.log('Server is up on ' + port)
})