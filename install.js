#!/usr/bin/env node

console.log(JSON.stringify({
    args: process.args,
    pwd: __dirname,

}, null, 4));