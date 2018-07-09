const Helpers = function(){

return {
    getURLParams: function () {

        if (!location.search) return;
        const queryString = location.search.substring(1); // Levo il ?

        const qs = new URLSearchParams(queryString);
        const params = {};

        for (var key of qs.keys()) {
            const p = this.readParams('|', ':', qs.get(key));
            params[key] = typeof p === 'object' ? p : qs.get(key);
        }

        return params;
    },

    readParams: function (paramsSep, keyValueSep, paramsStr) {
        try {
            const params = paramsStr.split(paramsSep).reduce(function (accum, param) {
                const key_value = param.split(keyValueSep);
                if (!key_value[1]) throw new Error();
                accum[key_value[0]] = key_value[1];
                return accum;
            }, {});
            return params;
        } catch (error) {
            return paramsStr;
        }
    },

    toURLParams: json => {
        const params = new URLSearchParams(json);
        return params.toString();
    }
}

};

export default Helpers;