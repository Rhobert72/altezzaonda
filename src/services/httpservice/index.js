import axios from "axios";

const HttpService = function(helpers, config) {
  
    return {
        
        call: function(options) {
        
          if(!options.url) throw new Error('Missing URL');

          const request = {};

          request.url = options.url;

          if(options.params && options.method === 'GET'){
            request.url += (request.url.indexOf('?') === -1? '?':'&')+helpers.toURLParams(options.params);
          }
        
          request.method = options.method || conf.method;

          request.headers = options.headers || {};
          
          if(options.body){
            request.data = options.body;
          }

          return axios(request).catch( error => {
            console.log('axios catch error', error);
          });  
        }
    };
};

export default HttpService;