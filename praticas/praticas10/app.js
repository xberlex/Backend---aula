require('dotenv').config();
const mongoose = require('mongoose');

const express = require('express');
const path = require('path');

const usuariosRouter = require('./routes/usuariosRouter');
const apidocsRouter = require('./routes/apidocsRouter');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/usuarios', usuariosRouter);
app.use('/api-docs', apidocsRouter);

module.exports = app;