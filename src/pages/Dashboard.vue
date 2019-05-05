<template>
  <div>
    <!-- hightchart -->
    <center>
      <card style="z-index:2">
        <div class="row">
          <div class="col-sm-6">
            <button
              type="button"
              v-bind:id="[isActive ? 'not' : 'selected']"
              @click="isActive = !isActive"
              class="btn btn-primary btn-lg btn-block"
            >House</button>
          </div>
          <div class="col-sm-6">
            <button
              type="button"
              v-bind:id="[isActive ? 'selected' : 'not']"
              @click="isActive = !isActive"
              class="btn btn-primary btn-lg btn-block"
            >Condominium</button>
          </div>
        </div>
        <div class="row" id="selectdistrict">
          <div class="col-sm-2" style="display: flex; align-items: center;">
            <span style="font-size:18px;">Districts</span>
          </div>
          <div class="col-sm-10" id="colFormLabelLg">
            <multiselect
              v-model="selectedDistrict"
              :options="optionsDistrict"
              :multiple="true"
              :close-on-select="false"
              :clear-on-select="false"
              :preserve-search="true"
              placeholder="Search for districts ..."
              label="name"
              track-by="name"
              :preselect-first="true"
              :max="5"
            ></multiselect>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-5">
            <b-form-select
              style="border: 2px solid #e8e8e8;"
              v-model="fromyear"
              :options="optionsYear"
            />
          </div>
          <span style="font-size:16px; line-height: 200%;" class="col-sm-1">to</span>
          <div class="col-sm-2">
            <b-form-select style="border: 2px solid #e8e8e8;" v-model="toyear">
              <option
                v-for="option in optionsToYear"
                v-bind:value="option.value"
                v-bind:key="option.value"
              >{{ option.text }}</option>
            </b-form-select>
          </div>
          <span style="font-size:16px; line-height: 200%;" class="col-sm-1">Range</span>
          <div class="col-sm-3">
            <b-form-select style="border: 2px solid #e8e8e8;" v-model="toyear">
              <option
                v-for="option in optionsToYear"
                v-bind:value="option.value"
                v-bind:key="option.value"
              >{{ option.text }}</option>
            </b-form-select>
          </div>
          <div class="col-sm-2">
            <b-button
              block
              variant="outline-success"
              style="text-transform: uppercase;"
              @click="fetchData()"
            >Submit</b-button>
          </div>
          <button
            type="button"
            class="btn btn-outline-info"
            style="text-transform: uppercase;"
          >submit</button>
        </div>
        <h5></h5>
      </card>
    </center>
    <div class="row" style="z-index:1;">
      <div class="col-sm-5">
        <high-chart-card :chartOptions="bubble.chartOptions"></high-chart-card>
      </div>
      <div class="col-sm-7">
        <high-chart-card :chartOptions="line.chartOptions"></high-chart-card>
      </div>
    </div>
    <b-row>
      <b-col sm="12">
        <div class="can-toggle demo-rebrand-1">
          <input id="d" type="checkbox" v-model="toggle" @click="fetchLower()">
          <label for="d">
            <div class="can-toggle__switch" data-checked="Sale" data-unchecked="Rent"></div>
          </label>
        </div>
      </b-col>
    </b-row>
    <div class="row">
      <div class="col-sm-5">
        <high-chart-card :chartOptions="barUnits.chartOptions"></high-chart-card>
      </div>
      <div class="col-sm-7">
        <card>
          <highcharts class="map" :constructor-type="'mapChart'" :options="bkkmap.chartOptions"></highcharts>
        </card>
      </div>
    </div>
  </div>
</template>

<script>
import { StatsCard, ChartCard, HighChartCard } from "@/components/index";
import Card from "@/components/Cards/Card.vue";
import Chartist from "chartist";
import More from "highcharts/highcharts-more";
import Highcharts from "highcharts";
import Multiselect from "vue-multiselect";
import Axios from "axios";
import { bts } from "../assets/mrt_line";
import * as topojson from "topojson-client";
import { thaimap } from "../assets/th-all";
import { chaopraya_river } from "..//assets/chaopraya_river";
import loadDrillDown from 'highcharts/modules/drilldown';
loadDrillDown(Highcharts)

More(Highcharts);

