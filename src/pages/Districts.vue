
<template>
  <div class="row">
    <!-- 
  <div>
  {{ info }}
    </div>-->
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
        <highcharts
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
  </div>
</template>





<script>
import { StatsCard, ChartCard, HighChartCard } from "@/components/index";
import Card from "@/components/Cards/Card.vue";
import Chartist from "chartist";
import More from "highcharts/highcharts-more";
import Highcharts from "highcharts";
import axios from "axios";

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
    HighChartCard
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
      //       info: null
      //     ,

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

      // barchart:{
      //  chartOptions: {
      //     chart: {
      //         type: 'bar',
      //         height: 650,
      //         style: {
      // 				fontFamily: 'Montserrat'}
      //     },
      //     title: {
      //         text: 'Average Selling price and Rental price'
      //     },
      //     subtitle: {
      //         text: ''
      //     },
      //     xAxis: [{
      //         categories: categories,
      //         reversed: false,
      //         labels: {
      //             step: 1
      //         }
      //     }, { // mirror axis on right side
      //         opposite: true,
      //         reversed: false,
      //         categories: categories,
      //         linkedTo: 0,
      //         labels: {
      //             step: 1
      //         }
      //     }],
      //     yAxis: {
      //         title: {
      //             text: null
      //         },
      //         labels: {
      //             formatter: function () {
      //                 return Math.abs(this.value) + '';
      //             }
      //         }
      //     },

      //     plotOptions: {
      //         series: {
      //             stacking: 'normal'
      //         }
      //     },

      //     tooltip: {
      //         formatter: function () {
      //             return '<b>' + this.series.name + ', price ' + this.point.category + '</b><br/>' +
      //                 'Price: ' + Highcharts.numberFormat(Math.abs(this.point.y), 0);
      //         }
      //     },

      //     series: [{
      //         name: 'Selling',
      //         data: [
      //             -2.2, -2.1, -2.2, -2.4, -2.4,
      //             -2.7, -3.0, -3.3, -3.2, -2.4,
      //             -2.9, -3.5, -4.4, -4.1, -2.4,
      //             -3.4, -2.7, -2.3, -2.2, -2.4,
      //             -1.6, -0.6, -0.3, -0.0, -2.4,
      //             -0.0, -1.6, -0.6, -0.3,  -2.4,
      //             -0.0, -1.6, -0.6, -0.3, -0.0,
      //              -1.6, -0.6, -0.3, -0.0, -2.4,
      //             -0.0, -1.6, -0.6, -0.3,  -2.4,
      //             -0.0, -1.6, -0.6, -0.3, -0.0,

      //         ]
      //     }, {
      //         name: 'Rental',
      //         data: [
      //             2.1, 2.0, 2.1, 2.3, 2.6,
      //             2.9, 3.2, 3.1, 2.9, 3.4,
      //             4.3, 4.0, 3.5, 2.9, 2.5,
      //             2.7, 2.2, 1.1, 0.6, 0.2,
      //            2.1, 2.0, 2.1, 2.3, 2.6,
      //             2.9, 3.2, 3.1, 2.9, 3.4,
      //             4.3, 4.0, 3.5, 2.9, 2.5,
      //             2.7, 2.2, 1.1, 0.6, 0.2,
      //              2.1, 2.0, 2.1, 2.3, 2.6,
      //             2.9, 3.2, 3.1, 2.9, 3.4,
      //         ]
      //     }]
      // }},

      bkkmap: {
        chartOptions: {
          chart: {
            map: "my",
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
