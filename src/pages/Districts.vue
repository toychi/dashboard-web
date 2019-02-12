
<template>
<div class="row">
<!-- 
  <div>
  {{ info }}
</div> -->

  <div  class="col-sm-12">
  <select class="selectpicker " data-style="select-with-transition" title="Single Select" data-size="15">
    <option disabled>Choose district</option>
    <option value="2">Bang Bon</option>
    
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
		'Yan Nawa' -->
  </select>
  </div>
 <div  class="col-sm-5">
        <card>
          <highcharts class="map" :constructor-type="'mapChart'" :options="bkkmap.chartOptions" :updateArgs="updateArgs"></highcharts>
        </card>
         
      </div>
  <div class="col-sm-7">
        <high-chart-card :chartOptions="barchart.chartOptions"></high-chart-card>
        
      </div>
 </div>
</template>

<script>
import { StatsCard, ChartCard, HighChartCard } from "@/components/index";
import Card from "@/components/Cards/Card.vue";
import Chartist from "chartist";
import More from 'highcharts/highcharts-more';
import Highcharts from 'highcharts';
import axios from "axios";
More(Highcharts);

var categories = [
    'Bang Bon', 
    'Bang Kapi',
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
		'Yan Nawa'

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

//         bar: {
//         chartOptions: {
//            chart: {
//         type: 'column',
//         width: 450,
//         height: 300,
//          style: {
//             fontFamily: 'Montserrat'}
    
//     },
//     title: {
//         text: 'Selling and Rental unit'},
        
    
//     xAxis: {
//         categories: ['Total amount'],
//         title: {
//             text: null
//         }
//     },
//     yAxis: {
//         min: 0,
//         title: {
//             text: 'Unit',
//             align: 'high'
//         },
//         labels: {
//             overflow: 'justify'
//         }
//     },
//     tooltip: {
//         valueSuffix: '  Thousand'
//     },
//     plotOptions: {
//         bar: {
//             dataLabels: {
//                 enabled: true
//             }
//         }
//     },
//     legend: {
//         layout: 'vertical',
//         align: 'right',
//         verticalAlign: 'top',
//         x: -40,
//         y: 80,
//         floating: true,
//         borderWidth: 1,
//         backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
//         shadow: true
//     },
//     credits: {
//         enabled: false
//     },
//     series: [{
//         name: 'Selling amount',
//         data: [10]
//     }, {
//         name: 'Rental amount',
//         data: [5 ]
//     }]
// }},


barchart:{
 chartOptions: {
    chart: {
        type: 'bar',
        height: 650,
        style: {
				fontFamily: 'Montserrat'}
    },
    title: {
        text: 'Average Selling price and Rental price'
    },
    subtitle: {
        text: ''
    },
    xAxis: [{
        categories: categories,
        reversed: false,
        labels: {
            step: 1
        }
    }, { // mirror axis on right side
        opposite: true,
        reversed: false,
        categories: categories,
        linkedTo: 0,
        labels: {
            step: 1
        }
    }],
    yAxis: {
        title: {
            text: null
        },
        labels: {
            formatter: function () {
                return Math.abs(this.value) + '';
            }
        }
    },

    plotOptions: {
        series: {
            stacking: 'normal'
        }
    },

    tooltip: {
        formatter: function () {
            return '<b>' + this.series.name + ', price ' + this.point.category + '</b><br/>' +
                'Price: ' + Highcharts.numberFormat(Math.abs(this.point.y), 0);
        }
    },

    series: [{
        name: 'Selling',
        data: [
            -2.2, -2.1, -2.2, -2.4, -2.4,
            -2.7, -3.0, -3.3, -3.2, -2.4,
            -2.9, -3.5, -4.4, -4.1, -2.4,
            -3.4, -2.7, -2.3, -2.2, -2.4,
            -1.6, -0.6, -0.3, -0.0, -2.4,
            -0.0, -1.6, -0.6, -0.3,  -2.4,
            -0.0, -1.6, -0.6, -0.3, -0.0,
             -1.6, -0.6, -0.3, -0.0, -2.4,
            -0.0, -1.6, -0.6, -0.3,  -2.4,
            -0.0, -1.6, -0.6, -0.3, -0.0,          

            
        ]
    }, {
        name: 'Rental',
        data: [
            2.1, 2.0, 2.1, 2.3, 2.6,
            2.9, 3.2, 3.1, 2.9, 3.4,
            4.3, 4.0, 3.5, 2.9, 2.5,
            2.7, 2.2, 1.1, 0.6, 0.2,
           2.1, 2.0, 2.1, 2.3, 2.6,
            2.9, 3.2, 3.1, 2.9, 3.4,
            4.3, 4.0, 3.5, 2.9, 2.5,
            2.7, 2.2, 1.1, 0.6, 0.2,
             2.1, 2.0, 2.1, 2.3, 2.6,
            2.9, 3.2, 3.1, 2.9, 3.4,
        ]
    }]
}},


bkkmap: {
        chartOptions: {
           chart: {
          map: 'myMap',
        
          height: 550,
        
           style: {
            fontFamily: 'Montserrat',
            	}
        },
        title: {
          text: ''
        },
        subtitle: {
          text: ''
        },
        mapNavigation: {
          enabled: true,
          buttonOptions: {
            alignTo: 'spacingBox'
          }
        },
        
        // series: [{
        //   name: 'Random data',
        //   states: {
        //     hover: {
        //       color: '#39B7CD	'
        //     }
        //   },
          // dataLabels: {
          //   enabled: true,
          //   format: '{point.name}'
          // },
          allAreas: false,
          data: [
            ['pn'],
            // ['ds', 1],
            // ['nc', 2],
            // ['br', 3],
            // ['bk', 4],
            // ['bkp', 5],
            // ['ptw', 6],
            // ['ppstp', 7],
            // ['pkn', 8],
            // ['mbr', 9],
            // ['lkb', 10],
            // ['ynw', 11],
            // ['sptw', 12],
            // ['pyt', 13],
            // ['tbr', 14],
            // ['bky', 15],
            // ['hk', 16],
            // ['ks', 17],
            // ['tlc', 18],
            // ['bkn', 19],
            // ['bkt', 20],
            // ['pscr', 21],
            // ['nk', 22],
            // ['rbrn', 23],
            // ['bp', 24],
            // ['dd', 25],
            // ['bku', 26],
            // ['st', 27],
            // ['bs', 28],
            // ['ctc', 29],
            // ['bkl', 30],
            // ['pw', 31],
            // ['kt', 32],
            // ['sl', 33],
            // ['ct', 34],
            // ['dm', 35],
            // ['rctw', 36],
            // ['lp', 37],
            // ['wtn', 38],
            // ['bkh', 39],
            // ['ls', 40],
            // ['sm', 41],
            // ['kny', 42],
            // ['sps', 43],
            // ['wtl', 44],
            // ['ksw', 45],
            // ['bn', 46],
            // ['twwtn', 47],
            // ['tk', 48],
            // ['bb', 49],
            
           
          ]
        }
      
        }}






    }}
</script>
<style>
</style>
