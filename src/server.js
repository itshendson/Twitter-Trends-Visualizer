require('dotenv').config();
const fetch = require('node-fetch');
const express = require('express');
const PORT = process.env.PORT || 5000;
const bearer_token = process.env.BEARER;

const app = express();

app.use(express.static('public'))
app.use(express.json()); // Lets server know to parse incoming request to json files

app.get('/closest/:latLng', async (request, response) => {
    const latLong = request.params.latLng.split(',');
    const lat = latLong[0];
    const long = latLong[1];
    // const bearer_token = process.env.BEARER;
    const options = {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + bearer_token
        }
    }

    const places_url = `https://api.twitter.com/1.1/trends/closest.json?lat=${lat}&long=${long}`
    const places_response = await fetch(places_url, options);
    const places_response_json = await places_response.json();
    response.json(places_response_json);
})

app.get('/trending/:woeid', async (request, response) => {
    const woeid = request.params.woeid;
    const options = {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + bearer_token
        }
    }

    const trending_url = `https://api.twitter.com/1.1/trends/place.json?id=${woeid}`;
    const trending_response = await fetch(trending_url, options);
    const trending_response_json = await trending_response.json();
    response.json(trending_response_json);
})

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
})
