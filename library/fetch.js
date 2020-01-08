const https = require('https');
const URL = require('url');

/**
 * Fetch data from url
 * @param {String} url
 * @param {{ 'GET' || 'POST' }} method
 * @param {Object} data
 * @returns {Promise}
 */
const fetch = (url, method, data = {}) => new Promise((resolve, reject) => {
  const { hostname, protocol, path } = URL.parse(url);
  const options = {
    hostname,
    port: protocol === 'https:' ? 443 : 80,
    path,
    method,
  };

  if (method === 'POST') {
    Object.assign(options, {
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data),
      },
    });
  }

  let rawData = '';
  const req = https.request(options, (res) => {
    // res.setEncoding('utf8');
    // console.log('statusCode:', res.statusCode);
    // console.log('headers:', res.headers);

    res.on('data', (chunk) => {
      // process.stdout.write(chunk);
      rawData += chunk;
    });

    res.on('end', () => {
      resolve({
        headers: res.headers,
        statusCode: res.statusCode,
        data: rawData ? JSON.parse(rawData) : null,
      });
    });
  });

  req.on('error', (e) => {
    reject(e);
  });

  if (method === 'POST') {
    req.write(data);
  }

  req.end();
});

module.exports = fetch;
