var express = require('express');
var router = express.Router();
const request = require('request');
const axios = require('axios');
const cors = require('cors');

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

/* GET home page. */
router.get('/:from-:to', cors(corsOptions), async function(req, res, next) {
    try {

      console.log("Beign called NR");
  
      const hspApiUrl = 'https://hsp-prod.rockshore.net/api/v1/serviceMetrics';
  
      // Set up the request headers
      const headers = {
        'Authorization': `Basic =`, // Replace with your National Rail Data Portal credentials
      };
  
      // Set up the request body
      const requestBody = {
        from_loc : req.params.from,
        to_loc : req.params.to,
        from_time : "0600",     // 1am - 11pm
        to_time: "1200",
        from_date : "2023-06-19", // June 19th 2023
        to_date : "2023-06-19",
        days : "WEEKDAY"
      };
      
      console.log("Begin Axios Call w/ body: " + JSON.stringify(requestBody));

      // Make the API call to HSP
      const response = await axios.post(hspApiUrl, requestBody, { headers });


  
      // Send the HSP API response back to the client
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.write(JSON.stringify(response.data));
      res.end();
    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).json({ error: error.message });
    }
});

router.get('/rtt/:from-:to', cors(corsOptions), async function(req, res, next) {
    try {

      const baseURL = 'https://api.rtt.io/api/v1';

      console.log("Beign called RTT");
      console.log("From: " + req.params.from);
      console.log("To: " + req.params.to);

      // /json/search/<station>/<year>/<month>/<day>
  
      const rttAPIUrl = `${baseURL}/json/search/${req.params.from}/to/${req.params.to}`

      const auth = '=';
  
      // Set up the request headers
      const headers = {
        'Authorization': `Basic ${auth}`, // Replace with your National Rail Data Portal credentials
      };
      console.log("Begin Axios Call");
      console.log("URL: " + rttAPIUrl);

      // Make the API call to HSP
      const response = await axios.get(rttAPIUrl, { headers });
  
      // Send the HSP API response back to the client
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.write(JSON.stringify(response.data));
      res.end();
    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).json({ error: error.message });
    }
});


router.get('/rttdate/:from-:to/:year/:month/:day', cors(corsOptions), async function(req, res, next) {
  try {

    const baseURL = 'https://api.rtt.io/api/v1';

    console.log("Beign called RTT");
    console.log("From: " + req.params.from);
    console.log("To: " + req.params.to);

    // /json/search/<station>/<year>/<month>/<day>

    const rttAPIUrl = `${baseURL}/json/search/${req.params.from}/to/${req.params.to}/${req.params.year}/${req.params.month}/${req.params.day}`

    const auth = '=';

    // Set up the request headers
    const headers = {
      'Authorization': `Basic ${auth}`, // Replace with your National Rail Data Portal credentials
    };
    console.log("Begin Axios Call");
    console.log("URL: " + rttAPIUrl);

    // Make the API call to HSP
    const response = await axios.get(rttAPIUrl, { headers });

    // Send the HSP API response back to the client
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify(response.data));
    res.end();
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: error.message });
  }
});


router.get('/rttfrom/:from/:year/:month/:day', cors(corsOptions), async function(req, res, next) {
  try {

    const baseURL = 'https://api.rtt.io/api/v1';

    console.log("Beign called RTT");
    console.log("From: " + req.params.from);
    console.log("To: " + req.params.to);

    // /json/search/<station>/<year>/<month>/<day>

    const rttAPIUrl = `${baseURL}/json/search/${req.params.from}/${req.params.year}/${req.params.month}/${req.params.day}`


    const auth = '=';

    // Set up the request headers
    const headers = {
      'Authorization': `Basic ${auth}`, // Replace with your National Rail Data Portal credentials
    };
    console.log("Begin Axios Call");
    console.log("URL: " + rttAPIUrl);

    // Make the API call to HSP
    const response = await axios.get(rttAPIUrl, { headers });

    // Send the HSP API response back to the client
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify(response.data));
    res.end();
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

router.get('/rttsuid/:suid/:year/:month/:day', cors(corsOptions), async function(req, res, next) {
    try {

      const baseURL = 'https://api.rtt.io/api/v1';

      console.log("Beign called RTT");
      console.log("SUID: " + req.params.suid);

      const rttAPIUrl = `${baseURL}/json/service/${req.params.suid}/${req.params.year}/${req.params.month}/${req.params.day}`

      const auth = '=';
  
      // Set up the request headers
      const headers = {
        'Authorization': `Basic ${auth}`, // Replace with your National Rail Data Portal credentials
      };
      console.log("Begin Axios Call");
      console.log("URL: " + rttAPIUrl);

      // Make the API call to HSP
      const response = await axios.get(rttAPIUrl, { headers });
  
      // Send the HSP API response back to the client
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.write(JSON.stringify(response.data));
      res.end();
    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).json({ error: error.message });
    }
});

module.exports = router;
