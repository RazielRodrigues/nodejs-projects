
const axios = require('axios');
const api = require('./service/api');

async function main(){

    try {

        const results = {
            github: await api.getGithub('RazielMiranda'),
            // starWars: await api.getStarWarsPeople('lars')
        }

        await axios.post('http://localhost:3000/api', {response: JSON.stringify(results)}).then(function (response) {
            console.log(response.data);
        });

    } catch (error) {
        console.error('DEU RUIM!', error);
    }

}

module.exports = main;