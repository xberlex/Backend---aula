const supertest = require('supertest');
const app = require('../app');

const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongod;
let usuarioId = '';
let token = '';

const request = supertest(app);

beforeAll(async () => {
  jest.setTimeout(20000);
  mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongod.stop();
});

describe('Testes da API /usuarios', () => {
  test('POST /usuarios - cria usuário', async () => {
    const res = await request
      .post('/usuarios')
      .set('Accept', 'application/json')
      .send({ email: 'usuario@email.com', senha: 'abcd1234' });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.email).toBe('usuario@email.com');
    usuarioId = res.body._id;
  });

  test('POST /usuarios - sem json -> 422', async () => {
    const res = await request
      .post('/usuarios')
      .set('Accept', 'application/json')
      .send({});
    expect(res.status).toBe(422);
    expect(res.body).toHaveProperty('msg');
  });

  test('POST /usuarios/login - gera token', async () => {
    const res = await request
      .post('/usuarios/login')
      .set('Accept', 'application/json')
      .send({ usuario: 'usuario@email.com', senha: 'abcd1234' });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('token');
    token = res.body.token;
  });

  test('POST /usuarios/login sem json -> 401', async () => {
    const res = await request
      .post('/usuarios/login')
      .set('Accept', 'application/json')
      .send({});
    expect(res.status).toBe(401);
    expect(res.body.msg).toMatch(/credenciais/i);
  });

  test('POST /usuarios/renovar com token válido -> 200', async () => {
    const res = await request
      .post('/usuarios/renovar')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  test('POST /usuarios/renovar com token inválido -> 401', async () => {
    const res = await request
      .post('/usuarios/renovar')
      .set('Authorization', 'Bearer 123456789');
    expect(res.status).toBe(401);
    expect(res.body.msg).toMatch(/token inválido|invalid token/i);
  });

  test('DELETE /usuarios/:id com token válido -> 204', async () => {
    const res = await request
      .delete(`/usuarios/${usuarioId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
  });
});
