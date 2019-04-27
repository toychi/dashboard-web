
<template>
  <div class="row">
    <div class="col-sm-12">
      <label class="typo__label">Select with search</label>
      <multiselect
        v-model="value"
        :options="options"
        placeholder="Select one"
        label="name"
        track-by="name"
        @close="fetchData()"
        @open="changeVisibility()"
      ></multiselect>
    </div>
    <div class="col-sm-12"></div>
    <div class="col-sm-7">
      <card>
        <highcharts
          v-if="chartVisibility"
          class="map"
          :constructor-type="'mapChart'"
          :options="bkkmap.chartOptions"
          :updateArgs="updateArgs"
        ></highcharts>
      </card>
    </div>
    <div class="col-sm-5">
      <high-chart-card :chartOptions="barchart.chartOptions"></high-chart-card>
    </div>
    <div class="col-sm-8">
      <high-chart-card :chartOptions="chartDistribution.chartOptions"></high-chart-card>
    </div>
  </div>
</template>

<script>
import { StatsCard, ChartCard, HighChartCard } from "@/components/index";
import Card from "@/components/Cards/Card.vue";
import Chartist from "chartist";
import More from "highcharts/highcharts-more";
import Highcharts from "highcharts";
import Axios from "axios";
import Multiselect from "vue-multiselect";
import histogram from "highcharts/modules/histogram-bellcurve.js";
import { thaimap } from "../assets/th-all";

histogram(Highcharts);
More(Highcharts);

export default {
  components: {
    StatsCard,
    ChartCard,
    HighChartCard,
    Multiselect
  },

  mounted() {
    Axios.post("http://0.0.0.0:4000/saledistribution", {
      districtcode: 50
    }).then(response => {
      var k = [];
      for (var i = 0; i < response.data.length; i++) {
        k.push(response.data[i]["priceint"]);
      }
      this.chartDistribution.chartOptions.series[1].data = k;
    });
  },
  /**
   * Chart data used to render stats, charts. Should be replaced with server data
   */
  data() {
    return {
      sample: "null",
      chartVisibility: true,
      updateArgs: [true, true, { duration: 1000 }],
      value: { name: "Phra Nakhon", value: 1 },
      options: [
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

      barchart: {
        chartOptions: {
          chart: {
            type: "column",
            height: 500,
            style: { fontFamily: "Montserrat" }
          },
          title: {
            text: "Amount of House and Condominium"
          },
          xAxis: {
            categories: ["House", "Condominium"]
          },
          series: [
            {
              type: "column",
              colorByPoint: true,
              data: [29.9, 71.5],
              showInLegend: false
            }
          ]
        }
      },

      chartDistribution: {
        chartOptions: {
          title: {
            text: "Distribution of price"
          },
          xAxis: [
            {
              title: { text: "Data" },
              alignTicks: false
            },
            {
              title: { text: "Histogram" },
              alignTicks: false,
              opposite: true
            }
          ],
          yAxis: [
            {
              title: { text: "Data" }
            },
            {
              title: { text: "Histogram" },
              opposite: true
            }
          ],
          series: [
            {
              name: "Histogram",
              type: "histogram",
              xAxis: 1,
              yAxis: 1,
              baseSeries: "s1",
              zIndex: -1
            },
            {
              name: "Data",
              type: "scatter",
              data: [1],
              id: "s1",
              marker: {
                radius: 2
              }
            }
          ]
        }
      },

      bkkmap: {
        chartOptions: {
          chart: {
            map: {
              title: "Bangkok",
              type: "FeatureCollection",
              features: [thaimap.features[0]]
            },
            height: 500,
            style: {
              fontFamily: "Montserrat"
            }
          },
          title: {
            text: "Phra Nakhon"
          },
          series: [
            {
              // Use the gb-all map with no data as a basemap
              name: "Basemap",
              borderColor: "#A0A0A0",
              nullColor: "rgba(200, 200, 200, 0.3)",
              showInLegend: false
            },
            {
              name: "Separators",
              type: "mapline",
              nullColor: "#707070",
              showInLegend: false,
              enableMouseTracking: false
            }
          ]
        }
      },
      d_code: {
        All: 0,
        "Bang Bon": 50,
        "Bang Kapi": 6,
        "Bang Khae": 40,
        "Bang Khen": 5,
        "Bang Kho Laem": 31,
        "Bang Khun Thian": 21,
        "Bang Na": 47,
        "Bang Phlat": 25,
        "Bang Rak": 4,
        "Bang Sue": 29,
        "Bangkok Noi": 20,
        "Bangkok Yai": 16,
        "Bueng Kum": 27,
        "Chom Thong": 35,
        "Din Daeng": 26,
        "Don Mueang": 36,
        Dusit: 2,
        "Huai Khwang": 17,
        "Khan Na Yao": 43,
        "Khlong Sam Wa": 46,
        "Khlong San": 18,
        "Khlong Toei": 33,
        "Lak Si": 41,
        "Lat Krabang": 11,
        "Lat Phrao": 38,
        "Min Buri": 10,
        "Nong Chok": 3,
        "Nong Khaem": 23,
        "Pathum Wan": 7,
        "Phasi Charoen": 22,
        "Phaya Thai": 14,
        "Phra Khanong": 9,
        "Phra Nakhon": 1,
        "Pom Prap Sattru Phai": 8,
        Prawet: 32,
        "Rat Burana": 24,
        Ratchathewi: 37,
        "Sai Mai": 42,
        Samphanthawong: 13,
        "Saphan Sung": 44,
        Sathon: 28,
        "Suan Luang": 34,
        "Taling Chan": 19,
        "Thawi Watthana": 48,
        "Thon Buri": 15,
        "Thung Khru": 49,
        "Wang Thonglang": 45,
        Watthana: 39,
        "Yan Nawa": 12
      }
    };
  },
  methods: {
    fetchData: function() {
      this.chartVisibility = !this.chartVisibility;
      this.bkkmap = {
        chartOptions: {
          chart: {
            map: {
              title: "Bangkok",
              type: "FeatureCollection",
              features: [thaimap.features[this.value.value - 1]]
            },
            height: 500,
            style: {
              fontFamily: "Montserrat"
            }
          },
          title: {
            text: this.value.name
          },
          series: [
            {
              // Use the gb-all map with no data as a basemap
              name: "Basemap",
              borderColor: "#A0A0A0",
              nullColor: "rgba(200, 200, 200, 0.3)",
              showInLegend: false
            },
            {
              name: "Separators",
              type: "mapline",
              nullColor: "#707070",
              showInLegend: false,
              enableMouseTracking: false
            }
          ]
        }
      };
      Axios.post("http://0.0.0.0:4000/saledistribution", {
        districtcode: this.value.value
      }).then(response => {
        var k = [];
        for (var i = 0; i < response.data.length; i++) {
          if (response.data[i]["priceint"] != null) {
            k.push(response.data[i]["priceint"]);
          }
        }
        // console.log(k);
        this.chartDistribution.chartOptions.series[1].data = k.sort((a, b) => a - b);
        // this.chartDistribution.chartOptions.series[1].data = k;
      });
    },
    changeVisibility: function() {
      this.chartVisibility = !this.chartVisibility;
    }
  }
};
</script>
<style>
</style>
