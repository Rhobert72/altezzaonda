const fs = require('fs');
const functions = require('./functions');

const regex = /title="(.*)">\1<\/a>/gm;
const notmatched = [ 'Mar Ligure',
'Francia',
'Mare Tirreno',
'Sicilia',
'Sardegna',
'Mare di Sardegna',
'Canale di Sardegna',
'Canale di Sicilia',
'Mare Ionio',
'Sicilia',
'Mare Adriatico',
'Slovenia',
'Mar Ligure',
'Mare Tirreno',
'Mar Ligure',
'Liguria',
'Toscana',
'Mar Tirreno',
'Toscana',
'Lazio',
'Campania',
'Basilicata',
'Calabria',
'Sicilia',
'Sardegna',
'Mar di Sardegna',
'Sardegna',
'Canale di Sardegna',
'Sardegna',
'Canale di Sicilia',
'Sicilia',
'Mar Ionio',
'Sicilia',
'Calabria',
'Reggio Calabria',
'Basilicata',
'Puglia',
'Mare Adriatico',
'Puglia',
'Abruzzo',
'Marche',
'Emilia-Romagna',
'Veneto',
'Friuli-Venezia Giulia' ];

const data = fs.readFileSync(`${__dirname}/wiki.html`);
const content = data.toString();

const comuni = JSON.parse(fs.readFileSync(`${__dirname}/comuni.json`));
const province = JSON.parse(fs.readFileSync(`${__dirname}/province.json`));
const regioni = JSON.parse(fs.readFileSync(`${__dirname}/regioni.json`));
const comuniSulMarePath = `${__dirname}/comuni-sul-mare.json`;

let m;
const matches = [];
while ((m = regex.exec(content)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (m.index === regex.lastIndex) {
        regex.lastIndex++;
    }
    
    // The result can be accessed through the `m`-variable.
    m.forEach((match, groupIndex) => {
        if(groupIndex === 1){
            matches.push(match);
            //console.log(`Found match, group ${groupIndex}: ${match}`);
        }
        
    });
}

//console.log(matches);
//console.log(matches.length);
//console.log(comuni);
const found = [];
const notfound = [];
let matched;
matches.forEach(match => {
    matched = false;
    comuni.forEach( comune => {
        if(comune.nome === match){
            matched = true;

            comune.slug = functions.slugify(comune.nome);

            delete(comune.capoluogo_provincia);
            delete(comune.codice_catastale);

            let p = province.find( provincia => {
                return comune.id_provincia === provincia.id
            });

            let r = regioni.find( regione => {
                return comune.id_regione === regione.id
            });

            comune.provincia = functions.slugify(p.nome);
            comune.regione = functions.slugify(r.nome);
            comune.previsioni = [];
//console.log(comune);
            found.push(comune);
        }
    });
    if(!matched){
        if(notmatched.indexOf(match) === -1 && notfound.indexOf(match) === -1){
            notfound.push(match);  
        }         
    }
});
console.log(JSON.stringify(found[0]));
fs.writeFile(comuniSulMarePath, JSON.stringify(found),  function(err) {
    if (err) {
       return console.error(`Errore scrittura file ${err}`);
    }
 });

console.log(`Trovati: ${found.length}/645`);
console.log(`Non Trovati: ${notfound.length}`);
console.log(notfound);
