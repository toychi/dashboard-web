<template>
  <div>
    <!-- hightchart -->
    <center>
      <div class="row">
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
            @click="isActive = !isActive"
            class="btn btn-primary btn-lg btn-block"
          >Condominium</button>
        </div>
      </div>
      <select class="selectpicker">
        <option>Mustard</option>
        <option>Ketchup</option>
        <option>Barbecue</option>
      </select>
      <AdvancedSelect v-model="value" :options="options" :disabled="disabled"/>
    </center>
    <div class="row">
      <div class="col-sm-5">
        <high-chart-card :chartOptions="solidGauge"></high-chart-card>
        <!-- <high-chart-card :chartOptions="ranking.chartOptions"></high-chart-card> -->
      </div>
      <div class="col-sm-7">
        <div>
          <b-form-select v-model="district" :options="options2"/>
        </div>
        <h5></h5>
        <div>
          <b-form-select v-model="district2" :options="options4"/>
        </div>
        <h5></h5>
        <high-chart-card :chartOptions="bar.chartOptions"></high-chart-card>
      </div>

      <div class="col-sm-12">
        <!-- <high-chart-card :chartOptions="pie.chartOptions"></high-chart-card>
        <high-chart-card :chartOptions="bar.chartOptions"></high-chart-card>-->
        <div>
          <b-form-select v-model="year" :options="options3"/>
        </div>
        <h5></h5>
        <card>
          <highcharts class="map" :constructor-type="'mapChart'" :options="bkkmap.chartOptions"></highcharts>
        </card>
      </div>
      <div class="col-sm-9">
        <high-chart-card :chartOptions="line.chartOptions"></high-chart-card>
      </div>

      <div class="col-sm-3 col-12">
        <h1></h1>
        <div>
          <b-form-select v-model="district" :options="options2"/>
        </div>
        <h5></h5>
        <div>
          <b-form-select v-model="district2" :options="options4"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="https://code.highcharts.com/modules/solid-gauge.js"></script>
<script src="https://code.highcharts.com/modules/solid-gauge.src.js"></script>

<script>
import {
  StatsCard,
  ChartCard,
  HighChartCard,
  Multiselect
} from "@/components/index";
import Card from "@/components/Cards/Card.vue";
import Chartist from "chartist";
import More from "highcharts/highcharts-more";
import Highcharts from "highcharts";
import AdvancedSelect from "@myena/advanced-select";

More(Highcharts);
import loadSolidGauge from "highcharts/modules/solid-gauge.js";
loadSolidGauge(Highcharts);

