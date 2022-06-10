const restful = require('node-restful')

const Client = restful.model('Client', {
    name: {type: String, required: true},
    age: {type: String, required: true},
    email: {type: String, required: true},
})

export default Client