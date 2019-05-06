
<template>
  <div>
    <card style="z-index:2">
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
      </div>
    </card>
    <div class="row">
      <div class="col-sm-8">
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
      <div class="col-sm-12">
        <high-chart-card :chartOptions="chartDistribution.chartOptions"></high-chart-card>
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
import Axios from "axios";
import Multiselect from "vue-multiselect";
import histogram from "highcharts/modules/histogram-bellcurve.js";
import { thaimap } from "../assets/th-all";
import { department_store } from "../assets/department_store";
import { public_park } from "../assets/public_park";
import * as topojson from "topojson-client";

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
    
  },
  /**
   * Chart data used to render stats, charts. Should be replaced with server data
   */
  data() {
    return {
      cc: null,
      department_store_points: Highcharts.geojson(
        topojson.feature(
          department_store,
          department_store.objects.department_store
        ),
        "mappoint"
      ),
      public_park_points: Highcharts.geojson(
        topojson.feature(public_park, public_park.objects.public_park),
        "mappoint"
      ),
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

      chartDistribution: {
        chartOptions: {
          title: {
            text: "Distribution of price"
          },
          xAxis: {
            title: { text: "Histogram" }
          },
          yAxis: {
            title: { text: "Histogram" }
          },
          series: [
            {
              name: "Histogram",
              type: "histogram",
              baseSeries: 1,
              zIndex: -1
            },
            {
              data: [1],
              visible: false,
              showInLegend: false
            }
          ]
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
            text: "Phra Nakhon"
          },
          mapNavigation: {
            enabled: true,
            buttonOptions: {
              alignTo: "spacingBox"
            }
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
            },
            {
              name: "Department store",
              type: "mappoint",
              data: Highcharts.geojson(
                topojson.feature(
                  department_store,
                  department_store.objects.department_store
                ),
                "mappoint"
              )
            },
            {
              name: "Public park",
              type: "mappoint",
              data: Highcharts.geojson(
                topojson.feature(public_park, public_park.objects.public_park),
                "mappoint"
              )
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
      var d_points = [];
      var p_points = [];
      var c_points = [];
      for (var c = 0; c < this.department_store_points.length; c++) {
        if (
          this.inside(
            this.department_store_points[c],
            thaimap.features[this.value.value - 1]["geometry"]["coordinates"][0]
          )
        ) {
          d_points.push(this.department_store_points[c]);
        }
      }
      for (var c = 0; c < this.public_park_points.length; c++) {
        if (
          this.inside(
            this.public_park_points[c],
            thaimap.features[this.value.value - 1]["geometry"]["coordinates"][0]
          )
        ) {
          p_points.push(this.public_park_points[c]);
        }
      }
      Axios.post("http://0.0.0.0:4000/location", {
        district: this.value.name
      }).then(response => {
        for (var c = 0; c < response.data.length; c++) {
          c_points.push(response.data[c])
        }
        this.cc = c_points;
        this.bkkmap = {
          chartOptions: {
            chart: {
              map: {
                title: "Bangkok",
                type: "FeatureCollection",
                "hc-transform": {
                  "default": {
                    "crs": "+title=WGS 84 (long/lat) +proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees"
                  }
                },
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
            mapNavigation: {
              enabled: true,
              buttonOptions: {
                alignTo: "spacingBox"
              }
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
              },
              {
                name: "Department store",
                type: "mappoint",
                data: d_points
              },
              {
                name: "Public park",
                type: "mappoint",
                data: p_points
              },
              {
                name: "Condo",
                type: "mappoint",
                data: this.cc
              }
            ]
          }
        };
        this.chartVisibility = !this.chartVisibility;
      });
      Axios.post("http://0.0.0.0:4000/saledistribution", {
        district: this.value.name
      }).then(response => {
        this.chartDistribution.chartOptions.series[1].data = response.data['rent_result'];
      });
    },
    changeVisibility: function() {
      this.chartVisibility = !this.chartVisibility;
    },
    inside(point, vs) {
      // ray-casting algorithm based on
      // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html

      var x = point["x"],
        y = -point["y"];

      var inside = false;
      for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        var xi = vs[i][0],
          yi = vs[i][1];
        var xj = vs[j][0],
          yj = vs[j][1];

        var intersect =
          yi > y != yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
        if (intersect) inside = !inside;
      }

      return inside;
    }
  }
};
</script>
<style>
</style>
