const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// GET /produtos — rota protegida
router.get('/', authMiddleware.verificarToken, (req, res) => {
  // Retorna um array vazio em formato JSON
  res.status(200).json([]);
});

module.exports = router;
