import * as path from 'path';
import sqlite3 from 'sqlite3';

const __dirname = import.meta.dirname;
const sqlite = sqlite3.verbose();
const db = new sqlite.Database(path.join(__dirname, '..', 'db', 'pcc.db'));

db.serialize(() => {
  db.run(
    `DROP TABLE IF EXISTS guests;
    DROP TABLE IF EXISTS games;
    DROP TABLE IF EXISTS users;`,
    function (error) {
      if (error) {
        console.error(error.message);
      } else {
        console.log('All tables dropped');
      }
    }
  )
});

db.close();
