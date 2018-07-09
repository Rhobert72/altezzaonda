import HttpService from './src/services/httpservice';
import WorldweatheronlineService from './src/services/worldweatheronlineservice';
import Helpers from './src/helpers';

const httpServiceConfig = require('./src/services/httpservice/config.json');
const worldweatheronlineServiceConfig = require('./src/services/worldweatheronlineservice/config.json');

const helpers = new Helpers();
const httpService = new HttpService(helpers, httpServiceConfig);
window.worldweatheronlineService = new WorldweatheronlineService(httpService, worldweatheronlineServiceConfig);