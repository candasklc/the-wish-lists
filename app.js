const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
const fs = require('fs');
const dashiDb = require('./dashiDb.json');
const djuliDb = require('./djuliDb.json');
 
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
  const dashiList = JSON.parse(fs.readFileSync('./dashiDb.json'))
  const djuliList =  JSON.parse(fs.readFileSync('./djuliDb.json'))
  const theOneList = [...dashiList, ...djuliList];
  res.json(theOneList);
});

app.post('/add-wish',(req, res) => {
  if (req.body.user.toLocaleLowerCase() == 'dashi') {
    const readDb = JSON.parse(fs.readFileSync('./dashiDb.json'));
    readDb.push(req.body);
    const stringData = JSON.stringify(readDb);
    fs.writeFileSync('./dashiDb.json', stringData);
  }else if (req.body.user.toLocaleLowerCase() == 'djuli') {
    const readDb = JSON.parse(fs.readFileSync('./djuliDb.json'));
    readDb.push(req.body);
    const stringData = JSON.stringify(readDb);
    fs.writeFileSync('./djuliDb.json', stringData);
  }
  res.json('The wish successfully added.');
});

app.post('/delete',(req, res) => {
  const dashiList = JSON.parse(fs.readFileSync('./dashiDb.json'))
  const djuliList =  JSON.parse(fs.readFileSync('./djuliDb.json'))
  const theOneList = [...dashiList, ...djuliList];
    theOneList.forEach((x, index) => {
      if(x.link === req.body.link) {
        theOneList.splice(index,1);
      }
    });
  const newDashi = [];
  const newDjuli = [];
  theOneList.forEach(x => {
    if(x.user == 'dashi'){
      newDashi.push(x);
    }else if(x.user == 'djuli'){
      newDjuli.push(x);
    }
  });
  const stringDashi = JSON.stringify(newDashi);
  fs.writeFileSync('./dashiDb.json', stringDashi);
  const stringDjuli = JSON.stringify(newDjuli);
  fs.writeFileSync('./djuliDb.json', stringDjuli);
  res.json('Removed');
});



app.listen(PORT, () => {
  console.info(`Listening at http://localhost:${PORT}`);
});
