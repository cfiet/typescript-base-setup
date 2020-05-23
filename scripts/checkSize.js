const fs = require("fs");
const path = require("path");
const MAX_SIZE = 13 * 1024 * 1204;

function dirsize(p) {
    return fs.readdirSync(p).map(e => {
        if (e.endsWith(".d.js")) return 0;
        const fullPath = path.join(p, e);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            return dirsize(fullPath);
        } else {
            return stat.size;
        }
    }).reduce((acc, v) => acc + v, 0);
}

const size = dirsize("./lib");
const sizePct = Math.round(size / MAX_SIZE * 100000) / 100;

console.log(`Size: ${size} (${sizePct}%)`);
console.log(`Available: ${MAX_SIZE - size}`);

if (size < MAX_SIZE) {
    process.exit(0);
}
process.exit(1);
