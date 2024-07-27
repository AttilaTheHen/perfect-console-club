import * as path from 'path';
import sqlite3 from 'sqlite3';

const __dirname = import.meta.dirname;
const sqlite = sqlite3.verbose();
const db = new sqlite.Database(path.join(__dirname, '..', 'db', 'pcc.db'));

const createGuests = () => {
  db.run(
    `CREATE TABLE IF NOT EXISTS guests (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT
    );`,
    function (error) {
      if (error) {
        console.error(error.message);
      } else {
        console.log('Guest table created');
      }
    }
  );
};
const createGames = () => {
  db.run(
    `CREATE TABLE IF NOT EXISTS games (
      id INTEGER PRIMARY KEY,
      title TEXT NOT NULL,
      developer TEXT,
      publisher TEXT,
      year INTEGER,
      description TEXT,
      url TEXT,
      notes TEXT
    );`,
    function (error) {
      if (error) {
        console.error(error.message);
      } else {
        console.log('Game table created');
      }
    }
  );
};
const createUsers = () => {
  db.run(
    `CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY,
      username TEXT NOT NULL,
      email TEXT NOT NULL,
      password TEXT NOT NULL
    );`,
    function (error) {
      if (error) {
        console.error(error.message);
      } else {
        console.log('User table created');
      }
    }
  );
};

db.serialize(() => {
  createGuests();
  createGames();
  createUsers();
});

db.close();
