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


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Allow all origins or specify a domain
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});