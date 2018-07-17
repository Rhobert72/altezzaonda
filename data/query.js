const firebase = require('firebase');
const geofire = require('geofire');
const functions = require('./functions');

firebase.initializeApp({
    "apiKey": "AIzaSyDvtvvjNo0uff-u9krHwYDHva_zki-wSZY",
    "authDomain": "altezzaonda.firebaseapp.com",
    "databaseURL": "https://altezzaonda.firebaseio.com",
    "projectId": "altezzaonda",
    "storageBucket": "altezzaonda.appspot.com",
    "messagingSenderId": "302223763442"
  });

const databaseRef = firebase.database();

/*databaseRef
    .ref('locations/-LHaRe8ePuUyL4UHgrNz')
    .once('value')
    .then( snapshot => {
        if(snapshot.val()){
            console.log(snapshot.val());
        }else{
            console.warn('No results');
        }
        process.exit(0);
    })
    .catch( reason => {
        console.error(reason);
        process.exit(-1);
    });

    databaseRef
    .ref('locations')
    .orderByChild('slug')
    .equalTo('bergeggi')
    .once('value')
    .then( snapshot => {
        console.log('query!', snapshot.val());
        if(snapshot.val()){
            console.log(snapshot.val());
        }
        process.exit(0);
    })
    .catch( reason => {
        console.error(reason);
        process.exit(-1);
    });
    
   databaseRef
    .ref('locations')
    .orderByChild('region/slug')
    .equalTo('toscana')
    .once('value')
    .then( snapshot => {
        if(snapshot.val()){
            console.log(snapshot.val());
        }
        else{
            console.warn('Results not found');
        }
        process.exit(0);
    })
    .catch( reason => {
        console.error(reason);
        process.exit(-1);
    });
    */

   databaseRef
   .ref('locations')
   .orderByChild('province/slug')
   .equalTo('genova')
   //.limitToFirst(100)
   .once('value')
   .then( snapshot => {
       if(snapshot.val()){
           const locations = functions.sortLocationsByName(Object.values(snapshot.val()));
           console.log(locations.length);
           //snapshot.forEach( data => console.log(data.key, data.val()));
       }
       else{
           console.warn('Results not found');
       }
       process.exit(0);
   })
   .catch( reason => {
       console.error(reason);
       process.exit(-1);
   });

