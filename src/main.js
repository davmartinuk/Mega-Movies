// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import jquery from 'jquery';
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App'


import { library } from '@fortawesome/fontawesome-svg-core'
// Import font awesomes
import { faCoffee, faCheck, faFilm } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faCoffee, faCheck, faFilm)


Vue.component('font-awesome-icon', FontAwesomeIcon)


Vue.use(VueAxios, axios)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
});





