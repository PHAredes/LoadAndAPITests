const fs = require('fs');
const path = require('path');

function replaceInFile(filePath, oldText, newText) {
  const data = fs.readFileSync(filePath, 'utf-8');
  const newValue = data.replace(new RegExp(oldText, 'g'), newText);
  fs.writeFileSync(filePath, newValue, 'utf-8');
}

function replaceInDir(dirPath, oldText, newText) {
  const stats = fs.statSync(dirPath);

  if (stats.isFile()) {
    replaceInFile(dirPath, oldText, newText);
    return;
  } 
  
  if (stats.isDirectory()) {
    const files = fs.readdirSync(dirPath);

    files.forEach(file => {
      const filePath = path.join(dirPath, file);
      replaceInDir(filePath, oldText, newText);
    });
  }
}

const dirPaths = ['./local_api', './artillery_load_tests/artillery_local_api.yml']; // Substitua pelos caminhos corretos para sua pasta e arquivo
const port = process.argv[2];
const oldText = 'http://localhost:\\d+';
const newText = `http://localhost:${port}`;

dirPaths.forEach(dirPath => {
  replaceInDir(dirPath, oldText, newText);
});
