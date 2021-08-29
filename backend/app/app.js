const express = require('express')
const cors = require('cors')
const helmet = require('helmet')

const helloRouter = require('./routes/helloRouter');

const app = express()

app.use(helmet())
app.use(cors())

app.use(helloRouter)

module.exports = app