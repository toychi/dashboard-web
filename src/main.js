import Vue from "vue";
import App from "./App";
import router from "./router/index";
import HighchartsVue from "highcharts-vue";
import { worldmap } from "./assets/worldmap";
import { thaimap } from "./assets/th-all";
import mapInit from "highcharts/modules/map";
import Highcharts from "highcharts";
import 'bootstrap/dist/css/bootstrap.min.css';
import * as uiv from 'uiv';
import store from '@/store'

Vue.use(uiv);

import 'vue-multiselect/dist/vue-multiselect.min.css';

import PaperDashboard from "./plugins/paperDashboard";
import "vue-notifyjs/themes/default.css";
import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import proj4 from 'proj4';
window.proj4 = proj4;

Vue.use(BootstrapVue);

Vue.use(PaperDashboard);
Vue.use(HighchartsVue);

mapInit(Highcharts);
Highcharts.maps["myMapName"] = worldmap;
Highcharts.maps["myMap"] = thaimap;
Highcharts.maps["my"] = {
  title: "Bangkok",
  type: "FeatureCollection",
  features: [thaimap.features[45]]
};

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
