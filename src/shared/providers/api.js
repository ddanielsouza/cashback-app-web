import axios from 'axios';

import ViewUI from 'view-design';

const api = axios.create({
   baseURL: 'http://localhost:3333',
});

api.interceptors.request.use(
   function(config) {
      ViewUI.LoadingBar.start();
      return config;
   },
   function(error) {
      ViewUI.LoadingBar.error();
      return Promise.reject(error);
   },
);

api.interceptors.response.use(
   function(resp) {
      ViewUI.LoadingBar.finish();
      return resp;
   },
   function(error) {
      if (axios.isCancel(error)) {
         console.log('Request canceled', error.message);
      } else {
         ViewUI.LoadingBar.error();
         return Promise.reject(error);
      }
   },
);

export default api;
