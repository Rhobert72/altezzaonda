const WorldweatheronlineService = function(httpService, config) {

    this.baseURL = `${config.protocol}://${config.host}${config.base_path}`;

    this.getMarineForecast = params => {
       const apiParams = {
           params: {
            q: `${params.lat},${params.lon}`
           }        
        };
        return this.call(Object.assign(apiParams, config.api.marine));
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