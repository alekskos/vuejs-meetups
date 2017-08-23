import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import * as firebase from 'firebase'
import router from './router'
import { store } from './store'
import DateFilter from './filters/date'
import AlertCmp from './components/Shared/Alert'

Vue.use(Vuetify)
Vue.config.productionTip = false

Vue.filter('date', DateFilter)
Vue.component('app-alert', AlertCmp)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyAw8jpcEBgjxKVKcLrqdocGcO2_wYTH6Rw',
      authDomain: 'vuejs-451f7.firebaseapp.com',
      databaseURL: 'https://vuejs-451f7.firebaseio.com',
      projectId: 'vuejs-451f7',
      storageBucket: 'vuejs-451f7.appspot.com'
    })
    this.$store.dispatch('loadMeetups')
  }
})
