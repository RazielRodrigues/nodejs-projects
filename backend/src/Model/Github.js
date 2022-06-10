const restful = require('node-restful')

const Github = restful.model('Github', {
    username: {type: String, required: true},
    repositorios: {type: String, required: true},
})

export default Github