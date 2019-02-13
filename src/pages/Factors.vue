 <template>
  <div>
    <card class="cluster">
      <highcharts
        class="map"
        :constructor-type="'mapChart'"
        :options="bkkmap.chartOptions"
        :updateArgs="updateArgs"
      ></highcharts>
    </card>
  </div>
</template>

<script>
import Highcharts from "highcharts";
import Axios from "axios";

export default {
  mounted() {
    Axios.get("http://35.187.253.51:4000/mapcluster").then(
      response => (this.clusterlabel = response.data)
    );
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
            text: "Price to Rent Ratio of Bangkok "
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
          series: [
            {
              name: "1",
              data: [
                "pn",
                "ds",
                "nc",
                "br",
                "bk",
                "bkp",
                "ptw",
                "ppstp",
                "pkn",
                "mbr",
                "lkb"
              ].map(function(code) {
                return { code: code };
              })
            },
            {
              name: "2",
              data: [
                "ynw",
                "sptw",
                "pyt",
                "tbr",
                "bky",
                "hk",
                "ks",
                "tlc",
                "bkn",
                "bkt"
              ].map(function(code) {
                return { code: code };
              })
            },
            {
              name: "3",
              data: [
                "pscr",
                "nk",
                "rbrn",
                "bp",
                "dd",
                "bku",
                "st",
                "bs",
                "ctc",
                "bkl"
              ].map(function(code) {
                return { code: code };
              })
            },
            {
              name: "4",
              data: [
                "pw",
                "kt",
                "sl",
                "ct",
                "dm",
                "rctw",
                "lp",
                "wtn",
                "bkh",
                "ls"
              ].map(function(code) {
                return { code: code };
              })
            },
            {
              name: "5",
              data: [
                "sm",
                "kny",
                "sps",
                "wtl",
                "ksw",
                "bn",
                "twwtn",
                "tk",
                "bb"
              ].map(function(code) {
                return { code: code };
              })
            }
          ]
        }
      }
    };
  }
};
</script>

<style>
.cluster {
  height: 550px;
}
</style>



