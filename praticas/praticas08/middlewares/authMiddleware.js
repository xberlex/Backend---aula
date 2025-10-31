const jwt = require('jsonwebtoken');

// Função para verificar token
function verificarToken(req, res, next) {
  try {
    const token = req.headers['authorization'];

    if (!token) {
      return res.status(401).json({ msg: 'Não autorizado' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ msg: 'Token inválido' });
  }
}

// Função para gerar token
function gerarToken(payload) {
  try {
    const expiresIn = 120; // segundos
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
  } catch (error) {
    throw new Error('Erro ao gerar o token');
  }
}

module.exports = {
  verificarToken,
  gerarToken
};
