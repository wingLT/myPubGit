// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import 'swiper/dist/css/swiper.css';

import $ from 'jquery'
import eChart from  'echarts'

// import BMap from 'BMap';
import './css/comm.css'
// import './components/AOC_Heat_Map/css/style.css'


/*
css
*/
import '../static/css/initialize.css'
import '../static/css/liMarquee.css'

Vue.config.productionTip = false
Vue.use(ElementUI);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
