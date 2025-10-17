const Tarefa = require('../models/tarefasModel');

async function criar(req, res) {
  const novaTarefa = await Tarefa.create({
    nome: req.body.nome,
    concluida: false
  });
  return res.status(201).json({ 
    id: novaTarefa.id,
    nome: novaTarefa.nome,
    concluida: novaTarefa.concluida
   });
}

async function listar(req, res) {
  const tarefas = await Tarefa.find({});
  return res.json(tarefas);
}

async function buscar(req, res, next) {
  const { id } = req.params;
  const TarefaEncontrada = await Tarefa.findOne({ _id: id });
  if (TarefaEncontrada) {
    req.tarefa = {
      id: TarefaEncontrada._id,
      nome: TarefaEncontrada.nome,
      concluida: TarefaEncontrada.concluida,
    };
    return next();
  }
  return res.status(404).json({ msg: "Tarefa não encontrada"});
}

function exibir(req, res) {
  return res.json(req.tarefa);
}

async function atualizar(req, res) {
  const { id } = req.params;
  const tarefaAtualizada = await Tarefa.findByIdAndUpdate(
    { _id: id },
    { ...req.body }
  );
  return res.json({

    id: tarefaAtualizada.id,
    nome: tarefaAtualizada.nome,
    concluida: tarefaAtualizada.concluida
  });
}

async function remover(req, res) {
  const { id } = req.params;
  const tarefaRemovida = await Tarefa.findByIdAndDelete({ _id: id });
  return res.status(204).end();
}

module.exports = { criar, listar, buscar, exibir, atualizar, remover };
