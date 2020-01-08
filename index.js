const http = require('http');
const path = require('path');
const URL = require('url');
const fs = require('fs');

const { port, version } = require('./config');
const { NOT_FOUND_MESSAGE, ALLOWED_HTTP_METHODS } = require('./utils/constants');
const routes = require('./routes');

const availableRoutes = [];
let functionName;
ALLOWED_HTTP_METHODS.forEach((method) => {
  fs.readdirSync(path.join(__dirname, `routes/${method}`), 'utf8').forEach((filename) => {
    if (filename !== 'index.js') {
      functionName = filename.replace('.js', '');
      availableRoutes.push({
        path: functionName,
        method: method.toUpperCase(),
        call: routes[method][functionName],
      });
    }
  });
});

function writeJSONResponse(res, data = { err: NOT_FOUND_MESSAGE }, statusCode = 404) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ data }));
}

function app(req, res) {
  const { pathname, query } = URL.parse(req.url, true);
  const [requestedVersion, apiPath] = pathname.substring(1).split('/');

  if (requestedVersion !== version) {
    writeJSONResponse(res);
    return;
  }

  const selectedRoute = availableRoutes
    .find((route) => route.path === apiPath && req.method === route.method);

  if (!selectedRoute) {
    writeJSONResponse(res);
    return;
  }
  selectedRoute
    .call({ query }, (data, statusCode = 200) => writeJSONResponse(res, data, statusCode));
}

const server = http.createServer(app);
server.listen(port);
