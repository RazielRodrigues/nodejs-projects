const express = require('express')
const restful = require('node-restful')
const server = express()
const mongoose = restful.mongoose
const bodyParser = require('body-parser')
const cors = require('cors')
const api = require('./service/api');


async function main(){

    try {

        const results = [
            {
                github: await api.getGithub('RazielMiranda'),
                starWars: await api.getStarWarsPeople('lars')
            }
        ]

        console.log(results);

        // console.table(results);

    } catch (error) {
        console.error('DEU RUIM!', error);
    }

}

main();


// // Database
// mongoose.Promise = global.Promise
// mongoose.connect('mongodb://db/mydb')

// // Middlewares
// server.use(bodyParser.urlencoded({extended:true}))
// server.use(bodyParser.json())
// server.use(cors())

// // ODM
// const Client = restful.model('Client', {
//     name: { type: String, required: true }
// })

// // Rest API
// Client.methods(['get', 'post', 'put', 'delete'])
// Client.updateOptions({new: true, runValidators: true})

// // Routes
// Client.register(server, '/clients')

// // Start Server
// server.listen(3000)