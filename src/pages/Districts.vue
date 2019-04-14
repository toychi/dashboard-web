
<template>
  <div class="row">
    <!-- 
  <div>
  {{ info }}
    </div>-->
    <div class="col-sm-12">
      <label class="typo__label">Select with search</label>
      <multiselect
        v-model="value"
        :options="options"
        placeholder="Select one"
        label="name"
        track-by="name"
      ></multiselect>
      <pre class="language-json"><code>{{ value }}</code></pre>
    </div>
    <div class="col-sm-12">
      <!-- <select class="selectpicker" data-live-search = "true">
  <option>Bang Kapi</option>
  <option>Bang Khae</option>
  <option>Bang Khen</option>
      </select>-->
      <!-- 'Bang Kapi',
		'Bang Khae',	
		'Bang Khen',
		'Bang Kho Laem',	
		'Bang Khun Thian',	
		'Bang Na',	
		'Bang Phlat',	
		'Bang Rak',	
		'Bang Sue',	
		'Bangkok Noi',	
		'Bangkok Yai',	
		'Bueng Kum',	
		'Chatuchak',	
		'Chom Thong',	
		'Din Daeng',	
		'Don Mueang',	
		'Dusit',	
		'Huai Khwang',	
		'Khan Na Yao',	
		'Khlong Sam Wa',	
		'Khlong San',	
		'Khlong Toei',
		'Lak Si',	
		'Lat Krabang'	,
		'Lat Phrao',	
		'Min Buri',	
		'Nong Chok',	
		'Nong Khaem',	
		'Pathum Wan',	
		'Phasi Charoen',	
		'Phaya Thai',	
		'Phra Khanong',	
		'Phra Nakhon',	
		'Pom Prap Sattru Phai',	
		'Prawet',	
		'Rat Burana',	
		'Ratchathewi',	
		'Sai Mai',	
		'Samphanthawong',	
		'Saphan Sung',	
		'Sathon',	
		'Suan Luang',	
		'Taling Chan',	
		'Thawi Watthana',	
		'Thon Buri',	
		'Thung Khru',	
		'Wang Thonglang',	
		'Watthana',
      'Yan Nawa'-->
    </div>
    <div class="col-sm-7">
      <card>
        <highcharts class="map" :constructor-type="'mapChart'" :options="bkkmap.chartOptions"></highcharts>
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
import axios from "axios";
import Multiselect from "vue-multiselect";
import histogram from "highcharts/modules/histogram-bellcurve.js";
import { thaimap } from "../assets/th-all";

histogram(Highcharts);
More(Highcharts);

var categories = [
  "Bang Bon",
  "Bang Kapi",
  "Bang Khae",
  "Bang Khen",
  "Bang Kho Laem",
  "Bang Khun Thian",
  "Bang Na",
  "Bang Phlat",
  "Bang Rak",
  "Bang Sue",
  "Bangkok Noi",
  "Bangkok Yai",
  "Bueng Kum",
  "Chatuchak",
  "Chom Thong",
  "Din Daeng",
  "Don Mueang",
  "Dusit",
  "Huai Khwang",
  "Khan Na Yao",
  "Khlong Sam Wa",
  "Khlong San",
  "Khlong Toei",
  "Lak Si",
  "Lat Krabang",
  "Lat Phrao",
  "Min Buri",
  "Nong Chok",
  "Nong Khaem",
  "Pathum Wan",
  "Phasi Charoen",
  "Phaya Thai",
  "Phra Khanong",
  "Phra Nakhon",
  "Pom Prap Sattru Phai",
  "Prawet",
  "Rat Burana",
  "Ratchathewi",
  "Sai Mai",
  "Samphanthawong",
  "Saphan Sung",
  "Sathon",
  "Suan Luang",
  "Taling Chan",
  "Thawi Watthana",
  "Thon Buri",
  "Thung Khru",
  "Wang Thonglang",
  "Watthana",
  "Yan Nawa"
];

export default {
  components: {
    StatsCard,
    ChartCard,
    HighChartCard,
    Multiselect
  },

  // mounted () {
  //   axios
  //     .get('https://api.coindesk.com/v1/bpi/currentprice.json')
  //     .then(response => (this.info = response))
  // },
  /**
   * Chart data used to render stats, charts. Should be replaced with server data
   */

  data() {
    return {
      value: { name: 'Vue.js', language: 'JavaScript' },
      options: [
        { name: 'Vue.js', language: 'JavaScript' },
        { name: 'Rails', language: 'Ruby' },
        { name: 'Sinatra', language: 'Ruby' },
        { name: 'Laravel', language: 'PHP' },
        { name: 'Phoenix', language: 'Elixir' }
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
            categories: ["House", "Condomminium"]
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
            text: "Highcharts Histogram"
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
              data: [
                3.5,
                3,
                3.2,
                3.1,
                3.6,
                3.9,
                3.4,
                3.4,
                2.9,
                3.1,
                3.7,
                3.4,
                3,
                3,
                4,
                4.4,
                3.9,
                3.5,
                3.8,
                3.8,
                3.4,
                3.7,
                3.6,
                3.3,
                3.4,
                3,
                3.4,
                3.5,
                3.4,
                3.2,
                3.1,
                3.4,
                4.1,
                4.2,
                3.1,
                3.2,
                3.5,
                3.6,
                3,
                3.4,
                3.5,
                2.3,
                3.2,
                3.5,
                3.8,
                3,
                3.8,
                3.2,
                3.7,
                3.3,
                3.2,
                3.2,
                3.1,
                2.3,
                2.8,
                2.8,
                3.3,
                2.4,
                2.9,
                2.7,
                2,
                3,
                2.2,
                2.9,
                2.9,
                3.1,
                3,
                2.7,
                2.2,
                2.5,
                3.2,
                2.8,
                2.5,
                2.8,
                2.9,
                3,
                2.8,
                3,
                2.9,
                2.6,
                2.4,
                2.4,
                2.7,
                2.7,
                3,
                3.4,
                3.1,
                2.3,
                3,
                2.5,
                2.6,
                3,
                2.6,
                2.3,
                2.7,
                3,
                2.9,
                2.9,
                2.5,
                2.8,
                3.3,
                2.7,
                3,
                2.9,
                3,
                3,
                2.5,
                2.9,
                2.5,
                3.6,
                3.2,
                2.7,
                3,
                2.5,
                2.8,
                3.2,
                3,
                3.8,
                2.6,
                2.2,
                3.2,
                2.8,
                2.8,
                2.7,
                3.3,
                3.2,
                2.8,
                3,
                2.8,
                3,
                2.8,
                3.8,
                2.8,
                2.8,
                2.6,
                3,
                3.4,
                3.1,
                3,
                3.1,
                3.1,
                3.1,
                2.7,
                3.2,
                3.3,
                3,
                2.5,
                3,
                3.4,
                3
              ],
              id: "s1",
              marker: {
                radius: 1.5
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
            text: ""
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
            // {
            //   type: "mappoint",
            //   color: Highcharts.getOptions().colors[1],
            //   data: [
            //     {
            //       name: "London",
            //       lat: 100.7391846704086,
            //       lon: 13.87445216644475
            //     }
            //   ]
            // }
          ]
        }
      }
    };
  }
};
</script>
<style>
</style>
