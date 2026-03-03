const fs = require('fs');
const path = require('path');

// 1. Read JSON data
const data = fs.readFileSync('mocha_bundle.js', 'utf8');
const match = data.match(/const \w+=(\[\{category:[\s\S]*?\}\]);/);
const categories = new Function('return ' + match[1])();

let finishers = [];
categories.forEach(cat => {
    if (cat.finishers) {
        cat.finishers.forEach(f => {
            finishers.push(f.dorsal);
        });
    }
});

// 2. Read Diplomas directory
const files = fs.readdirSync('Diplomas')
    .filter(f => f.endsWith('.png'))
    .sort((a, b) => parseInt(a) - parseInt(b));

if (files.length !== finishers.length) {
    console.log('Mismatch: ' + files.length + ' files vs ' + finishers.length + ' finishers');
    process.exit(1);
}

// 3. Rename files
files.forEach((file, index) => {
    const oldPath = path.join('Diplomas', file);
    const newPath = path.join('Diplomas', String(finishers[index]) + '.png');
    // We can do a dry run first
    console.log(file + ' -> ' + finishers[index] + '.png');
    // fs.renameSync(oldPath, newPath);
});
console.log('Total matched: ' + files.length);
