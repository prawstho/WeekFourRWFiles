const fs = require('fs');
const path = require('path');

const EventEmitter = require('events');
class MyEmitter extends EventEmitter {}
const myEmitter = new EventEmitter(); 

myEmitter.on('route', (url) => {
  const d = new Date();
  if(DEBUG) console.log(`Route Event on: ${url} at ${d}`);
  if(!fs.existsSync(path.join(__dirname, 'logs'))) {
    fs.mkdirSync(path.join(__dirname, 'logs'));
  }
  fs.appendFile(path.join(__dirname, 'logs', 'route.log'), `Route Event on: ${url} at ${d}\n`, (err) => {
    if(err) throw err;
  });
});

myEmitter.on('error', (message) => {
  const d = new Date();
  if(DEBUG) console.log(`Error: ${message} at ${d}`);
  if(!fs.existsSync(path.join(__dirname, 'logs'))) {
    fs.mkdirSync(path.join(__dirname, 'logs'));
  }
  fs.appendFile(path.join(__dirname, 'logs', 'error.log'), `Error: ${message} at ${d}\n`, (err) => {
    if(err) throw err;
  });
}); 

module.exports = myEmitter;