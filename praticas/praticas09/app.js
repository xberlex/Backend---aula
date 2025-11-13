const express = require('express');
const apidocsRouter = require('./routes/apidocsRouter');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yaml');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());
app.use('/api-docs', apidocsRouter);

let swaggerDocument;
try {
  const file = fs.readFileSync(path.join(__dirname, 'swagger.yaml'), 'utf8');
  swaggerDocument = YAML.parse(file);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
} catch (err) {
  console.error('Erro ao carregar swagger.yaml:', err.message);
}

let produtos = [
  { id: 1, nome: 'Arroz', preco: 12.5 },
  { id: 2, nome: 'Feijão', preco: 9.8 }
];

app.get('/produtos', (req, res) => {
  res.json(produtos);
});

app.post('/produtos', (req, res) => {
  const { nome, preco } = req.body;
  if (!nome || preco === undefined) return res.status(400).json({ erro: 'Nome e preço são obrigatórios.' });
  const novoProduto = { id: produtos.length ? produtos[produtos.length - 1].id + 1 : 1, nome, preco };
  produtos.push(novoProduto);
  res.status(201).json(novoProduto);
});

app.get('/produtos/:produtoId', (req, res) => {
  const id = parseInt(req.params.produtoId);
  const produto = produtos.find(p => p.id === id);
  if (!produto) return res.status(404).json({ erro: 'Produto não encontrado.' });
  res.json(produto);
});

app.put('/produtos/:produtoId', (req, res) => {
  const id = parseInt(req.params.produtoId);
  const { nome, preco } = req.body;
  const index = produtos.findIndex(p => p.id === id);
  if (index === -1) return res.status(404).json({ erro: 'Produto não encontrado.' });
  produtos[index] = { id, nome, preco };
  res.json(produtos[index]);
});

app.delete('/produtos/:produtoId', (req, res) => {
  const id = parseInt(req.params.produtoId);
  const index = produtos.findIndex(p => p.id === id);
  if (index === -1) return res.status(404).json({ erro: 'Produto não encontrado.' });
  const removido = produtos.splice(index, 1);
  res.json({ mensagem: `Produto ${removido[0].nome} removido com sucesso.` });
});

app.get('/', (req, res) => {
  res.json({ mensagem: 'API prática09 funcionando!' });
});

module.exports = app;