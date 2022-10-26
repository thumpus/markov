/** Command-line tool to generate Markov text. */
const fs = require('fs');
const process = require('process');
const axios = require('axios');
const markov = require('./markov');

function outputText(text) {
    let machine = new markov.MarkovMachine(text);
    console.log(machine.makeText());
}

function fileText() {
    fs.readFile(path, "utf-8", function (err, data){
        if (err){
            console.error(`could not read ${path}: ${err}`);
            process.exit(1);
        } else {
            outputText(data);
        }
    });
}

async function urlText(url) {
    let response;
    try {
        response = await axios.get(url);
    } catch (err) {
        console.error(`couldn't read ${url}: ${err}`);
        process.exit(1);
    }
    outputText(response.data);
}

let [method, path] = process.argv.slice(2);
if (method === "file"){
    fileText(path);
}
else if (method === "url"){
    urlText(path);
}
else {
    console.error(`unknown method ${method}`);
    process.exit(1);
}