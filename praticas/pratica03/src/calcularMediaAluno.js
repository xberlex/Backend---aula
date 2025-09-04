function calcularMediaAluno(a1, a2, a3) {

  if (a1 === undefined || a2 === undefined) {
    throw new Error('Notas a1 ou a2 não informadas');
  }

  if (a1 < 0 || a2 < 0) {
    throw new Error('Notas a1 ou a2 não podem ser negativas');
  }

  if (a3 !== undefined && a3 < 0) {
    throw new Error('Nota a3 não pode ser negativa');
  }

  const mediaPonderada = a1 * 0.4 + a2 * 0.6;

  const mediaSimples = a3 !== undefined ? (a1 + a2 + a3) / 3 : null;

  if (mediaSimples !== null) {
    return Math.max(mediaPonderada, mediaSimples);
  }

  return mediaPonderada;
}

module.exports = { calcularMediaAluno };