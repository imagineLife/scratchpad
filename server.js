/*
  To serve the app in production
*/

const express = require('express');
const path = require('path');
const app = express();
const targetPort = process.env.PORT || 9006;
let staticPath = path.join(__dirname, 'dist')
const xprsStatic = express.static(staticPath);

app.use(xprsStatic);

// eslint-disable-next-line flowtype/require-parameter-type
app.use(function(req, res) {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});
app.listen(targetPort);
console.log(`Application listening on ${targetPort}`);
