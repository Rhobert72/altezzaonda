const AltezzaondaService = function(database, forecastService, config) {

    this.setMarineForecast = data => {
        database.ref(`marine/${data.slug}`).set({
            forecast: [{
                pippo: 'pluto'
            },
            {
                pippo: 'paperino'
            }]
        }).then( response => {
            console.log(response);
        });
    };

    this.getMarineForecast = params => {
        return forecastService
        .getMarineForecast({
            lat: 42.925634,
            lon: 10.525889
        })
        .then(response => {
            console.log(response);
        });
    };

};

export default AltezzaondaService;