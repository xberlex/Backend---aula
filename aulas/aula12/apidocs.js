const express = require('express');
const swaggerUi = require('swagger-Ui-express');
const YAML = require('yaml');
const fs = require('fs');

// carrega o arquivo swagger
const file = fs.readFileSync('./swagger.yaml', 'utf8');

// valida o arquivo swagger
const swaggerDoc = YAML.parse(file);

const router = express.Router();

router.use("/", swaggerUi.serve);

router.get("/", swaggerDoc.setup(swaggerDoc));

module.exports = router;