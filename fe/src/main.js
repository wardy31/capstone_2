import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import '@babel/polyfill'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'animate.css';

import { io } from "socket.io-client";
const socket = io('ws://192.168.1.136:3000/');

socket.on("connect", () => { 
  console.log('isConnected', socket.connected); // x8WIv7-mJelg7on_ALbx
});

// Specific connection base han emit ha server
socket.on("user-notify", (arg) => {
  console.log('message', arg);
});

socket.on("clinic-notify", (arg) => {
  console.log('message', arg);
});


Vue.config.productionTip = false


new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
