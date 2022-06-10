const express = require('express')
const restful = require('node-restful')
const server = express()
const mongoose = restful.mongoose
const bodyParser = require('body-parser')
const cors = require('cors')

import Client from './src/Model/Client'
import Github from './src/Model/Github'

// Database
mongoose.Promise = global.Promise
mongoose.connect('mongodb://db/mydb')

// Middlewares
server.use(bodyParser.urlencoded({extended:true}))
server.use(bodyParser.json())
server.use(cors())

// Rest API
Client.methods(['get', 'post', 'put', 'delete'])
Client.updateOptions({new: true, runValidators: true})

Github.methods(['get', 'post', 'put', 'delete'])
Github.updateOptions({new: true, runValidators: true})

// Routes
Client.register(server, '/clients')
Github.register(server, '/github')

// Start Server
server.listen(3000)