export default {
  components: {
    StatsCard,
    ChartCard,
    HighChartCard,
    Multiselect
  },
  mounted() {
    Axios.post("http://0.0.0.0:4000/price", {
      startyear: this.fromyear,
      endyear: this.toyear,
      ptype: "Condo"
    }).then(response => {
      this.price = response.data;
    });
    Axios.post("http://0.0.0.0:4000/volume", {
      startyear: this.fromyear,
      endyear: this.toyear,
      ptype: "Condo",
      districts: ["All"]
    }).then(response => {
      this.volume = response.data;
    });
    Axios.post("http://0.0.0.0:4000/ratio", {
      startyear: this.fromyear,
      endyear: this.toyear,
      ptype: "Condo",
      districts: ["All"]
    }).then(response => {
      this.clusterlabel = response.data;
      this.bkkmap.chartOptions.series[0]["data"] = response.data["2017"];
    });
    this.bubble.chartOptions.series[0]["data"] = this.options234;
  },
  /**
   * Chart data used to render stats, charts. Should be replaced with server data
   */
  data() {
    return {
      price: [],
      volume: [],
      toggle: false,
      isActive: true,
      selectedDistrict: null,
      optionsDistrict: [
        { name: "All", value: 0 },
        { name: "Bang Bon", value: 50 },
        { name: "Bang Kapi", value: 6 },
        { name: "Bang Khae", value: 40 },
        { name: "Bang Khen", value: 5 },
        { name: "Bang Kho Laem", value: 31 },
        { name: "Bang Khun Thian", value: 21 },
        { name: "Bang Na", value: 47 },
        { name: "Bang Phlat", value: 25 },
        { name: "Bang Rak", value: 4 },
        { name: "Bang Sue", value: 29 },
        { name: "Bangkok Noi", value: 20 },
        { name: "Bangkok Yai", value: 16 },
        { name: "Bueng Kum", value: 27 },
        { name: "Chom Thong", value: 35 },
        { name: "Din Daeng", value: 26 },
        { name: "Don Mueang", value: 36 },
        { name: "Dusit", value: 2 },
        { name: "Huai Khwang", value: 17 },
        { name: "Khan Na Yao", value: 43 },
        { name: "Khlong Sam Wa", value: 46 },
        { name: "Khlong San", value: 18 },
        { name: "Khlong Toei", value: 33 },
        { name: "Lak Si", value: 41 },
        { name: "Lat Krabang", value: 11 },
        { name: "Lat Phrao", value: 38 },
        { name: "Min Buri", value: 10 },
        { name: "Nong Chok", value: 3 },
        { name: "Nong Khaem", value: 23 },
        { name: "Pathum Wan", value: 7 },
        { name: "Phasi Charoen", value: 22 },
        { name: "Phaya Thai", value: 14 },
        { name: "Phra Khanong", value: 9 },
        { name: "Phra Nakhon", value: 1 },
        { name: "Pom Prap Sattru Phai", value: 8 },
        { name: "Prawet", value: 32 },
        { name: "Rat Burana", value: 24 },
        { name: "Ratchathewi", value: 37 },
        { name: "Sai Mai", value: 42 },
        { name: "Samphanthawong", value: 13 },
        { name: "Saphan Sung", value: 44 },
        { name: "Sathon", value: 28 },
        { name: "Suan Luang", value: 34 },
        { name: "Taling Chan", value: 19 },
        { name: "Thawi Watthana", value: 48 },
        { name: "Thon Buri", value: 15 },
        { name: "Thung Khru", value: 49 },
        { name: "Wang Thonglang", value: 45 },
        { name: "Watthana", value: 39 },
        { name: "Yan Nawa", value: 12 }
      ],
      fromyear: 2017,
      toyear: 2019,
      optionsFromYear: [
        { text: "2012", value: 2012 },
        { text: "2013", value: 2013 },
        { text: "2014", value: 2014 },
        { text: "2015", value: 2015 },
        { text: "2016", value: 2016 },
        { text: "2017", value: 2017 },
        { text: "2018", value: 2018 },
        { text: "2019", value: 2019 },
      ],

      barUnits: {
        chartOptions: {
          chart: {
            type: "column",
            height: 500,
            style: { fontFamily: "Montserrat" }
          },
          title: {
            text: "Number of listing units"
          },
          yAxis: {
            title: {
              text: "Units"
            }
          },
          xAxis: {
            type: 'category'
          },
          series: [
            {
              name: "Districts",
              colorByPoint: true,
              data: [
                {
                  name: "All",
                  y: 10.57,
                  drilldown: "All"
                }
              ]
            }
          ],
          drilldown: {
            series: []
          }
        }
      },

      line: {
        chartOptions: {
          chart: {
            height: 450,
            style: { fontFamily: "Montserrat" }
          },
          title: {
            text: "Price to Rent Ratio"
          },
          xAxis: {
            tickInterval: 1
          },
          yAxis: {
            title: {
              text: "Value"
            }
          },
          legend: {
            layout: "vertical",
            align: "right",
            verticalAlign: "middle"
          },
          series: []
        }
      },

      bkkmap: {
        chartOptions: {
          chart: {
            map: "myMap",
            height: 500,
            style: {
              fontFamily: "Montserrat"
            }
          },
          title: {
            text: "Average price by districts"
          },
          styledMode: true,
          mapNavigation: {
            enabled: true,
            buttonOptions: {
              alignTo: "spacingBox"
            }
          },
          colorAxis: {},
          threshold: -1,
          series: [
            {
              name: "Average price by districts",
              type: "map",
              states: {
                hover: {
                  color: "#39B7CD"
                }
              },
              dataLabels: {
                enabled: true,
                format: "{point.name}"
              },
              allAreas: true,
              joinBy: "name",
              data: [["pn",1]]
            },
            {
              name: "BTS",
              type: "mapline",
              nullColor: "green",
              mapData: Highcharts.geojson(
                topojson.feature(bts, bts.objects.bts_line),
                "mapline"
              ),
              lineWidth: 2,
              colorAxis: false
            }
          ]
        }
      },
      bubble: {
        chartOptions: {
          chart: {
            height: 450,
            type: "packedbubble"
          },
          plotOptions: {
            packedbubble: {
              dataLabels: {
                enabled: true,
                format: "{point.name}",
                style: {
                  color: "black",
                  textOutline: "none",
                  fontWeight: "normal"
                }
              },
              minPointSize: 5,
              Draggable: true,
              useSimulation: true
            }
          },
          series: [{
            data: []
          }]
        }
      }
    };
  },
  methods: {
    fetchData: function() {
      // your fetch logic here
      var k = [];
      for (var i = 0; i < this.selectedDistrict.length; i++) {
        k.push(this.selectedDistrict[i].name);
      }
      var prop_type = this.isActive ? "House" : "Condo";
      Axios.post("http://0.0.0.0:4000/price", {
        startyear: this.fromyear,
        endyear: this.toyear,
        ptype: prop_type
      }).then(response => {
        this.price = response.data
      });
      Axios.post("http://0.0.0.0:4000/volume", {
        startyear: this.fromyear,
        endyear: this.toyear,
        ptype: prop_type,
        districts: k
      }).then(response => {
        this.volume = response.data
      });
      Axios.post("http://0.0.0.0:4000/ratio", {
        startyear: this.fromyear,
        endyear: this.toyear,
        ptype: prop_type,
        districts: k
      }).then(response => {
        this.line.chartOptions.series = response.data;
      });
    },
    fetchLower: function() {
      var price_type = this.toggle ? "rent_result" : "sale_result";
      this.bkkmap.chartOptions.series[0]["data"] = this.price[price_type];
      this.barUnits.chartOptions.drilldown.series = this.volume[price_type]
      this.barUnits.chartOptions.series[0].data = this.volume[price_type.concat('_sum')]
    }
  },

  computed: {
    optionsToYear: function() {
      var option = [];
      for (var i = 0; i < this.optionsFromYear.length; i++) {
        if (this.optionsFromYear[i].value >= this.fromyear) {
          option.push(this.optionsFromYear[i]);
        }
      }
      return option;
    }
  }
};
</script>
<style>
/* .outer {
  width: 600px;
  height: 200px;
  margin: 0 auto;
}
.outer .chart-container {
  width: 300px;
  float: left;
  height: 200px;
}
.highcharts-yaxis-grid .highcharts-grid-line {
  display: none;
} */
#not {
  background-color: lightgray;
  border-style: none;
}
#selected {
  background-color: navy;
  border-style: none;
}
#selectdistrict {
  padding: 10px;
}
</style>
