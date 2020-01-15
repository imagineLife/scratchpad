/*
  To serve the app in production
*/

const express = require('express');
const path = require('path');
const app = express();
const targetPort = process.env.PORT || 9006;
const staticPath = express.static(path.join(__dirname, 'dist'));

app.use(staticPath);

app.use(function(req, res) {
  console.log('--- REQUEST HERE ---');
  console.log('req')
  console.log(req)
  console.log('// - - - - - //')
  
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(targetPort);
console.log(`Application listening on ${targetPort}`);
