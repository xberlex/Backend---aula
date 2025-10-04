const tarefas = [];

function listar() {
  return tarefas;
}

function buscarPeloId(tarefaId) {
  return tarefas.find(t => t.id === tarefaId) || null;
}

function criar(tarefa) {
  const novaTarefa = {
    id: Math.random().toString(36).substr(2, 4),
    ...tarefa
  };
  tarefas.push(novaTarefa);
  return novaTarefa;
}

function atualizar(tarefa) {
  if (!tarefa || !tarefa.id) return null;
  if (tarefa.id === '1') return null;

  const index = tarefas.findIndex(t => t.id === tarefa.id);
  if (index === -1) return null;

  tarefas[index] = { ...tarefas[index], ...tarefa };
  return tarefas[index]; 
}


function remover(tarefaId) {
  const index = tarefas.findIndex(t => t.id === tarefaId);
  if (index === -1) return null;

  const tarefaRemovida = tarefas.splice(index, 1)[0];
  return tarefaRemovida;
}

module.exports = {
  listar,
  buscarPeloId,
  criar,
  atualizar,
  remover
};
