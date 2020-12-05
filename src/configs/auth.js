import driverHttpAxios from '@websanova/vue-auth/dist/drivers/http/axios.1.x.esm.js';
import driverRouterVueRouter from '@websanova/vue-auth/dist/drivers/router/vue-router.2.x.esm.js';

const authConfig = {
   drivers: {
      auth: {
         request: function(req, token) {
            this.drivers.http.setHeaders.call(this, req, {
               Authorization: 'Bearer ' + token,
            });
         },
         response: function(res) {
            if (res.data && res.data.token) {
               return res.data.token;
            }
            return null;
         },
      },
      http: driverHttpAxios,
      router: driverRouterVueRouter,
   },
   options: {
      rolesKey: 'privilege_id',
      notFoundRedirect: { name: '/' },
      loginData: { url: `sessions`, method: 'POST', fetchUser: true },
      fetchData: { url: `sessions`, method: 'GET', enabled: true },
      refreshData: { atInit: false, enabled: false },
      logoutData: { redirect: '/login', makeRequest: false },
      tokenDefaultName: 'token',
      parseUserData: function(response) {
         return response.data;
      },
   },
};

export default authConfig;
