#!/usr/bin/env node

const path = require('path');

console.log(JSON.stringify({
    args: process.args,
    pwd: typeof __dirname,
    pwdd: JSON.stringify(__dirname),
}, null, 4));