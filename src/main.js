import Vue from 'vue';
import Vuelidate from 'vuelidate';
import messagePlugin from '@/plugins/message.plugin';
import firebase from 'firebase/app';
import dateFilter from '@/filters/data.filter';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import 'materialize-css/dist/js/materialize.min';

import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/database';

Vue.config.productionTip = false;
// Vue.use(M);
Vue.use(messagePlugin);
Vue.use(Vuelidate);
Vue.filter('date', dateFilter);

const firebaseConfig = {
  apiKey: 'AIzaSyAEzU9TQlmX_aDwAPdNGQBUhNQSPd6abzo',
  authDomain: 'vue-crm-6c041.firebaseapp.com',
  projectId: 'vue-crm-6c041',
  storageBucket: 'vue-crm-6c041.appspot.com',
  messagingSenderId: '694476642310',
  appId: '1:694476642310:web:3d1b845884391ebddf4b87',
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
