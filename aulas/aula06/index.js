// 1. importar o framework 
const express = require ("express");
//inportar midleware de terceiros
const cors = require('./router')

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

app.use('/tarefas', router);

// Criar um middleware de roteamento
app.get('/', (req, res) => {
    res.send("Olá");
});


// Criar um middleware de erro
app.use((err, req, res, next) => {
    res.status(500).send(err.message);
});

// 3. iniciar a aplicação
app.listen(3000, () => {
    console.log("App está On!");
})