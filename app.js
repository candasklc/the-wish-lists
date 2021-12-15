const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
const db = require('./config/db');
const { collection } = require('./models/wish');

app.use(express.json());

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
  });

// ------------- PAGE ROUTES
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/dist/angularExpress/index.html'));
});


// ------------- STATIC FILES
app.use(express.static(path.join(__dirname, "/dist/angularExpress")));
app.use(express.static(path.join(__dirname, "/src/app/components/mainpage")));

// ------------- API ROUTES
app.get('/all', (req, res) => {
  wishes = collection.find({}).toArray((err, results) => {
    if(!err){
      res.send(results);
    }else{
      res.status(err);
    }
  })
});

app.post('/add-wish',(req, res) => {
  const newWish = {
    title : req.body.title,
    link : req.body.link,
    user : req.body.user
  }
  const result = collection.insertOne(newWish);
  res.json('The wish successfully added.' + result);
});

app.post('/delete',(req, res) => {
  res.json('Removed');
});



app.listen(PORT, () => {
  console.info(`Listening at http://localhost:${PORT}`);
});
