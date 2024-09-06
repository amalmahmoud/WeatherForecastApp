let express = require('express');

let app = express();

app.use(express.static(__dirname + '/dist/weatherforcast'));

app.get('/*',(req,res)=>
{
    res.status(200).sendFile(__dirname+'/dist/weatherforcast/index.html');
})

app.listen(process.env.PORT || 8080);