require('dotenv').config();
const express = require('express');

// Importa os roteadores
const usuariosRouter = require('./routes/usuariosRouter');
const produtosRouter = require('./routes/produtosRouter');

const app = express();

// Permite trabalhar com JSON
app.use(express.json());

// Rota principal opcional (teste rápido)
app.get('/', (req, res) => {
  res.status(200).json({ msg: 'API prática 08 funcionando corretamente!' });
});

// Middleware de rotas de usuários
app.use('/usuarios', usuariosRouter);

// Middleware de rotas de produtos
app.use('/produtos', produtosRouter);

module.exports = app;