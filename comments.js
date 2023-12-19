// Run: node comments.js
// Note: use nodemon for auto restart
// Run: nodemon comments.js

// Import modules
const express = require('express')
const bodyParser = require('body-parser')
const Joi = require('joi')
const logger = require('./logger')
const morgan = require('morgan')
const config = require('config')
const helmet = require('helmet')
const courses = require('./routes/courses')
const home = require('./routes/home')

// Create web server
const app = express()

// Use middleware
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(logger)
app.use(morgan('tiny'))
app.use(helmet())

// Use routes
app.use('/api/courses', courses)
app.use('/', home)

// Configuration
console.log('Application Name: ' + config.get('name'))
console.log('Mail Server: ' + config.get('mail.host'))
console.log('Mail Password: ' + config.get('mail.password'))

// Environment
console.log(`NODE_ENV: ${process.env.NODE_ENV}`)
console.log(`app: ${app.get('env')}`)

// Template engine
app.set('view engine', 'pug')
app.set('views', './views') // default

// Port
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}...`))