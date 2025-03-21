// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date?", (req, res) => {
  const param = req.params.date
   if (new Date(param).valueOf() && isNaN(Number(param))) {
    console.log(1)
    const parsedDate = new Date(param)
    res.json({unix:parsedDate.getTime(), utc: parsedDate.toUTCString()})
  }
  else if (!isNaN(Number(param))) { 
    console.log(2)
    const parsedDate = new Date(Number(param))
    res.json({unix:parsedDate.getTime(), utc: parsedDate.toUTCString()})      
  }
  else if (!param){
    const parsedDate = new Date()
    res.json({unix:parsedDate.getTime(), utc: parsedDate.toUTCString()})
  }
  else {
    console.log(req.params.date)
    res.json({ error : "Invalid Date" })
  }
 }) 



// listen for requests :)
var listener = app.listen(3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
