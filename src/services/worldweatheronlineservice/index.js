const WorldweatheronlineService = function(httpService, config) {

    this.baseURL = `${config.protocol}://${config.host}${config.base_path}`;

    this.getMarineForecast = params => {
        
        if(config.mocked){
            console.warn('getMarineForecast is mocked');
            return new Promise( (resolve, reject) => {
                return resolve(config.mocks.marine)
            });
        }
        else {
            const apiParams = {
                params: {
                 q: `${params.lat},${params.lon}`
                }        
             };
             return this.call(Object.assign(apiParams, config.api.marine));
        }
        
    };

    this.call = params => {
        const apiParams = {
            url: `${this.baseURL}${params.path}`,
            method: params.method,
            params: Object.assign(config.default_params, params.params)
        };
        return httpService.call(apiParams);
    };
};

export default WorldweatheronlineService;