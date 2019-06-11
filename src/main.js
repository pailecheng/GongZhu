import Vue from 'vue'
import VueSocketio from 'vue-socket.io'
import socketio from 'socket.io-client'

import App from './App'
import store from './store'

Vue.use(VueSocketio, socketio(`http://localhost:3000/`), store)

const app = new Vue({
  store,
  ...App
}).$mount('#app')

export { app }
