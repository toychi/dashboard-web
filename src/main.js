import Vue from "vue";
import App from "./App";
import router from "./router/index";
import HighchartsVue from "highcharts-vue";
import { worldmap } from "./assets/worldmap";
import { thaimap } from "./assets/th-all";
import mapInit from "highcharts/modules/map";
import Highcharts from "highcharts";

import PaperDashboard from "./plugins/paperDashboard";
import "vue-notifyjs/themes/default.css";
import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

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
  render: h => h(App)
}).$mount("#app");
