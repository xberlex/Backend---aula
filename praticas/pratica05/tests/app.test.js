const app = require('../app');
const request = require('supertest')(app);

let tarefaId; // variável para armazenar o ID da tarefa criada

// Teste GET /tarefas
describe('Testes da rota GET /tarefas', () => {
  it('Deve retornar status 200 e conteúdo JSON', async () => {
    const response = await request.get('/tarefas');
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/json/);
  });
});

// f) Teste POST /tarefas
describe('Testes da rota POST /tarefas', () => {
  it('Deve criar uma tarefa e retornar status 201 e JSON', async () => {
    const novaTarefa = { nome: 'Estudar Node', concluida: false };
    const response = await request.post('/tarefas').send(novaTarefa);

    expect(response.status).toBe(201);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body).toHaveProperty('id');
    expect(response.body.nome).toBe(novaTarefa.nome);

    // Salva o ID para os próximos testes
    tarefaId = response.body.id;
  });
});

// g) Teste GET /tarefas/:id
describe('Testes da rota GET /tarefas/:id', () => {
  it('Deve retornar status 200 e conteúdo JSON da tarefa criada', async () => {
    const response = await request.get(`/tarefas/${tarefaId}`);
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body).toHaveProperty('id', tarefaId);
  });
});

// h) Teste GET /tarefas/1 (tarefa inexistente)
describe('Testes da rota GET /tarefas/1 inexistente', () => {
  it('Deve retornar status 404 e conteúdo JSON', async () => {
    const response = await request.get('/tarefas/1');
    // se a tarefa criada anteriormente for id=1, substitua por outro id inválido, ex: 9999
    if (tarefaId === 1) {
      const notFoundResponse = await request.get('/tarefas/9999');
      expect(notFoundResponse.status).toBe(404);
      expect(notFoundResponse.headers['content-type']).toMatch(/json/);
    } else {
      expect(response.status).toBe(404);
      expect(response.headers['content-type']).toMatch(/json/);
    }
  });
});

// i) Teste PUT /tarefas/:id
describe('Testes da rota PUT /tarefas/:id', () => {
  it('Deve atualizar a tarefa e retornar status 200 e JSON', async () => {
    const tarefaAtualizada = { nome: 'Estudar Node e Express', concluida: true };
    const response = await request.put(`/tarefas/${tarefaId}`).send(tarefaAtualizada);

    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body).toHaveProperty('nome', tarefaAtualizada.nome);
    expect(response.body).toHaveProperty('concluida', tarefaAtualizada.concluida);
  });
});

// j) Teste PUT /tarefas/1 (tarefa inexistente)
describe('Testes da rota PUT /tarefas/1 inexistente', () => {
  it('Deve retornar status 404 e conteúdo JSON', async () => {
    // Se a tarefa criada anteriormente for id=1, testamos outro ID inexistente, ex: 9999
    const idInvalido = tarefaId === 1 ? 9999 : 1;

    const response = await request.put(`/tarefas/${idInvalido}`).send({
      nome: 'Teste inválido',
      concluida: true,
    });

    expect(response.status).toBe(404);
    expect(response.headers['content-type']).toMatch(/json/);
  });
});

// k) Teste DELETE /tarefas/:id
describe('Testes da rota DELETE /tarefas/:id', () => {
  it('Deve remover a tarefa criada e retornar status 204 sem conteúdo', async () => {
    const response = await request.delete(`/tarefas/${tarefaId}`);

    expect(response.status).toBe(204);
    expect(response.text).toBe(''); // não deve retornar corpo
  });
});

// l) Teste DELETE /tarefas/1 (tarefa inexistente)
describe('Testes da rota DELETE /tarefas/1 inexistente', () => {
  it('Deve retornar status 404 e conteúdo JSON', async () => {
    const idInvalido = tarefaId === 1 ? 9999 : 1;

    const response = await request.delete(`/tarefas/${idInvalido}`);
    expect(response.status).toBe(404);
    expect(response.headers['content-type']).toMatch(/json/);
  });
});
