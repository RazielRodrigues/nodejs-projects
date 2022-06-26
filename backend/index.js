
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

    } catch (error) {
        console.error('DEU RUIM!', error);
    }

}

main();