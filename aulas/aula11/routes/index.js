const express = require('express');
const { verificarToken } = require('../middlewares/auth');

const router = express.Router();

router.get('/', verificarToken, function(req, res, next) {
  res.json("API esta ON!");
});

module.exports = router;
