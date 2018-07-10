const AltezzaondaService = function(database, forecastService, config) {

    this.loadMarineForecast = data => {

        return forecastService
            .getMarineForecast({
                lat: data.lat,
                lon: data.lon
            })
            .then( response => {
                console.log(response);
                if(response.status === 200) {
                    if(response.data.data.weather) {
                        response.data.data.weather.forEach( forecast => {
                            database.ref(`marine/${data.slug}`).child(forecast.date).set(forecast);
                        });
                        return response.data.data.weather;
                    }
                }
                else {
                    console.error('Not forecat found for', params);
                    return [];
                }
            });




        this.getMarineForecast({
            lat: data.lat,
            lon: data.lon
        })
        .then( forecasts => {
            //console.log('forecast', forecast);

            forecasts.forEach( forecast => {
                database.ref(`marine/${data.slug}`).child(forecast.date).set(forecast);
            });

            
        });
    };


    this.getMarineForecast = params => {

        return database
            .ref(`marine/${params.slug}`)
            .once('value')
            .then( snapshot => {
                
                if(snapshot.val()){
                    return snapshot.val();
                }
                else {
                    return this.loadMarineForecast(params)
                    .then( response => {
                        if(response) {
                            return this.getMarineForecast(params);
                        }
                        else {
                            return;
                        }
                    });
                }
                
            });
    };
};

export default AltezzaondaService;