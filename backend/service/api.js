const axios = require("axios");
class Api {

  constructor() {

    this.options = {
      method: 'GET',
      url: 'https://community-open-weather-map.p.rapidapi.com/weather',
      params: {
        q: '',
        lat: '0',
        lon: '0',
        callback: 'test',
        id: '2172797',
        lang: 'eng',
        units: 'celcius',
        mode: 'json'
      },
      headers: {
        'X-RapidAPI-Key': '5dfac283b2msh020309e1ce71212p1f5f9ejsn6ff1e23b5604',
        'X-RapidAPI-Host': 'community-open-weather-map.p.rapidapi.com'
      }
    };

  }

  async getGithub(name) {
    const {data} = await axios.get(`https://api.github.com/users/${name}`);
    return data;
  }

  async getStarWarsPeople(name) {
    const url = `https://swapi.dev/api/people/?search=${name}&format=json`
    const {data} = await axios.get(url)
    return (data.results);
  }

}

module.exports = new Api();