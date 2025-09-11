// 1. importar o framework 
const express = require ("express");

// 2. Criar uma insância da aplicação
const app = express();

// middleware embutido ou integrado
app.use(express.json());

//?param1=valor1&param2=valor2...
app.use(express.urlencoded({ extended: false }));

//midleware de terceiros
app.use(cors());

// middleware de aplicação
app.use((req, res, next) => {
    console.log("Passei pelo middleware de app");
    next();
});

// middleware de roteamento
const router = express.Router();

router.get('/', (req, res) => {
res.send("Listar as tarefas");
});

router.post('/', (req, res) => {
 console.log(req.body);
res.status(201).send("Tarefa criada com sucesso");
});

router.put('/:id', (req, res) => {
 const { id } = req.params; // desestruturando o objeto params
 if (id == 1) return res.send("Tarefa atualizada");
 res.status(404).send("Tarefas não encontrada");
});

router.delete('/:id', (req, res) => {
 const { id } = req.params; // desestruturando o objeto params
 if (id == 1) return res.status(204).end(); //sem conteudo
 throw Error("Tarefa não encontrada");
});

module.exports = router;