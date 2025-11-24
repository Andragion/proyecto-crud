const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

// CONEXION BD
const db = mysql.createConnection({
    host: 'localhost', user: 'root', password: '', database: 'curso_seguridad' });
db.connect(err => {
    if(err) console.log('❌ Error BD');
    else console.log('✅ Conectado a BD');
});


// 1. LEER (GET)
app.get('/users', (req, res) => {
    db.query('SELECT id, name, email FROM users', (err, rows) => {
        res.json(rows);
    });
});

// 2. CREAR (POST) - Versión 1 (Aún sin hash, lo vemos el Lunes)
app.post('/users', (req, res) => {
    const { name, email, password } = req.body;
    db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
    [name, email, password], (err, result) => {
        res.json({ message: 'Creado' });
    });
});

app.listen(3000, () => console.log('🚀 Server en puerto 3000'));