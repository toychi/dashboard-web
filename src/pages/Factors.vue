 <template>
  <div>
    <card class="cluster">
      <highcharts
        class="map"
        :constructor-type="'mapChart'"
        :options="bkkmap.chartOptions"
      ></highcharts>
    </card>
    {{ bkkmap.chartOptions.series }}
    <button @click="fetchData()">View stat</button>
  </div>
</template>

<script>
import Highcharts from "highcharts";
import Axios from "axios";

export default {
  mounted() {
    // Axios.get("http://35.187.253.51:4000/mapcluster").then(response => {
    Axios.get("http://0.0.0.0:4000/mapcluster").then(response => {
      this.clusterlabel = response.data;
      var i, j;
      for (j = 0; j < 5; j++) {
        var k = [];
        for (i = 0; i < this.clusterlabel["labels"].length; i++) {
          if (this.clusterlabel["labels"][i] == j) {
            k.push(this.clusterlabel["keys"][i]);
          }
        }
        this.bkkmap.chartOptions.series.push({
          name: String(j),
          data: k.map(function(code) {
            return { code: code };
          })
        });
      }
    });
  },
  data() {
    return {
      clusterlabel: null,
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
            text: "Cluster analysis using K-Means algorithm"
          },
          legend: {
            align: "right",
            verticalAlign: "top",
            layout: "vertical",
            itemMarginTop: 20
          },
          mapNavigation: {
            enabled: true,
            buttonOptions: {
              alignTo: "spacingBox"
            }
          },
          plotOptions: {
            map: {
              allAreas: false,
              joinBy: ["hc-key", "code"],
              dataLabels: {
                enabled: true,
                color: "#FFFFFF",
                style: {
                  fontWeight: "bold"
                }
              },
              tooltip: {
                headerFormat: "",
                pointFormat: "{point.name}: <b>CLUSTER {series.name}</b>"
              }
            }
          },
          series: []
        }
      }
    };
  },
  methods: {
    fetchData: function() {
      Axios.post("http://0.0.0.0:4000/stat", {
        label: this.bkkmap.chartOptions.series
      }).then(response => {

      })
    }
  }
};
</script>

<style>
.cluster {
  height: 550px;
}
</style>



