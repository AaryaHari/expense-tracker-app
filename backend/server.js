import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { Database } from 'sqlite3';
import PDFDocument from 'pdfkit';

const app = express();
const port = 3001;
const db = new Database('./data.sqlite');

app.use(cors());
app.use(bodyParser.json());

// initialize tables
const initDb = () => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password TEXT
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS expenses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      item TEXT,
      amount REAL,
      type TEXT,
      quantity INTEGER,
      mode TEXT,
      date TEXT,
      transType TEXT
  )`);
  db.get('SELECT * FROM users WHERE username = ?', ['admin'], (err, row) => {
    if (!row) {
      db.run('INSERT INTO users (username, password) VALUES (?, ?)', ['admin', 'password']);
    }
  });
};

initDb();

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  db.get('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, row) => {
    if (row) {
      res.json({ success: true });
    } else {
      res.status(401).json({ success: false });
    }
  });
});

app.get('/expenses', (req, res) => {
  db.all('SELECT * FROM expenses', (err, rows) => {
    res.json(rows);
  });
});

app.post('/expenses', (req, res) => {
  const { item, amount, type, quantity, mode, date, transType } = req.body;
  db.run(
    'INSERT INTO expenses (item, amount, type, quantity, mode, date, transType) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [item, amount, type, quantity, mode, date, transType],
    function (err) {
      if (err) return res.status(500).send();
      res.json({ id: this.lastID });
    }
  );
});

app.delete('/expenses/:id', (req, res) => {
  db.run('DELETE FROM expenses WHERE id = ?', [req.params.id], function (err) {
    if (err) return res.status(500).send();
    res.json({});
  });
});

app.get('/summary/:type', (req, res) => {
  const type = req.params.type; // month|mode|type
  db.all('SELECT * FROM expenses', (err, rows) => {
    res.json(rows);
  });
});

app.get('/report/:month', (req, res) => {
  const doc = new PDFDocument();
  const chunks = [];
  doc.on('data', chunk => chunks.push(chunk));
  doc.on('end', () => {
    res.setHeader('Content-Type', 'application/pdf');
    res.send(Buffer.concat(chunks));
  });
  doc.text('Monthly Report');
  doc.end();
});

app.listen(port, () => console.log(`Server running on ${port}`));
