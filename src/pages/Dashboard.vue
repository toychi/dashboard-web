<template>
  <div>

    <!-- hightchart -->
    <div class="row">
      <div class="col-md-6 col-6">
        <high-chart-card :chartOptions="solidGauge.chartOptions"></high-chart-card>
      </div>
      <div class="col-md-6 col-12">
        <high-chart-card :chartOptions="splineChart.chartOptions"></high-chart-card>
      </div>
    
     <div class="col-md-6 col-12">
        <high-chart-card :chartOptions="pie.chartOptions"></high-chart-card>
      </div>

       <div class="col-md-6 col-12">
        <high-chart-card :chartOptions="bar.chartOptions"></high-chart-card>
      </div>

       <div class="col-md-6 col-12">
        <high-chart-card :chartOptions="bubble.chartOptions"></high-chart-card>
      </div>
     
      

    </div>



  </div>
</template>


<script>
import { StatsCard, ChartCard, HighChartCard } from "@/components/index";
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
     


  splineChart: {
        chartOptions: {
          chart: {
            type: "spline",
            width: 400,
            height: 300,
            style: {
            fontFamily: 'Montserrat'}
        },
          
          title: {
            text: "Price to Rent Ratio History"
          
          },
          yAxis: {
            title: {
              text: "Price to Rent Ratio"
            }
          },
          series: [
            {
              data: [10, 0, 8, 2, 6, 4, 5, 5],
              color: "#6fcd98"
            }
          ]
        }
      },
      //   pieChart: {
      //   chartOptions: {
      //     chart: {
      //       type: "pie",
      //       width: 400,
      //       height: 300,
      //       style: {
      //       fontFamily: 'Montserrat'}
      //   },
          
      //     title: {
      //       text: "Price to Rent Ratio History"
          
      //     },
      //     yAxis: {
      //       title: {
      //         text: "Price to Rent Ratio"
      //       }
      //     },
      //     series: [
      //       {
      //         data: [10, 0, 8, 2, 6, 4, 5, 5],
      //         color: "#6fcd98"
      //       }
      //     ]
      //   }
      // },

   solidGauge: {
    chartOptions: {
       chart: {
        type: "solidgauge",
        width: 400,
        height: 300,
          style: {
            fontFamily: 'Montserrat',
            fontSize: 5,
            }
        },
        title: {
          text: "Current Price to Rent Ratio",
        }
    }},

    
   pie: {
        chartOptions: {
          chart: {
            type: 'pie',
            width: 400,
            height: 300,
            style: {
            fontFamily: 'Montserrat'}
        },
          
          title: {
            text: "Type of house in Market"
          
          },
           series: [
            {
              data: [10, 0, 8, 2, 6, 4, 5, 5],
              color: "#6fcd98"
            }
           ]
        
          }
          },


          bar: {
        chartOptions: {
          chart: {
            type: 'bar',
            width: 400,
            height: 300,
            style: {
            fontFamily: 'Montserrat'}
        },
          
          title: {
            text: "Average selling price and rental price"
          
          },
           series: [
            {
              data: [10, 0, 8, 2, 6, 4, 5, 5],
              color: "#6fcd98"
            }
           ]
        
          }
          },

        
        bubble: {
        chartOptions: {
          chart: {
            type: 'packedbubble',
            width: 400,
            height: 300,
            style: {
            fontFamily: 'Montserrat'}
        },
          
          title: {
            text: "District ranking by amount of houses for sale"
          
          },
           series: [
            {
              data: [10, 0, 8, 2, 6, 4, 5, 5],
              
            }
           ]
        
          }
          }
   
    
   }}}
</script>
<style>
</style>
