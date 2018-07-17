const fs = require('fs');
const functions = require('./functions');

const regex = /title="(.*)">\1<\/a>/gm;
const notmatched = ['Mar Ligure',
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
    'Friuli-Venezia Giulia'];

const data = fs.readFileSync(`${__dirname}/wiki.html`);
const content = data.toString().replace(/ \(italia\)/gi,'');

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
        if (groupIndex === 1) {
            if(matches.indexOf(match) === -1){
                matches.push(match);
            }
           
            //console.log(`Found match, group ${groupIndex}: ${match}`);
        }

    });
}

const found = [];
const notfound = [];
let matched;
let p, r ;

matches.forEach(match => {
    matched = false;
    comuni.forEach(comune => {

        if (comune.nome === match) {

            matched = true;

            p = province.find(provincia => {
                return comune.id_provincia === provincia.id;
            });
            //console.log(comune.id_provincia, p.id);
            r = regioni.find(regione => {
                return comune.id_regione === regione.id;
            });

            comune.provincia = {
                id: p.id,
                nome: p.nome,
                slug: functions.slugify(p.nome)
            };
            comune.regione = {
                id: r.id,
                nome: r.nome,
                slug: functions.slugify(r.nome)
            };

            const record = {
                id: comune.id,
                name: comune.nome,
                lat: comune.latitudine,
                lon: comune.longitudine,
                slug: functions.slugify(comune.nome),
                path: [functions.slugify(r.nome),functions.slugify(p.nome),functions.slugify(comune.nome)].join('/'),
                nation: {
                    id: "1",
                    name: 'italy',
                    slug: 'italy',
                    lang: 'it_it'
                },
                province: {
                    id: p.id,
                    nome: p.nome,
                    slug: functions.slugify(p.nome)
                },
                region: {
                    id: r.id,
                    name: r.nome,
                    slug: functions.slugify(r.nome)
                },
                forecasts: []

            };
        
            found.push(record);
        }
    });
    if (!matched) {
        if (notmatched.indexOf(match) === -1 && notfound.indexOf(match) === -1) {
            notfound.push(match);
        }
    }
});
//console.log(JSON.stringify(found[0]));
fs.writeFile(comuniSulMarePath, JSON.stringify(found), function (err) {
    if (err) {
        return console.error(`Errore scrittura file ${err}`);
    }
});

console.log(`Trovati: ${found.length}/645`);
console.log(`Non Trovati: ${notfound.length}`);
console.log(notfound);
