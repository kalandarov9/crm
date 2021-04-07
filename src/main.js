import Vue from 'vue';
import Vuelidate from 'vuelidate';
import messagePlugin from '@/plugins/message.plugin';
import firebase from 'firebase/app';
import dateFilter from '@/filters/data.filter';
import currencyFilter from '@/filters/currency.filter';
import Loader from '@/components/app/Loader.vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import 'materialize-css/dist/js/materialize.min';

import 'firebase/auth';
// import 'firebase/firestore';
import 'firebase/database';

Vue.config.productionTip = false;
// Vue.use(M);
Vue.use(messagePlugin);
Vue.use(Vuelidate);
Vue.filter('date', dateFilter);
Vue.filter('currency', currencyFilter);
Vue.component('Loader', Loader);

const firebaseConfig = {
  apiKey: 'AIzaSyDLCdlctUPEkCvxZcPhdoRSuKKiNKLyMTQ',
  authDomain: 'testing-277608.firebaseapp.com',
  databaseURL: 'https://testing-277608-default-rtdb.firebaseio.com',
  projectId: 'testing-277608',
  storageBucket: 'testing-277608.appspot.com',
  messagingSenderId: '455597853441',
  appId: '1:455597853441:web:8ddf442555a1dd4260a900',
};

firebase.initializeApp(firebaseConfig);

let app;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount('#app');
  }
});
