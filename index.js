require('dotenv').config();
const http = require('http');
const https = require('https');
const fs = require('fs');
const request = require('request');
const axios = require('axios');

const OWM_KEY = process.env.OWM_KEY;
const url = 'https://api.openweathermap.org/data/2.5/weather?q=Sydney,au&appid=' + OWM_KEY;

// API Request with HTTP build in module
https.get(url, (res) => res.on('data', printJSON));
function printJSON(data) {
	console.log(`HTTP Mod: ${JSON.parse(data).weather}`);
}

// API Request with request module
request(url, { json: true }, requestCallback);
function requestCallback(err, res, body) {
	if (err) return console.log(err);
	console.log(`Requests Mod: ${JSON.parse(body).weather}`);
}

// API Request with Axios module
// axios.get(url).then(printJSON).catch(err => console.log(err));

// Create a server
const server = https.createServer((req, res) => res.end());
server.on('clientError', (err, socket) => socket.end('HTTP/1.1 400 Bad Reques\r\n\r\n'));

server.listen(3002);
