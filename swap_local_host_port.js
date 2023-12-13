const fs = require('fs');
const path = require('path');

function replaceInFile(filePath, pattern, newNumber) {
  const data = fs.readFileSync(filePath, 'utf-8');
  const newValue = data.replace(new RegExp(`${pattern}\\d+`, 'g'), `${pattern}${newNumber}`);
  fs.writeFileSync(filePath, newValue, 'utf-8');
}

function replaceInDir(dirPath, pattern, newNumber) {
  const files = fs.readdirSync(dirPath);

  files.forEach(file => {
    const filePath = path.join(dirPath, file);
    const stats = fs.statSync(filePath);

    if (stats.isFile()) {
      replaceInFile(filePath, pattern, newNumber);
    } else if (stats.isDirectory()) {
      replaceInDir(filePath, pattern, newNumber);
    }
  });
}

const dirPath = './local_api'; // Hardcoded de propósito
const pattern = 'http://localhost:';
const newNumber = port;

replaceInDir(dirPath, pattern, newNumber);
