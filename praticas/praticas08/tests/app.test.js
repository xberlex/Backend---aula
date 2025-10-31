const supertest = require('supertest');
const app = require('../app');
const request = supertest(app);

let token = '';
let novoToken = '';

// GET /produtos sem token
test('GET /produtos sem token deve retornar 401 e msg "Não autorizado"', async () => {
  const response = await request.get('/produtos');
  expect(response.status).toBe(401);
  expect(response.type).toMatch(/json/);
  expect(response.body).toHaveProperty('msg', 'Não autorizado');
});

// GET /produtos com token inválido
test('GET /produtos com token inválido deve retornar 401 e msg "Token inválido"', async () => {
  const response = await request.get('/produtos').set('authorization', '123456789');
  expect(response.status).toBe(401);
  expect(response.type).toMatch(/json/);
  expect(response.body).toHaveProperty('msg', 'Token inválido');
});

// POST /usuarios/login
test('POST /usuarios/login deve retornar 200 e conter token', async () => {
  const response = await request
    .post('/usuarios/login')
    .send({ usuario: 'email@exemplo.com', senha: 'abcd1234' });

  expect(response.status).toBe(200);
  expect(response.type).toMatch(/json/);
  expect(response.body).toHaveProperty('token');

  token = response.body.token;
});

// GET /produtos com token válido
test('GET /produtos com token válido deve retornar 200 e JSON', async () => {
  const response = await request.get('/produtos').set('authorization', token);
  expect(response.status).toBe(200);
  expect(response.type).toMatch(/json/);
});

// POST /usuarios/renovar
test('POST /usuarios/renovar deve retornar 200 e conter novo token', async () => {
  const response = await request.post('/usuarios/renovar').set('authorization', token);
  expect(response.status).toBe(200);
  expect(response.type).toMatch(/json/);
  expect(response.body).toHaveProperty('token');

  novoToken = response.body.token;
});

// GET /produtos com novo token
test('GET /produtos com novo token deve retornar 200 e JSON', async () => {
  const response = await request.get('/produtos').set('authorization', novoToken);
  expect(response.status).toBe(200);
  expect(response.type).toMatch(/json/);
});
