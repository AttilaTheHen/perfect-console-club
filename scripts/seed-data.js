import * as path from 'path';
import sqlite3 from 'sqlite3';
import guests from '../seed-data/guests.js';
import games from '../seed-data/games.js';

const __dirname = import.meta.dirname;
const sqlite = sqlite3.verbose();
const db = new sqlite.Database(path.join(__dirname, '..', 'db', 'pcc.db'));

db.serialize(() => {
  for (let i = 0; i < guests.length; i++) {
    db.run(
      `INSERT INTO guests (name, description) VALUES (?, ?)`,
      [guests[i].name, guests[i].description],
      function (error) {
        if (error) {
          console.error(error.message);
        } else {
          console.log(`Inserted row with ID ${this.lastID}`);
        }
      }
    );
  }
  for (let i = 0; i < games.length; i++) {
    db.run(
      `INSERT INTO games (title, developer, publisher, year, description, url)
      VALUES (?, ?, ?, ?, ?, ?)`,
      [games[i].title, games[i].developer, games[i].publisher, games[i].year, games[i].description, games[i].url],
      function (error) {
        if (error) {
          console.error(error.message);
        } else {
          console.log(`Inserted row with ID ${this.lastID}`);
        }
      }
    );
  }
});

db.close();
