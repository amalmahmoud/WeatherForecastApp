const express = require('express');
const app = express();

app.use(express.static(__dirname + '/dist/'));


app.get('*', (req, res) => {
    res.status(200).sendFile(__dirname + '/dist/weatherforcast/index.html');
  });
  
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
app.get('/api/*', (req, res) => {
  const url = `http://api.geonames.org${req.originalUrl.replace('/api/', '/')}`;
  req.pipe(request(url)).pipe(res);
});