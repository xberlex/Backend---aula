// b) Importar o pacote readline-sync
const readline = require('readline-sync');

// c) Importar o arquivo controlador.js
const controlador = require('./controlador');

// d) Função menu() sem parâmetro
function menu() {
  console.log('\n===== MENU =====');
  console.log('1 - Adicionar tarefa');
  console.log('2 - Buscar tarefa');
  console.log('3 - Atualizar tarefa');
  console.log('4 - Remover tarefa');
  console.log('5 - Sair');
  console.log('================');
}

// e) Função escolherOpcao(opcao)
async function escolherOpcao(opcao) {
  switch (opcao) {
    // g) Adicionar tarefa
    case '1':
      const nomeAdicionar = readline.question('Digite o nome da tarefa: ');
      await controlador.adicionarTarefa(nomeAdicionar);
      break;

    // h) Buscar tarefa
    case '2':
      const nomeBuscar = readline.question('Digite o nome da tarefa: ');
      const tarefaEncontrada = await controlador.buscarTarefa(nomeBuscar);
      if (tarefaEncontrada && tarefaEncontrada.id) {
        console.log('\nTarefa encontrada:');
        console.log(`ID: ${tarefaEncontrada.id}`);
        console.log(`Nome: ${tarefaEncontrada.nome}`);
        console.log(`Concluída: ${tarefaEncontrada.concluida ? 'Sim' : 'Nao'}`);
      } else {
        console.log(' Nenhuma tarefa encontrada com esse nome.');
      }
      break;

    // i) Atualizar tarefa
    case '3':
      const nomeAtualizar = readline.question('Digite o nome da tarefa: ');
      const concluidaStr = readline.question('A tarefa foi concluida? (s/n): ');
      const concluida = concluidaStr.toLowerCase() === 's';
      await controlador.atualizarTarefa(nomeAtualizar, concluida);
      break;

    // j) Remover tarefa
    case '4':
      const nomeRemover = readline.question('Digite o nome da tarefa: ');
      await controlador.removerTarefa(nomeRemover);
      break;

    // k) Sair
    case '5':
      console.log(' Encerrando o programa...');
      process.exit();

    // Caso inválido
    default:
      console.log(' Opcao invalida! Tente novamente.');
  }
}

// l) Função main() com laço infinito
async function main() {
  while (true) {
    menu(); // mostra o menu
    const opcao = readline.question('Escolha uma opcao: '); // m) lê a opção
    await escolherOpcao(opcao); // chama a função que executa a opção
  }
}

// n) Chamada da função main()
main();
