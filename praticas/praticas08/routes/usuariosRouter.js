const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

// POST /usuarios/login
router.post('/login', (req, res) => {
  const { usuario, senha } = req.body;

  // Teste usa: { "usuario": "email@exemplo.com", "senha": "abcd1234" }
  if (usuario === 'email@exemplo.com' && senha === 'abcd1234') {
    const token = authMiddleware.gerarToken({ email: usuario });
    return res.status(200).json({ token });
  }

  res.status(401).json({ msg: 'Credenciais inválidas' });
});

// POST /usuarios/renovar
router.post('/renovar', authMiddleware.verificarToken, (req, res) => {
  const token = authMiddleware.gerarToken({ email: req.usuario.email });
  return res.status(200).json({ token });
});

module.exports = router;
