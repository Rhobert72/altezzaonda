const WindStateService = function (config) {
    return {
        getState(speed = 0, measure = 'km/h') {
            return config.states.find( state => {
                return speed >= state.speed[measure].min && speed <= state.speed[measure].max;
            });
        }
    };
};
export default WindStateService;