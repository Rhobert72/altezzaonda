import firebase from 'firebase';

const FirebaseService = function(config) {
    return firebase.initializeApp(config);
};

export default FirebaseService;