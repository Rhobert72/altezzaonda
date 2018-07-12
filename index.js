import HttpService from './src/services/httpservice';
import WorldweatheronlineService from './src/services/worldweatheronlineservice';
import AltezzaondaService from './src/services/altezzaondaservice';
import FirebaseService from './src/services/firebaseservice';
import WindStateService from './src/services/windstateservice';

import Helpers from './src/helpers';

const httpServiceConfig = require('./src/services/httpservice/config.json');
const worldweatheronlineServiceConfig = require('./src/services/worldweatheronlineservice/config.json');
const altezzaondaServiceConfig = require('./src/services/altezzaondaservice/config.json');
const firebaseConfig = require('./src/services/firebaseservice/config.json');
const windStateServiceConfig = require('./src/services/windstateservice/config.json');

const helpers = new Helpers();

const httpService = new HttpService(helpers, httpServiceConfig);
const firebaseService = new FirebaseService(firebaseConfig);
const forecastService = new WorldweatheronlineService(httpService, worldweatheronlineServiceConfig);

window.altezzaondaService = new AltezzaondaService(firebaseService.database(), forecastService, altezzaondaServiceConfig);
window.windStateService = new WindStateService(windStateServiceConfig);
