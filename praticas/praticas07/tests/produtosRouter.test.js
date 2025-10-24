const supertest = require('supertest');
const app = require('../app');
const request = supertest(app);

let produtoId;

describe('/produtos', () => {

  it('POST /produtos - criar produto', async () => {
    const response = await request.post('/produtos').send({ nome: 'Laranja', preco: 10.0 });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('_id');
    expect(response.body.nome).toBe('Laranja');
    expect(response.body.preco).toBe(10.0);
    produtoId = response.body._id;
  });

  it('POST /produtos sem JSON - retorna 422', async () => {
    const response = await request.post('/produtos').send({});
    expect(response.status).toBe(422);
    expect(response.body).toHaveProperty('msg', 'Nome e preço do produto são obrigatórios');
  });

  it('GET /produtos - listar produtos', async () => {
    const response = await request.get('/produtos');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('GET /produtos/:id - produto específico', async () => {
    const response = await request.get(`/produtos/${produtoId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('_id', produtoId);
    expect(response.body).toHaveProperty('nome', 'Laranja');
    expect(response.body).toHaveProperty('preco', 10.0);
  });

  it('GET /produtos/0 - ID inválido', async () => {
    const response = await request.get('/produtos/0');
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('msg', 'Parâmetro inválido');
  });

  it('GET /produtos/000000000000000000000000 - produto não encontrado', async () => {
    const response = await request.get('/produtos/000000000000000000000000');
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('msg', 'Produto não encontrado');
  });

  it('PUT /produtos/:id - atualizar produto', async () => {
    const response = await request.put(`/produtos/${produtoId}`).send({ nome: 'Laranja Pera', preco: 18.0 });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('_id', produtoId);
    expect(response.body).toHaveProperty('nome', 'Laranja Pera');
    expect(response.body).toHaveProperty('preco', 18.0);
  });

  it('PUT /produtos/:id sem JSON - retorna 422', async () => {
    const response = await request.put(`/produtos/${produtoId}`).send({});
    expect(response.status).toBe(422);
    expect(response.body).toHaveProperty('msg', 'Nome e preço do produto são obrigatórios');
  });

  it('PUT /produtos/0 - ID inválido', async () => {
    const response = await request.put('/produtos/0').send({ nome: 'Teste', preco: 10 });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('msg', 'Parâmetro inválido');
  });

  it('PUT /produtos/000000000000000000000000 - produto não encontrado', async () => {
    const response = await request.put('/produtos/000000000000000000000000').send({ nome: 'Teste', preco: 10 });
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('msg', 'Produto não encontrado');
  });

  it('DELETE /produtos/:id - remover produto', async () => {
    const response = await request.delete(`/produtos/${produtoId}`);
    expect(response.status).toBe(204);
  });

  it('DELETE /produtos/0 - ID inválido', async () => {
    const response = await request.delete('/produtos/0');
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('msg', 'Parâmetro inválido');
  });

  it('DELETE /produtos/:id - produto não encontrado', async () => {
    const response = await request.delete(`/produtos/${produtoId}`);
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('msg', 'Produto não encontrado');
  });

});