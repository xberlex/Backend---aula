const express = require('express');
const app = express();

// Array em memória
const tarefas = [
  { id: 1, nome: "Estudar middleware", concluida: false },
  { id: 2, nome: "Praticar Express", concluida: true }
];

// Middleware para processar JSON
app.use(express.json());

// Middleware de log
app.use((req, res, next) => {
  const dataHora = new Date().toLocaleString();
  console.log(`[${dataHora}] ${req.method} ${req.url}`);
  next();
});

// Roteador de tarefas
const tarefasRouter = express.Router();

// GET /tarefas -> listar todas as tarefas
tarefasRouter.get('/', (req, res) => {
  res.json(tarefas);
});

// POST /tarefas -> criar nova tarefa
tarefasRouter.post('/', (req, res) => {
  const novaTarefa = {
    id: tarefas.length > 0 ? tarefas[tarefas.length - 1].id + 1 : 1,
    nome: req.body.nome,
    concluida: req.body.concluida || false
  };
  tarefas.push(novaTarefa);
  res.status(201).json(novaTarefa);
});

// GET /tarefas/:tarefaId -> buscar tarefa por id
tarefasRouter.get('/:tarefaId', (req, res, next) => {
  const tarefaId = parseInt(req.params.tarefaId);
  const tarefa = tarefas.find(t => t.id === tarefaId);

  if (!tarefa) {
    return next(new Error("Tarefa não localizada")); // a) lançar erro
  }

  res.json(tarefa);
});

// PUT /tarefas/:tarefaId -> atualizar tarefa por id
tarefasRouter.put('/:tarefaId', (req, res, next) => {
  const tarefaId = parseInt(req.params.tarefaId);
  const tarefa = tarefas.find(t => t.id === tarefaId);

  if (!tarefa) {
    return next(new Error("Tarefa não localizada")); // b) lançar erro
  }

  tarefa.nome = req.body.nome ?? tarefa.nome;
  tarefa.concluida = req.body.concluida ?? tarefa.concluida;

  res.json(tarefa);
});

// DELETE /tarefas/:tarefaId -> remover tarefa por id
tarefasRouter.delete('/:tarefaId', (req, res, next) => {
  const tarefaId = parseInt(req.params.tarefaId);
  const index = tarefas.findIndex(t => t.id === tarefaId);

  if (index === -1) {
    return next(new Error("Tarefa não localizada")); // c) lançar erro
  }

  tarefas.splice(index, 1);
  res.status(204).send();
});

// Usar o roteador em /tarefas
app.use('/tarefas', tarefasRouter);

// d) Middleware de erro
app.use((err, req, res, next) => {
  if (err.message === "Tarefa não localizada") {
    return res.status(404).json({ erro: err.message });
  }
  res.status(400).json({ erro: err.message });
});

// Porta do servidor
app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});

module.exports = app;
