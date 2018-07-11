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
                        //const databaseRef = database.ref(`${config.collections.marine.name}/${data.slug}`);
                        const databaseRef = database.ref(`${config.collections.marine.name}/${data.slug}`);
                        let newForecastRef;
                        response.data.data.weather.forEach( forecast => {
                            //console.log(forecast);
                            newForecastRef = databaseRef.push();
                            newForecastRef.set(forecast);
                            //database.ref(`${config.collections.marine.name}/${data.slug}`).child().set(forecast);
                        });
                        return response.data.data.weather;
                    }
                }
                else {
                    console.error('Not forecat found for', params);
                    return [];
                }
            });

    };


    this.getMarineForecast = params => {

        return database.ref(`${config.collections.marine.name}/${params.slug}`)
        
        .orderByChild("date")
        .startAt('2018-07-17')
        .once('value')
        .then( snapshot => {
            //console.log(Object.keys(snapshot.val()).length)
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

        return database
            .ref(`${config.collections.marine.name}/${params.slug}`)
            .once('value')
            .then( snapshot => {
                //console.log(Object.keys(snapshot.val()).length)
                if(snapshot.val() && Object.keys(snapshot.val()).length >= config.collections.marine.min_forecasts){
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