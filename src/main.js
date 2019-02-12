import Vue from "vue";
import App from "./App";
import router from "./router/index";
import HighchartsVue from 'highcharts-vue';
import {worldmap} from './assets/worldmap';
import {thaimap} from './assets/th-all';
import mapInit from 'highcharts/modules/map';
import Highcharts from 'highcharts'

import PaperDashboard from "./plugins/paperDashboard";
import "vue-notifyjs/themes/default.css";

Vue.use(PaperDashboard);
Vue.use(HighchartsVue);

mapInit(Highcharts)
Highcharts.maps['myMapName'] = worldmap
Highcharts.maps['myMap'] = thaimap

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
