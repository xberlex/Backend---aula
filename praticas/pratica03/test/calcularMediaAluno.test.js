const { calcularMediaAluno } = require('../src/calcularMediaAluno');

test('a função calcularMediaAluno deve estar definida', () => {
  expect(calcularMediaAluno).toBeDefined();
});

test('deve lançar erro se a1 estiver indefinido', () => {
  expect(() => calcularMediaAluno(undefined, 7, 9))
    .toThrow('Notas a1 ou a2 não informadas');
});

test('deve lançar erro se a2 estiver indefinido', () => {
  expect(() => calcularMediaAluno(8, undefined, 9))
    .toThrow('Notas a1 ou a2 não informadas');
});

test('deve lançar erro se a1 for negativo', () => {
  expect(() => calcularMediaAluno(-5, 7, 9))
    .toThrow('Notas a1 ou a2 não podem ser negativas');
});

test('deve lançar erro se a2 for negativo', () => {
  expect(() => calcularMediaAluno(8, -3, 9))
    .toThrow('Notas a1 ou a2 não podem ser negativas');
});

test('deve lançar erro se a3 for negativa', () => {
  expect(() => calcularMediaAluno(8, 7, -5))
    .toThrow('Nota a3 não pode ser negativa');
});

test('deve calcular a média corretamente', () => {
  const resultado = calcularMediaAluno(8, 7, 9);
  expect(resultado).toBeCloseTo(8);
});

test('deve calcular a média corretamente quando a3 não for informada', () => {
  const resultado = calcularMediaAluno(8, 7);
  expect(resultado).toBeCloseTo(8*0.4 + 7*0.6);
});

test('deve calcular a média corretamente quando a3 é informada e a melhor combinação é a1 e a3', () => {
  const a1 = 9;
  const a2 = 4;
  const a3 = 10;

  const resultadoEsperado = (a1 + a2 + a3) / 3;

  const resultado = calcularMediaAluno(a1, a2, a3);
  expect(resultado).toBeCloseTo(resultadoEsperado);
});

test('deve calcular a média corretamente quando a3 é informada e a melhor combinação é a3 e a2', () => {
  const a1 = 4;
  const a2 = 8;
  const a3 = 10;

  const resultadoEsperado = (a1 + a2 + a3) / 3;

  const resultado = calcularMediaAluno(a1, a2, a3);
  expect(resultado).toBeCloseTo(resultadoEsperado);
});
