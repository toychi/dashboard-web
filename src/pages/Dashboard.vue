<template>
  <div>

    <!-- hightchart -->
    <div class="row">
     <div class="col-sm-5">
        <high-chart-card :chartOptions="solidGauge.chartOptions">
         
        </high-chart-card>
        <!-- <high-chart-card :chartOptions="splineChart.chartOptions"></high-chart-card> -->
         <button id="plain">Plain</button>
        <high-chart-card :chartOptions="ranking.chartOptions">
          
        </high-chart-card>
      </div>
      <div class="col-sm-7 col-12">
        <card>
          <highcharts class="map" :constructor-type="'mapChart'" :options="bkkmap.chartOptions" :updateArgs="updateArgs"></highcharts>
        
     
        </card>
         <high-chart-card :chartOptions="line.chartOptions"></high-chart-card> 
          
      </div>
      


    
     <div class="col-sm-5 col-12">
        <!-- <high-chart-card :chartOptions="pie.chartOptions"></high-chart-card>
         <high-chart-card :chartOptions="bar.chartOptions"></high-chart-card> -->
      </div>

   
       <div class="col-sm-7 col-12">
        <!-- <high-chart-card :chartOptions="bubble.chartOptions"></high-chart-card> -->
        
     
      

    </div>
    </div>



  </div>
</template>


<script>
import { StatsCard, ChartCard, HighChartCard } from "@/components/index";
import Card from "@/components/Cards/Card.vue";
import Chartist from "chartist";
import More from 'highcharts/highcharts-more';
import Highcharts from 'highcharts';
More(Highcharts);

export default {
  components: {
    StatsCard,
    ChartCard,
    HighChartCard
  },
  /**
   * Chart data used to render stats, charts. Should be replaced with server data
   */
  data() {
    return {
     
ranking:{
   chartOptions: {
          chart: {
            type: "bar",
            width: 300,
            height: 230,
            
            style: {
            fontFamily: 'Montserrat',
             fontSize: 9}
        },
          title: {
    text: ''
  },
  credits: {
    enabled: false
  },
  legend: {
    enabled: false
  },
  tooltip: {
    enabled: false
  },
  xAxis: {
    offset: -10,
    lineWidth: 0,
    tickWidth: 20,
    tickLength: 20,
    tickInterval: 1,
    tickColor: '#9C9C9C',
    labels: {
      x: -3,
      style: {
        color: '#FFFFFF',
      },
      formatter: function() {
        var returningString = this.value.toString();

        if (returningString.length === 1) {
          returningString = '0' + returningString;
        }

        return returningString;
      }
    }
  },
  yAxis: {
    endOnTick: false,
    gridLineWidth: 0,
    plotLines: [{
      value: 0,
      width: 20,
      color: '#ffffff',
      zIndex: 1
    }],
    title: {
      text: ''
    },
    labels: {
      enabled: false
    }
  },
  plotOptions: {
    series: {
      pointStart: 1,
      borderWidth: 0,
      threshold: 0.5,
      stacking: 'normal',
      dataLabels: {
        enabled: true,
        style: {
          textOutline: false
        }
      }
    }
  },
  series: [{
    index: 1,
    color: '#39B7CD	',
    dataLabels: {
      align: 'left',
      formatter: function() {
        return '' + this.key;
      }
    },
    data: [{
      name: 'Silom',
      y: 6.5
    }, {
      name: 'Sathon',
      y: 6
    }, {
      name: 'Prawet',
      y: 5.5
    }, {
      name: 'Suan Luang',
      y: 5
    }, {
      name: 'Chom Thong',
      y: 4.5
    }]
  }, {
    index: 0,
    color: '#000000',
    dataLabels: {
      align: 'center',
      formatter: function() {
        console.log(this);
        return '' + this.point.value + '';
      }
    },
    data: [{
      y: 1.5,
      value: 27
    }, {
      y: 1.5,
      value: 25
    }, {
      y: 1.5,
      value: 23
    }, {
      y: 1.5,
      value: 22
    }, {
      y: 1.5,
      value: 21
    }]
  }]
}


},

line :{
    chartOptions:{
      chart:{
        height: 230,
        style: {fontFamily: 'Montserrat'}
      },
       title: {
        text: 'Average Selling price and Rental price'
    },

    subtitle: {
        text: ''
    },

    yAxis: {
        title: {
            text: 'Price'
        }
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
    },

    plotOptions: {
        series: {
            label: {
                connectorAllowed: false
            },
            pointStart: 2010
        }
    },

    series: [{
        name: 'House',
        data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
    }, {
        name: 'Condominium',
        data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
    }
        ],

    responsive: {
        rules: [{
            condition: {
                maxWidth: 200
            },
            chartOptions: {
                legend: {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom'
                }
            }
        }]
    }
    }
},


      
   solidGauge: {
    chartOptions: {

    chart: {
        type: 'solidgauge',
        height:300
    }}},



  bkkmap: {
        chartOptions: {
           chart: {
          map: 'myMap',
        
          height: 300,
        
           style: {
            fontFamily: 'Montserrat',
            	}
        },
        title: {
          text: 'Bangkok map'
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
        colorAxis: {
          min: 0,
         
        },
        series: [{
          name: 'Random data',
          states: {
            hover: {
              color: '#39B7CD	'
            }
          },
          dataLabels: {
            enabled: true,
            format: '{point.name}'
          },
          allAreas: false,
          data: [
            ['pn', 0],
            ['ds', 1],
            ['nc', 2],
            ['br', 3],
            ['bk', 4],
            ['bkp', 5],
            ['ptw', 6],
            ['ppstp', 7],
            ['pkn', 8],
            ['mbr', 9],
            ['lkb', 10],
            ['ynw', 11],
            ['sptw', 12],
            ['pyt', 13],
            ['tbr', 14],
            ['bky', 15],
            ['hk', 16],
            ['ks', 17],
            ['tlc', 18],
            ['bkn', 19],
            ['bkt', 20],
            ['pscr', 21],
            ['nk', 22],
            ['rbrn', 23],
            ['bp', 24],
            ['dd', 25],
            ['bku', 26],
            ['st', 27],
            ['bs', 28],
            ['ctc', 29],
            ['bkl', 30],
            ['pw', 31],
            ['kt', 32],
            ['sl', 33],
            ['ct', 34],
            ['dm', 35],
            ['rctw', 36],
            ['lp', 37],
            ['wtn', 38],
            ['bkh', 39],
            ['ls', 40],
            ['sm', 41],
            ['kny', 42],
            ['sps', 43],
            ['wtl', 44],
            ['ksw', 45],
            ['bn', 46],
            ['twwtn', 47],
            ['tk', 48],
            ['bb', 49],
            
           
          ]
        }]
      
        }}
    
    }}}
</script>
<style>
</style>
