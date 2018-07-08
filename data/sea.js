const fs = require('fs');

const regex = /title="(.*)">\1<\/a>/gm;

const data = fs.readFileSync(`${__dirname}/wiki.html`);
const comuni = JSON.parse(fs.readFileSync(`${__dirname}/comuni.json`));
const content = data.toString();

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
const x = [];
let found;
matches.forEach(match => {
    found = false;
    comuni.forEach( comune => {
        if(comune.nome === match){
            found = true;
            x.push(comune);
        }
    });
    if(!found){
        console.log(`${match}: not found`);
    }
});

//console.log(x);
//console.log(x.length);