export default {
  components: {
    StatsCard,
    ChartCard,
    HighChartCard,
    Multiselect,
    AdvancedSelect,
    mounted() {
      this.init();
    }
  },
  /**
   * Chart data used to render stats, charts. Should be replaced with server data
   */
  data() {
    return {
      options: [{ value: 1, text: "One" }, { value: 2, text: "Two" }],
      value: null,
      secondValue: "1",
      disabled: false,
      isActive: true,
      type: "house",
      options1: [
        { text: "House", value: "house" },
        { text: "Condominium", value: "condo" }
      ],

      district: "all",
      options2: [
        { text: "All", value: "all" },
        { text: "Bang Bon", value: "bb" },
        { text: "Bang Kapi", value: "bkp" },
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
      district2: "st",
      options4: [
        { text: "All", value: "all" },
        { text: "Bang Bon", value: "bb" },
        { text: "Bang Kapi", value: "bkp" },
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

      year: "2018",
      options3: [
        { text: "2010", value: "2010" },
        { text: "2011", value: "2011" },
        { text: "2012", value: "2012" },
        { text: "2013", value: "2013" },
        { text: "2014", value: "2014" },
        { text: "2015", value: "2015" },
        { text: "2016", value: "2016" },
        { text: "2017", value: "2017" },
        { text: "2018", value: "2018" }
      ],

      bar: {
        chartOptions: {
          chart: {
            type: "column",
            height: 300,
            style: { fontFamily: "Montserrat" }
          },
          title: {
            text: "Average Selling price and Rental price"
          },

          subtitle: {
            text: ""
          },

          yAxis: {
            title: {
              text: "Price"
            }
          },
          legend: {
            layout: "vertical",
            align: "right",
            verticalAlign: "middle"
          },

          // plotOptions: {
          //   series: {
          //     label: {
          //       connectorAllowed: false
          //     },
          //     pointStart: 2010
          //   }
          // },

          xAxis: {
            categories: ["All", "Sathon"]
          },

          series: [
            {
              name: "Selling price",
              data: [439340, 525030]
            },
            {
              name: "Rental price",
              data: [249160, 240640]
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
            height: 350,
            style: { fontFamily: "Montserrat" }
          },
          title: {
            text: "Price to Rent Ratio"
          },

          subtitle: {
            text: ""
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

      solidGauge: {
        chart: {
          type: "gauge",
          plotBackgroundColor: null,
          plotBackgroundImage: null,
          plotBorderWidth: 0,
          plotShadow: false,
          style: {
            fontFamily: "Montserrat",
            fontSize: 15
          },
          height: 410
        },
        title: {
          text: "Overall Price-to-rent ratio"
        },
        tooltip: {
          enabled: false
        },
        pane: {
          startAngle: -150,
          endAngle: 150,
          background: [
            {
              backgroundColor: {
                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                stops: [[0, "#FFF"], [1, "#333"]]
              },
              borderWidth: 0,
              outerRadius: "109%"
            },
            {
              backgroundColor: {
                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                stops: [[0, "#333"], [1, "#FFF"]]
              },
              borderWidth: 1,
              outerRadius: "107%"
            },
            {
              // default background
            },
            {
              backgroundColor: "#DDD",
              borderWidth: 0,
              outerRadius: "105%",
              innerRadius: "103%"
            }
          ]
        },

        // the value axis
        yAxis: {
          min: 0,
          max: 20,

          minorTickInterval: "auto",
          minorTickWidth: 1,
          minorTickLength: 10,
          minorTickPosition: "inside",
          minorTickColor: "#666",

          tickPixelInterval: 30,
          tickWidth: 2,
          tickPosition: "inside",
          tickLength: 10,
          tickColor: "#666",
          labels: {
            step: 2,
            rotation: "auto"
          },
          title: {
            text: ""
          },
          plotBands: [
            {
              from: 0,
              to: 4,
              color: "#DF5353" // red
            },
            {
              from: 4,
              to: 16,
              color: "#55BF3B" // green
            },
            {
              from: 16,
              to: 20,
              color: "#DF5353" // red
            }
          ]
        },

        series: [
          {
            name: "Speed",
            data: [8],
            tooltip: {
              valueSuffix: ""
            }
          }
        ]
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
            text: "Price to Rent Ratio of Bangkok "
          },
          subtitle: {
            text: ""
          },
          mapNavigation: {
            enabled: true,
            buttonOptions: {
              alignTo: "spacingBox"
            }
          },
          colorAxis: {
            min: 0
            // stops:[0, 'grey']
          },
          series: [
            {
              name: "Price to Rent Ratio",
              states: {
                hover: {
                  color: "#39B7CD	"
                }
              },
              dataLabels: {
                enabled: true,
                format: "{point.name}"
              },
              allAreas: false,
              data: [
                ["pn", 0],
                ["ds", 1],
                ["nc", 2],
                ["br", 3],
                ["bk", 4],
                ["bkp", 5],
                ["ptw", 6],
                ["ppstp", 7],
                ["pkn", 8],
                ["mbr", 9],
                ["lkb", 10],
                ["ynw", 11],
                ["sptw", 12],
                ["pyt", 13],
                ["tbr", 14],
                ["bky", 15],
                ["hk", 16],
                ["ks", 17],
                ["tlc", 18],
                ["bkn", 19],
                ["bkt", 20],
                ["pscr", 21],
                ["nk", 22],
                ["rbrn", 23],
                ["bp", 24],
                ["dd", 25],
                ["bku", 26],
                ["st", 27],
                ["bs", 28],
                ["ctc", 29],
                ["bkl", 30],
                ["pw", 31],
                ["kt", 32],
                ["sl", 33],
                ["ct", 34],
                ["dm", 35],
                ["rctw", 36],
                ["lp", 37],
                ["wtn", 38],
                ["bkh", 39],
                ["ls", 40],
                ["sm", 41],
                ["kny", 42],
                ["sps", 43],
                ["wtl", 44],
                ["ksw", 45],
                ["bn", 46],
                ["twwtn", 47],
                ["tk", 48],
                ["bb", 49]
              ]
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
</style>
