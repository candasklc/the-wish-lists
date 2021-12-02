const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
const db = require('./db');
const tableName = 'wishes';
const dirName = ''
 
app.use(express.json());

// ------------- STATIC FILES
app.use(express.static(path.join(__dirname, "/dist/angularExpress")));
app.use(express.static(path.join(__dirname, "/src/app/components/mainpage")));

// ------------- API ROUTES
app.get('/all', (req, res) => {
  const sql = "SELECT * FROM "+tableName;
  const params = []
  db.all(sql, params, (err, rows) => {
      if (err) {
        res.status(400).json({"error":err.message});
        return;
      }
      res.status(200).json(rows);
    })
});

app.get('/wish/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'SELECT * FROM ' + tableName + ' WHERE wishId = ?';
  db.get(sql, id, (err, row) => {
    if (err) {
        res.status(400).json({"error":err.message});
        return;
      }
      res.json(row);
    });
});

app.post('/add-wish',(req, res) => {
  // Add request body to retrieve data from the request.(From frontend)
  const title = req.body.title;
  const link = req.body.link;
  const user = req.body.user;
  const sql = 'INSERT INTO wishes (title, link, user) VALUES ("'+ title +'","'+ link +'","'+ user +'")';
  db.exec(sql, (err, row) => {
    if (err) {
      res.json({"error":err.message});
    }
    res.send('The item was successfully added. \n title: '+ title + '\n link: '+ link + '\n user: ' + user);
  });     
});

// ------------- PAGE ROUTES
app.get('/', (req, res) => {
  res.sendFile(path.join('/dist/angularExpress/index.html'));
});



app.listen(PORT, () => {
  console.info(`Listening at http://localhost:${PORT}`);
});
