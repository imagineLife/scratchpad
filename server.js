// Production dependencies
const express = require('express');
const path = require('path');
const compress = require('compression');

// server config
const app = express();
const PORT = process.env.PORT || 9006;
const staticPath = path.join(__dirname, 'dist')
const xprsStatic = express.static(staticPath);

app.use(compress()); 
app.use(xprsStatic);

app.listen(PORT, () => {
  console.log(`Application listening on ${PORT}`);
  console.table({ staticPath })
});
