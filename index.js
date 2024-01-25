const http = require('http');

const route = require('./routes.js');
const myEmitter = require('./logEvents.js');

const port = 3000;

global.DEBUG = false;

const server = http.createServer((request, response) => {
  if (request.url === '/favicon.ico') {
    // Ignore favicon.ico requests
    response.writeHead(204, {'Content-Type': 'image/x-icon'});
    response.end();
    return;
  }
  if(DEBUG) console.log('Request Url:', request.url);
  let path = './views/';
  switch(request.url) {
    case '/':
      path += 'index.html';
      route.indexPage(path, response);
      break;
    case '/about':
      path += 'about.html';
      route.aboutPage(path, response);
      break;
    case '/event':
      myEmitter.emit('event', request.url, 'INFO', 'An event route was requested');
      response.writeHead(200, { 'Content-Type': 'text/plain' });
      response.end('An event route was requested');
      break;
    case '/folder':
      route.createFolder(request, response);
      break;
    default:
      let message = `404 Not Found: ${request.url}`;
      if(DEBUG) console.log(message);
      myEmitter.emit('error', message);
      response.writeHead(404, { 'Content-Type': 'text/plain' });
      response.end('404 Not Found');
      break;
  }
});

// Start the server
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});