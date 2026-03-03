
const data = require('fs').readFileSync('mocha_bundle.js', 'utf8');
const match = data.match(/const \w+=(\[\{category:[\s\S]*?\}\]);/);
if (match) {
    const categories = new Function('return ' + match[1])();
    let total = 0;
    categories.forEach(cat => {
        if (cat.finishers) total += cat.finishers.length;
    });
    console.log('Total Finishers in bundle:', total);
    let totalAll = 0;
    categories.forEach(cat => {
        if (cat.finishers) totalAll += cat.finishers.length;
        if (cat.dnf) totalAll += cat.dnf.length;
    });
    console.log('Total Everyone in bundle:', totalAll);
} else {
    console.log('Not found');
}

