const mongoose = require ("mongoose");

const schema = new mongoose.Schema({
    nome: { 
        type: String,
        required: [true, 'Nome da tarefa e obrigatorio'],
        trim: true,
        minLength: [3, 'Nome da tarefa deve ter pelo menor 3 caracteres']
    },
    concluida: Boolean
});

module.exports = mongoose.model('Tarefa', schema);