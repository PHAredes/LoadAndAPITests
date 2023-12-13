const fs = require('fs');
const path = require('path');

function replaceInFile(filePath, oldText, newText) {
  const data = fs.readFileSync(filePath, 'utf-8');
  const newValue = data.replace(new RegExp(oldText, 'g'), newText);
  fs.writeFileSync(filePath, newValue, 'utf-8');
}

function replaceInDir(dirPath, oldText, newText) {
  const files = fs.readdirSync(dirPath);

  files.forEach(file => {
    const filePath = path.join(dirPath, file);
    const stats = fs.statSync(filePath);

    if (stats.isFile()) {
      replaceInFile(filePath, oldText, newText);
    } else if (stats.isDirectory()) {
      replaceInDir(filePath, oldText, newText);
    }
  });
}

const dirPath = './local_api'; 
const port = process.argv[2];
const oldText = 'http://localhost:\\d+';
const newText = `http://localhost:${port}`;

replaceInDir(dirPath, oldText, newText);
