const fs = require('fs');
let data;

const inputUrl = process.argv[2];
const outputUrl = process.argv[3];

try {
    data = fs.readFileSync(inputUrl, 'utf8');
    const json = parseCsvToJson(data);
    writeJsonToFile(json, outputUrl);
} catch(err) {
    console.log(err);
};

function parseCsvToJson(data){

    // 1) data = "name,surname,yob,gender\njing,wang,1993,female\nsimone,maccarone,2003,male\npietro,viglino,1988,male\nvalentina,cherubini,2001,female";
    // 2) trasformare la stringa in un array di stringhe;
    //  righe = ["name,surname,yob,gender", "jing,wang,1993,female", "simone,maccarone,2003,male", "pietro,viglino,1988,male", "valentina,cherubini,2001,female"];
    // 3) separare la prima riga dalle successive:
    // intestazione = "name, surname, yob, gender"
    // righe = ["jing,wang,1993,female", "simone,maccarone,2003,male", "pietro,viglino,1988,male", "valentina,cherubini,2001,female"];
    // 4) trasformare intestazione in un array:
    // intestazione = ["name", "surname", "yob", "gender"];
    // 5) creare un array temporaneo;
    // 7) ciclare le righe
    // 8) trasformare le righe in array
    // for (let i = 0; i < righe.length; i++){
    //      const riga = righe[i];
    //      // 6
    //      rigaArray = ["jing", "wang", "1993", "female"];
    // }
    // 8) creare un nuovo oggetto vuoto
    // 9) ciclare su intestazione e aggiungere una prprietà all'oggetto per ogni elemento di intestazione
    // 10) aggiungere l'oggetto all'array temporaneo
    // 11) fare stringify dell'array temporaneo
    // 12) ritornare la stringa json

    const dataToArray = data.split(/\r?\n/);
    const intestazione = dataToArray.shift();
    const intestArray = intestazione.split(',');
    const tempArray = [];
    for (let i = 0; i < dataToArray.length; i++) {
        const data = dataToArray[i];
        const dataArray = data.split(',');
        const newObject = {};
        for (let j = 0; j < intestArray.length; j++) {
            const element = intestArray[j];
            const value = dataArray[j];
            if(isNaN(value * 1)){
                newObject[element] = value;
            } else if(!isNaN(value * 1)) {
                newObject[element] = value * 1;
            };
        };
        tempArray.push(newObject);
    };
    const jsonString = JSON.stringify(tempArray);
    return jsonString;

};

function writeJsonToFile(json, outputUrl) {
    try {
        fs.writeFileSync(outputUrl, json);
    } catch(err){
        console.log(err);
    };
};