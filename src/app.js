const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const routes = require('./routes')
const config = require('./lib/config')
const error = require('./middlewares/handleError')
const notFound = require('./middlewares/notFound')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use(
  cors({
    origin: config.cors,
  })
)
app.use(helmet())
app.use('/api', routes)
app.use(notFound);
app.use(error);

module.exports = app
