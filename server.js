const express = require('express');
const app = express();
const db = require('./db');
require('dotenv').config();

app.use(express.static(__dirname));
app.use(express.json());

// Consultar todos
app.get('/api/books', async (req, res) => {
  const result = await db.query('SELECT * FROM books ORDER BY id');
  res.json(result.rows);
});

// Consultar individual
app.get('/api/books/:id', async (req, res) => {
  const result = await db.query('SELECT * FROM books WHERE id = $1', [req.params.id]);
  res.json(result.rows[0]);
});

// Agregar
app.post('/api/books', async (req, res) => {
  const { title, author } = req.body;
  await db.query('INSERT INTO books (title, author) VALUES ($1, $2)', [title, author]);
  res.status(201).send('Libro agregado');
});

// Editar
app.put('/api/books/:id', async (req, res) => {
  const { title, author } = req.body;
  await db.query('UPDATE books SET title = $1, author = $2 WHERE id = $3', [title, author, req.params.id]);
  res.send('Libro actualizado');
});

// Eliminar
app.delete('/api/books/:id', async (req, res) => {
  await db.query('DELETE FROM books WHERE id = $1', [req.params.id]);
  res.send('Libro eliminado');
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Servidor escuchando en puerto ${port}`));
