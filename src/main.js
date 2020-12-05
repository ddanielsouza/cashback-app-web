import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './shared/router';
import store from './shared/store';
import auth from '@websanova/vue-auth/dist/v2/vue-auth.esm.js';
import api from './shared/providers/api';
import authConfig from './configs/auth';
import ViewUI from 'view-design';
import locale from 'view-design/dist/locale/pt-BR';

import 'view-design/dist/styles/iview.css';
import './assets/css/global.css';

Vue.config.productionTip = false;

Vue.use(ViewUI, { locale });

Vue.use(auth, {
   plugins: {
      http: api,
      router: router,
   },
   ...authConfig,
});

router.beforeEach((_to, _from, next) => {
   ViewUI.LoadingBar.start();
   next();
});

router.afterEach(() => {
   ViewUI.LoadingBar.finish();
});

new Vue({
   router,
   store,
   render: h => h(App),
}).$mount('#app');
