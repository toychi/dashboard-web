 <template>
  <div>
    <!-- Customize area -->
    <center>
      <card style="z-index:2">
        <div class="row" id="selectAlgorithm">
          <!-- K-Mean Clustering algorithm -->
          <div class="col-sm-6">
            <button
              type="button"
              v-bind:id="[isActive ? 'selected' : 'notSelected']"
              @click="toggleClass()"
              class="btn btn-primary btn-lg btn-block"
            >Listings</button>
          </div>
          <!-- Density Base Clustering algorithm -->
          <div class="col-sm-6">
            <button
              type="button"
              v-bind:id="[isActive ? 'notSelected' : 'selected']"
              @click="toggleClass()"
              class="btn btn-primary btn-lg btn-block"
            >Districts</button>
          </div>
        </div>
      </card>
    </center>

    <!-- Chart -->
    <card v-bind:id="[isActive ? 'Mselected' : 'MnotSelected']">
      <highcharts
        v-if="isActive"
        class="map"
        :constructor-type="'mapChart'"
        :options="datapointmap.chartOptions"
      ></highcharts>
    </card>
    <card v-bind:id="[!isActive ? 'Mselected' : 'Mnotselected']">
      <highcharts
        v-if="!isActive"
        class="map"
        :constructor-type="'mapChart'"
        :options="bkkmap.chartOptions"
      ></highcharts>
    </card>
    <card class="viewStat" v-if="!isActive">
      <div class="row" id="viewAndHide">
        <div class="col-sm-12">
          <button
            type="button"
            @click="fetchData()"
            v-on:click="seen = !seen"
            class="btn btn-primary btn-lg btn-block"
          >View stat</button>
          <div v-if="seen">
              <div class="Table">
                <b-table striped hover 
                :items="clusterStat" 
                :fields="fields" 
                :sort-by.sync="sortBy"
                :sort-desc.sync="sortDesc"
                class="table b-table mt-3 border text-center"
                ></b-table>
                <!-- <div v-if="isBusy" slot="table-busy" class="text-center text-danger my-2">
                  <div class="spinner-border" role="status"/>
                  <strong class="text-center text-danger my-2">Loading...</strong>
                </div> -->
              </div>
          </div>
        </div>
      </div>
    </card>

    <!-- {{ bkkmap.chartOptions.series }} -->
  </div>
</template>

<script>
import Highcharts from "highcharts";
import Axios from "axios";
import { bts_line } from "../assets/bts";
import { mrt_line } from "../assets/mrt";
import { chaopraya_river } from "..//assets/chaopraya_river";
import { public_park } from "../assets/public_park";
import * as topojson from "topojson-client";

export default {
  mounted() {
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
    Axios.post("http://0.0.0.0:4000/kmean", {}).then(response => {
      this.klabel = response.data;
      for (var d in response.data) {
        this.datapointmap.chartOptions.series.push({
          name: d,
          type: "mappoint",
          data: response.data[d]
        });
      }
    });
  },
  data() {
    return {
      klabel: [],
      isActive: false,
      seen: true,
      isBusy: true,
      newTitle: true,
      staticMap: [
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
          name: "River",
          type: "mapline",
          nullColor: "black",
          color: "black",
          mapData: chaopraya_river,
          lineWidth: 2,
          colorAxis: false
        },
        {
          name: "BTS",
          type: "mapline",
          nullColor: "green",
          color: "green",
          mapData: Highcharts.geojson(
            topojson.feature(bts_line, bts_line.objects.bts_line),
            "mapline"
          ),
          lineWidth: 2,
          colorAxis: false
        },
        {
          name: "MRT",
          type: "mapline",
          nullColor: "blue",
          color: "blue",
          mapData: Highcharts.geojson(
            topojson.feature(mrt_line, mrt_line.objects.mrt_line),
            "mapline"
          ),
          lineWidth: 2,
          colorAxis: false
        }
      ],
      fields: [
        { key: "Cluster", sortable: true },
        { key: "Average Selling", sortable: true },
        { key: "Average Rental", sortable: true },
        { key: "count", sortable: true }
      ],
      clusterStat: [],
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
      },
      datapointmap: {
        chartOptions: {
          chart: {
            map: "myMap",
            height: 500,
            style: {
              fontFamily: "Montserrat"
            }
          },
          title: {
            text: "K-Mean Clustering"
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
            mappoint: {
              turboThreshold: 2000
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
              name: "River",
              type: "mapline",
              nullColor: "black",
              color: "black",
              mapData: chaopraya_river,
              lineWidth: 2,
              colorAxis: false
            },
            {
              name: "BTS",
              type: "mapline",
              nullColor: "green",
              color: "green",
              mapData: Highcharts.geojson(
                topojson.feature(bts_line, bts_line.objects.bts_line),
                "mapline"
              ),
              lineWidth: 2,
              colorAxis: false
            },
            {
              name: "MRT",
              type: "mapline",
              nullColor: "blue",
              color: "blue",
              mapData: Highcharts.geojson(
                topojson.feature(mrt_line, mrt_line.objects.mrt_line),
                "mapline"
              ),
              lineWidth: 2,
              colorAxis: false
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
    },
    fetchData: function() {
      Axios.post("http://0.0.0.0:4000/stat", {
        label: this.bkkmap.chartOptions.series
      }).then(response => {
        var items = [];
        for (var cluster in response.data) {
          console.log(cluster);
          for (var k in response.data[cluster]) {
            response.data[cluster][k] = this.numberWithCommas(
              response.data[cluster][k]
            );
          }
          response.data[cluster]["Cluster"] = cluster;
          items.push(response.data[cluster]);
        }
        this.clusterStat = items;
        // this.isBusy = !this.isBusy;
      });
    },
    numberWithCommas: function(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  }
};
</script>

<style>
#notSelected {
  background-color: lightgray;
  border-style: none;
}
#selected {
  background-color: navy;
  border-style: none;
}
#MnotSelected {
  height: 0px;
}
#Mselected {
  height: 550px;
}
#selectAlgorithm {
  padding: 10px;
}
#viewAndHide {
  padding: 10px;
}
</style>
