const sqlite3 = require('sqlite3').verbose();


// opens the database connection automatically.
const db = new sqlite3.Database('app.db', (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
  });

  db.serialize(() => {
    db.exec('CREATE TABLE IF NOT EXISTS wishes (wishId INTEGER PRIMARY KEY, title VARCHAR(125) NOT NULL, link VARCHAR(10000) NOT NULL, user VARCHAR(10) NOT NULL)');
})

module.exports = db