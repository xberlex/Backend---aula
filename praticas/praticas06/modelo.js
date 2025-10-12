// Importar a função conectarDb do arquivo database.js
const { conectarDb } = require('./database');

class Tarefa {
  // i) Propriedade 'db' inicializando com null
  db = null;

  // j) Propriedade 'collection' inicializando com null
  collection = null;

  // k) Construtor com nome e concluida, e id inicializado como null
  constructor(nome, concluida) {
    this.id = null;
    this.nome = nome;
    this.concluida = concluida;
  }

  // l) Método init() para conectar ao banco e definir a coleção
  async init() {
    this.db = await conectarDb();
    this.collection = this.db.collection('tarefas');
  }

  // m) Função assíncrona inserir()
  async inserir() {
    // n) Inserir documento { nome, concluida }
    const resultado = await this.collection.insertOne({
      nome: this.nome,
      concluida: this.concluida
    });
    // o) Atribuir insertedId à propriedade id
    this.id = resultado.insertedId;
    console.log(' Tarefa inserida com sucesso!');
  }

  // p) Função assíncrona alterar()
  async alterar() {
    // q) Atualizar documento com base no id
    await this.collection.updateOne(
      { _id: this.id },
      { $set: { nome: this.nome, concluida: this.concluida } }
    );
    console.log(' Tarefa atualizada com sucesso!');
  }

  // r) Função assíncrona deletar()
  async deletar() {
    // s) Deletar documento com base no nome
    await this.collection.deleteOne({ nome: this.nome });
    console.log(' Tarefa deletada com sucesso!');
  }

  // t) Função assíncrona buscar()
  async buscar() {
    // u) Buscar documento pelo nome
    const resultado = await this.collection.findOne({ nome: this.nome });
    if (resultado) {
      // v) Atualizar propriedades com valores do resultado
      this.id = resultado._id;
      this.nome = resultado.nome;
      this.concluida = resultado.concluida;
      console.log(' Tarefa encontrada:', resultado);
    } else {
      console.log(' Nenhuma tarefa encontrada com esse nome.');
    }
  }
}

// w) Exportar a classe Tarefa
module.exports = Tarefa;
