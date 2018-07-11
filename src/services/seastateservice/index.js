const SeaState = function (config) {
    return {
        getState(height = 0, measure = 'm') {
            return config.states.find( state => {
                return height >= state.height[measure].min && height <= state.height[measure].max
            });
        }
    }

};
export default SeaState;