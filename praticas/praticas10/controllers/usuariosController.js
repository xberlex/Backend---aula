const usuariosModel = require('../models/usuariosModel');
const { compararSenha, gerarToken } = require('../middlewares/authMiddleware');

const criar = async (req, res) => {
    try {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(422).json({ msg: "Email e Senha são obrigatórios" });
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10);

        const novoUsuario = await usuariosModel.create({
            email,
            senha: senhaCriptografada
        });

        return res.status(201).json(novoUsuario);
    } catch (erro) {
        return res.status(500).json({ erro: "Erro ao criar usuário" });
    }
};

const entrar = async (req, res) => {
    try {
        const usuarioEncontrado = await usuariosModel.findOne({ email: req.body.usuario });

        if (!usuarioEncontrado) {
            return res.status(401).json({ msg: "Credenciais inválidas" });
        }

        const senhaConfere = await compararSenha(req.body.senha, usuarioEncontrado.senha);

        if (!senhaConfere) {
            return res.status(401).json({ msg: "Credenciais inválidas" });
        }

        const token = gerarToken({ email: req.body.usuario });
        return res.status(200).json({ token });

    } catch (erro) {
        return res.status(500).json({ erro: "Erro interno no servidor" });
    }
};

const renovar = (req, res) => {
    const token = gerarToken({ email: req.usuario.email });
    return res.status(200).json({ token });
};

const remover = async (req, res) => {
    try {
        await usuariosModel.findOneAndDelete({ _id: req.params.id });
        return res.status(204).send();
    } catch (erro) {
        return res.status(500).json({ erro: "Erro ao remover usuário" });
    }
};

module.exports = {
    criar,
    entrar,
    renovar,
    remover
};