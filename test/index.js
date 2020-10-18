/* Teste */

const AgendaBase = require('..');

console.log('Inicializando instância de AgendaBase...');
const agenda = new AgendaBase();

console.log('Adicionando evento...');
agenda.new('SEG', 10, 'outubro', 2020, 10, 'teste');
