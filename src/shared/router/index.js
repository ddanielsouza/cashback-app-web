import Vue from 'vue';
import VueRouter from 'vue-router';
import routesAdminOffers from '../../modules/admin/offers/routes';
import routesCustomerOffers from '../../modules/customer/offers/routes';
import Login from '../views/Login';
import NotFound from '../views/NotFound';

Vue.use(VueRouter);

const routes = [
   {
      path: '/login',
      name: 'Login',
      component: Login,
   },
   {
      path: '/404',
      name: 'NotFound',
      component: NotFound,
   },
   ...routesAdminOffers,
   ...routesCustomerOffers,
   { path: '*', redirect: '/404' },
];

const router = new VueRouter({
   mode: 'history',
   base: process.env.BASE_URL,
   routes,
});

export default router;
