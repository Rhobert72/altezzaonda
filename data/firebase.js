const fs = require('fs');
const firebase = require('firebase');
const geofire = require('geofire');


firebase.initializeApp({
    "apiKey": "AIzaSyDvtvvjNo0uff-u9krHwYDHva_zki-wSZY",
    "authDomain": "altezzaonda.firebaseapp.com",
    "databaseURL": "https://altezzaonda.firebaseio.com",
    "projectId": "altezzaonda",
    "storageBucket": "altezzaonda.appspot.com",
    "messagingSenderId": "302223763442"
  });

const locations = JSON.parse(fs.readFileSync(`${__dirname}/comuni-sul-mare.json`));

const database = firebase.database();
const databaseRef = database.ref('locations');
const geoFire = new geofire(databaseRef);

databaseRef.remove();

const promises = locations.map( location => {
    newForecastRef = databaseRef.push();
    return newForecastRef
            .set(location)
            .then( response => { 
                return {
                    key: newForecastRef.key,
                    coords: [location.lat, location.lon]
                };
            });
});

Promise
    .all(promises)
    .then(
        locations => {
            console.log('Inserting into geofire...');
            const promises = locations.map( location => {
                return geoFire
                    .set(location.key, location.coords)
                    .catch(reason => process.exit(-1));
            });
            Promise
                .all(promises)
                .then(
                    responses => {
                        console.log('geofire ok');
                        process.exit(0);
                    },
                    reason => {
                        console.error('geofire',reason);
                        process.exit(-1);
                    });
            
        },
        reason => {
            console.error('firebase', reason);
            process.exit(-1);
        }
    );

    process.on('unhandledRejection', (reason, promise) => {
        console.log('Unhandled Rejection at:', reason.stack || reason)
        // Recommended: send the information to sentry.io
        // or whatever crash reporting service you use
      })