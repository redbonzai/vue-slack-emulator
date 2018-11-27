// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase/app'
import store from './store'
import auth from 'firebase/auth'

Vue.config.productionTip = false;

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


// Initialize Firebase
var config = {
  apiKey: "AIzaSyAkVhF2MlU3LspQep2P6B7NPUhZRU-CmcQ",
  authDomain: "vuex-slack-emulator.firebaseapp.com",
  databaseURL: "https://vuex-slack-emulator.firebaseio.com",
  projectId: "vuex-slack-emulator",
  storageBucket: "vuex-slack-emulator.appspot.com",
  messagingSenderId: "523626561682"
};

firebase.initializeApp(config);

//make firebase available in the dom, so that we don't have to keep importing it.
window.firebase = firebase;

const unsubscribe = firebase.auth().onAuthStateChanged( user => {
  store.dispatch('setUser', user);

  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
  });

  // recursion - this function calls itself on auth state change
  unsubscribe()

});


