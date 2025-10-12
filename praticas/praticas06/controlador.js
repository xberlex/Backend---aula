// b) Importar a classe Tarefa do arquivo modelo.js
const Tarefa = require('./modelo');

// c) Função assíncrona adicionarTarefa(nome)
async function adicionarTarefa(nome) {
  // d) Criar instância de Tarefa
  const tarefa = new Tarefa(nome, false);

  // e) Chamar init() e inserir()
  await tarefa.init();
  await tarefa.inserir();

  console.log(' Tarefa adicionada com sucesso!');
}

// f) Função assíncrona buscarTarefa(nome)
async function buscarTarefa(nome) {
  // g) Criar instância de Tarefa
  const tarefa = new Tarefa(nome, false);

  // h) Chamar init() e buscar()
  await tarefa.init();
  await tarefa.buscar();

  // i) Retornar a constante tarefa
  return tarefa;
}

// j) Função assíncrona atualizarTarefa(nome, concluida)
async function atualizarTarefa(nome, concluida) {
  // k) Criar instância de Tarefa
  const tarefa = new Tarefa(nome, concluida);

  // l) Chamar init() e buscar()
  await tarefa.init();
  await tarefa.buscar();

  // Se encontrou a tarefa, atualiza as propriedades e chama alterar()
  if (tarefa.id) {
    tarefa.nome = nome;
    tarefa.concluida = concluida;

    // m) Chamar alterar()
    await tarefa.alterar();
    console.log(' Tarefa atualizada com sucesso!');
  } else {
    console.log(' Tarefa não encontrada para atualização.');
  }
}

// n) Função assíncrona removerTarefa(nome)
async function removerTarefa(nome) {
  // o) Criar instância de Tarefa
  const tarefa = new Tarefa(nome, false);

  // p) Chamar init() e buscar()
  await tarefa.init();
  await tarefa.buscar();

  // Se encontrou a tarefa, deleta
  if (tarefa.id) {
    await tarefa.deletar();
    console.log(' Tarefa removida com sucesso!');
  } else {
    console.log(' Tarefa não encontrada para remoção.');
  }
}

// q) Exportar todas as funções
module.exports = {
  adicionarTarefa,
  buscarTarefa,
  atualizarTarefa,
  removerTarefa
};
