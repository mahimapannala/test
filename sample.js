'use strict';

const apiKey = 'HS2Hz1mCXhn6mREVBIRfmDo2HLbHM8j09hVmLAjfNLBZg1P9svADfcr4zq7tISjYvPPEo-hNf02vWZF94VWM9egXvCux8SXMUcQ2IpyKb4foYVTZbhIv1apKHbBaXnYx';
const clientID = 'zfTcApw8HTDBpuU6NiRf2Q'

const yelp = require('yelp-fusion');
const client = yelp.client(apiKey);
client.search({
  latitude: "40.445562699999996",
  longitude: "-79.9276651",
}).then(response => {
  console.log(response.jsonBody.businesses[0].name);
}).catch(e => {
  console.log(e);
});
