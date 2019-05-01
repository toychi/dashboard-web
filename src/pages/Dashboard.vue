<template>
  <div>
    <!-- hightchart -->
    <center>
      <card style="z-index:2">
        <div class="row" id="selectdistrict">
          <div class="col-sm-6">
            <button
              type="button"
              v-bind:id="[isActive ? 'house' : 'condo']"
              @click="toggleClass()"
              class="btn btn-primary btn-lg btn-block"
            >House</button>
          </div>
          <div class="col-sm-6">
            <button
              type="button"
              v-bind:id="[isActive ? 'condo' : 'house']"
              @click="toggleClass()"
              class="btn btn-primary btn-lg btn-block"
            >Condominium</button>
          </div>
        </div>
        <div class="row" id="selectdistrict">
          <div class="col-sm-2" style="display: flex; align-items: center;">
            <span style="font-size:16px;">Districts</span>
          </div>
          <div class="col-sm-10" id="colFormLabelLg">
            <multiselect
              v-model="value234"
              :options="options234"
              :multiple="true"
              :close-on-select="false"
              :clear-on-select="false"
              :preserve-search="true"
              placeholder="Search for districts ..."
              label="name"
              track-by="name"
              :preselect-first="true"
              :max="5"
              @close="fetchData(value234)"
            ></multiselect>
          </div>
        </div>
        <div class="row" id="selectdistrict">
          <span style="font-size:16px; line-height: 200%;" class="col-sm-1">From</span>
          <div class="col-sm-2">
            <b-form-select
              style="border: 2px solid #e8e8e8;"
              v-model="fromyear"
              :options="optionsFromYear"
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
              @click="fetchData(value234)"
            >Submit</b-button>
          </div>
        </div>
      </card>
    </center>
    <div class="row" style="z-index:1;">
      <div class="col-sm-5">
        <high-chart-card :chartOptions="bubble.chartOptions"></high-chart-card>
      </div>
      <div class="col-sm-7">
        <high-chart-card :chartOptions="line.chartOptions"></high-chart-card>
      </div>
      <div class="col-sm-5">
        <high-chart-card :chartOptions="barUnits.chartOptions"></high-chart-card>
      </div>
      <div class="col-sm-7">
        <div class="can-toggle demo-rebrand-1">
          <input id="d" type="checkbox" v-model="toggle" @click="fetchData(value234)">
          <label for="d">
            <div class="can-toggle__switch" data-checked="Sale" data-unchecked="Rent"></div>
          </label>
        </div>
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
import { bts_line } from "../assets/bts";
import { mrt_line } from "../assets/mrt";
import * as topojson from "topojson-client";
import { thaimap } from "../assets/th-all";
import { chaopraya_river } from "..//assets/chaopraya_river";

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
      this.bkkmap.chartOptions.series[0]["data"] = response.data["rent_result"];
    });
    // Retrieve number of units by districts
      Axios.post("http://0.0.0.0:4000/volume", {
        startyear: this.fromyear,
        endyear: this.toyear,
        ptype: "Condo",
        districts: ["All"],
      }).then(response => {
        this.barUnits.chartOptions.series = [
          {
            name: "Selling units",
            data: [response.data["sale_result"]["All"]]
          },
          {
            name: "Rental units",
            data: [response.data["rent_result"]["All"]]
          }
        ];
        this.barUnits.chartOptions.xAxis.categories = ["All"]
      });
  },
  /**
   * Chart data used to render stats, charts. Should be replaced with server data
   */
  data() {
    return {
      toggle: false,
      hh: Highcharts.geojson(
        topojson.feature(bts_line, bts_line.objects.bts_line),
        "mapline"
      ),
      value234: null,
      options234: [
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
      options: [{ value: 1, text: "One" }, { value: 2, text: "Two" }],
      value: null,
      isActive: true,
      fromyear: "2018",
      toyear: "2018",
      optionsFromYear: [
        { text: "2010", value: 2010 },
        { text: "2011", value: 2011 },
        { text: "2012", value: 2012 },
        { text: "2013", value: 2013 },
        { text: "2014", value: 2014 },
        { text: "2015", value: 2015 },
        { text: "2016", value: 2016 },
        { text: "2017", value: 2017 },
        { text: "2018", value: 2018 }
      ],
      barUnits: {
        chartOptions: {
          chart: {
            type: "bar",
            height: 500,
            style: { fontFamily: "Montserrat" }
          },
          title: {
            text: "Number of selling and rental units"
          },
          subtitle: {
            text: "Accumulated units"
          },
          yAxis: {
            title: {
              text: "Units"
            }
          },
          legend: {
            layout: "vertical",
            align: "right",
            verticalAlign: "middle"
          },
          xAxis: {
            categories: this.value234
          },
          series: [
            {
              name: "Selling units",
              data: []
            },
            {
              name: "Rental units",
              data: []
            }
          ],
          responsive: {
            rules: [
              {
                condition: {
                  maxWidth: 200
                },
                chartOptions: {
                  legend: {
                    layout: "horizontal",
                    align: "center",
                    verticalAlign: "bottom"
                  }
                }
              }
            ]
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
          plotOptions: {
            series: {
              label: {
                connectorAllowed: false
              },
              pointStart: 2010
            }
          },
          series: [
            {
              name: "All",
              data: [39, 30, 17, 12, 31, 11, 13, 15]
            },
            {
              name: "Sathon",
              data: [24, 22, 29, 23, 32, 30, 35, 21]
            }
          ],
          responsive: {
            rules: [
              {
                condition: {
                  maxWidth: 200
                },
                chartOptions: {
                  legend: {
                    layout: "horizontal",
                    align: "center",
                    verticalAlign: "bottom"
                  }
                }
              }
            ]
          }
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
              data: [["pn", 100], ["sm", 6]]
            },
            {
              name: "BTS",
              type: "mapline",
              nullColor: "green",
              color: "green",
              mapData: Highcharts.geojson(
                topojson.feature(bts_line, bts_line.objects.bts_line),
                "mapline"
              ),
              lineWidth: 2,
              colorAxis: false
            },
            {
              name: "MRT",
              type: "mapline",
              nullColor: "blue",
              color: "blue",
              mapData: Highcharts.geojson(
                topojson.feature(mrt_line, mrt_line.objects.mrt_line),
                "mapline"
              ),
              lineWidth: 2,
              colorAxis: false
            },
            {
              name: "River",
              type: "mapline",
              nullColor: "black",
              color: "black",
              mapData: chaopraya_river,
              lineWidth: 2,
              colorAxis: false
            }
          ]
        }
      },
      options2: [
        { text: "All", value: "all" },
        { text: "Bang Bon", value: "bb" },
        { text: "Bang Kapi", value: "bkp" },
        { name: "Bang Khae", value: "bkh" },
        { text: "Bang Khen", value: "bk" },
        { text: "Bang Kho Laem", value: "bkl" },
        { text: "Bang Khun Thian", value: "bkt" },
        { text: "Bang Na", value: "bn" },
        { text: "Bang Phlat", value: "bp" },
        { text: "Bang Rak", value: "br" },
        { text: "Bang Sue", value: "bs" },
        { text: "Bangkok Noi", value: "bkn" },
        { text: "Bangkok Yai", value: "bky" },
        { text: "Bueng Kum", value: "bku" },
        { text: "Chom Thong", value: "ct" },
        { text: "Din Daeng", value: "dd" },
        { text: "Don Mueang", value: "dm" },
        { text: "Dusit", value: "ds" },
        { text: "Huai Khwang", value: "hk" },
        { text: "Khan Na Yao", value: "kny" },
        { text: "Khlong Sam Wa", value: "ksw" },
        { text: "Khlong San", value: "ks" },
        { text: "Khlong Toei", value: "kt" },
        { text: "Lak Si", value: "ls" },
        { text: "Lat Krabang", value: "lkb" },
        { text: "Lat Phrao", value: "lp" },
        { text: "Min Buri", value: "mbr" },
        { text: "Nong Chok", value: "nc" },
        { text: "Nong Khaem", value: "nk" },
        { text: "Pathum Wan", value: "ptw" },
        { text: "Phasi Charoen", value: "pscr" },
        { text: "Phaya Thai", value: "pyt" },
        { text: "Phra Khanong", value: "pkn" },
        { text: "Phra Nakhon", value: "pn" },
        { text: "Pom Prap Sattru Phai", value: "ppstp" },
        { text: "Prawet", value: "pw" },
        { text: "Rat Burana", value: "rbrn" },
        { text: "Ratchathewi", value: "rctw" },
        { text: "Sai Mai", value: "sm" },
        { text: "Samphanthawong", value: "sptw" },
        { text: "Saphan Sung", value: "sps" },
        { text: "Sathon", value: "st" },
        { text: "Suan Luang", value: "sl" },
        { text: "Taling Chan", value: "tlc" },
        { text: "Thawi Watthana", value: "twwtn" },
        { text: "Thon Buri", value: "tbr" },
        { text: "Thung Khru", value: "tk" },
        { text: "Wang Thonglang", value: "wtl" },
        { text: "Watthana", value: "wtn" },
        { text: "Yan Nawa", value: "ynw" }
      ],
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
          series: [
            {
              data: []
            }
          ]
        }
      }
    };
  },
  methods: {
    toggleClass: function(event) {
      // Check value
      if (this.isActive) {
        this.isActive = false;
      } else {
        this.isActive = true;
      }
    },
    fetchData: function(value234) {
      // your fetch logic here
      var k = [];
      for (var i = 0; i < value234.length; i++) {
        k.push(this.value234[i].name);
      }
      this.barUnits.chartOptions.xAxis.categories = k;

      // Retrieve number of units by districts
      Axios.post("http://0.0.0.0:4000/volume", {
        startyear: this.fromyear,
        endyear: this.toyear,
        districts: k
      }).then(response => {
        var rental = [];
        var sale = [];
        for (var i = 0; i < value234.length; i++) {
          rental.push(response.data["rent_result"][k[i]]);
          sale.push(response.data["sale_result"][k[i]]);
        }
        this.barUnits.chartOptions.series = [
          {
            name: "Selling units",
            data: sale
          },
          {
            name: "Rental units",
            data: rental
          }
        ];
      });

      var prop_type = this.isActive ? "House" : "Condo";
      var price_type = this.toggle ? "rent_result" : "sale_result";
      Axios.post("http://0.0.0.0:4000/price", {
        startyear: this.fromyear,
        endyear: this.toyear,
        ptype: prop_type
      }).then(response => {
        this.bkkmap.chartOptions.series[0]["data"] =
          response.data[price_type];
      });
    }
  },
  computed: {
    optionsToYear: function() {
      var option = [];
      for (var i = 0; i < this.optionsFromYear.length; i++) {
        if (this.optionsFromYear[i].value > this.fromyear) {
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
#house {
  background-color: lightgray;
  border-style: none;
}
#condo {
  background-color: navy;
  border-style: none;
}
#selectdistrict {
  padding: 10px;
}
</style>
