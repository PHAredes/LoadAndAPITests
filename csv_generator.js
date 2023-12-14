const faker = require('faker');
const fs = require('fs');

// Função para gerar um registro aleatório
function generateRandomRecord() {
  return {
    username: faker.internet.userName(),
    title: faker.lorem.sentence(),
    content: faker.lorem.paragraph(),
  };
}

// Função para gerar um CSV com registros aleatórios
function generateRandomCSV(numRecords) {
  const records = [];

  for (let i = 0; i < numRecords; i++) {
    records.push(generateRandomRecord());
  }

  const csvContent = records.map(record =>
    `${record.username},${record.title},${record.content}`
  );

  return csvContent.join('\n');
}

// Número de registros a serem gerados
const numRecords = 10000; // modifique o valor para alterar a quantidade de fakes gerados

// Gera o conteúdo CSV
const csvContent = generateRandomCSV(numRecords);

// Escreve o conteúdo CSV em um arquivo
fs.writeFileSync('./artillery_load_tests/users.csv', csvContent);

console.log(`Arquivo CSV gerado com ${numRecords} registros.`);
