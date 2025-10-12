const { MongoClient } = require("mongodb");

const uri = "";

let client;
let db;

async function conectarDb() {
  if (db) return db; // evita reconectar toda vez

  try {
    client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      tls: true, // garante SSL
      tlsAllowInvalidCertificates: true // útil em alguns ambientes Windows
    });

    await client.connect();
    db = client.db("meu_banco"); // nome do seu banco
    console.log(" Conectado ao MongoDB com sucesso!");
    return db;

  } catch (erro) {
    console.error(" Erro ao conectar ao MongoDB:", erro);
    process.exit(1);
  }
}

module.exports = { conectarDb };
