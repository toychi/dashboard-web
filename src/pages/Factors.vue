 <template>
  <div>
    <!-- Customize area -->
    <center>
      <card style="z-index:2">
        <div class="row" id="selectdistrict">
        <div class="col-sm-6">
            <button
              type="button"
              v-bind:id="[isActive ? 'not' : 'selected']"
              @click="isActive = !isActive"
              class="btn btn-primary btn-lg btn-block"
            >House</button>
          </div>
          <div class="col-sm-6">
            <button
              type="button"
              v-bind:id="[isActive ? 'selected' : 'not']"
              @click="isActive = !isActive"
              class="btn btn-primary btn-lg btn-block"
            >Condominium</button>
          </div>
        </div>
          <b-form >
              <div v-if="!isHidden" class="col-sm-12">
                <br>
                <multiselect  v-model="selectedNum" :options="optionsNum" placeholder="Select K-means Value"></multiselect>
              </div>
              </b-form>
            <div class="row" id="selectdistrict">
          <div class="col-sm-2" style="display: flex; align-items: center;">
            <span style="font-size:16px;">Factors</span>
          </div>
          <div class="col-sm-10" id="colFormLabelLg">
            <multiselect
              v-model="selectedFactor"
              :options="optionsFactor"
              :multiple="true"
              :close-on-select="false"
              :clear-on-select="false"
              :preserve-search="true"
              placeholder="Search for Factors ..."
              label="name"
              track-by="name"
              :preselect-first="true"
            ></multiselect>
        </div> 
        
        <div class="col-sm-12">
          <br>
            <b-button
              block
              variant="outline-success"
              style="text-transform: uppercase;"
              @click="fetchData()"
            >Submit</b-button>
          </div>
          
        </div>
      </card>
    </center>

    <!-- Chart -->
    <card class="cluster">
      <highcharts class="map" :constructor-type="'mapChart'" :options="bkkmap.chartOptions"></highcharts>
    </card>
    <card class="viewStat">
      <div class="row" id="viewAndHide">
        <div class="col-sm-12">
          <button 
          type="button"
          @click="fetchData(); toggleClass()"
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
                </div>-->
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
import Multiselect from "vue-multiselect";

export default {
   components: {
    Multiselect
  },
  mounted() {
    Axios.post("http://0.0.0.0:4000/mapcluster2", {
      num: this.selectedNum
    }).then(response => {
      console.log(response.data)
      this.clusterlabel = response.data;
      var i, j;
      for (j = 0; j < 5; j++) {
        var k = [];
        for (i = 0; i < this.clusterlabel["labels"].length; i++) {
          var cluster_id = this.clusterlabel["labels"][i][0];
          var district_id = this.clusterlabel["labels"][i][1];
          if (cluster_id == j) {
            k.push(this.clusterlabel["keys"][district_id]);
          }
        }
        this.bkkmap.chartOptions.series.push({
          name: String(j),
          data: k.map(function(code) {
            return { code: code };
          })
        });
      }
      this.stat = response.data['stat'];
    });
  },
  data() {
    return {
      isActive: true,
      seen: true,
      isBusy: true,
      stat: [],
      newTitle : true,
      selectedFactor: null,
      optionsFactor: [
        { name: "All"},
        { name: "F1"},
        { name: "F2"},
        { name: "F3"},
        { name: "F4"},
        { name: "F5"},
      ],
      selectedNum: 5,
      optionsNum: [
        "1","2","3","4","5"
      ],
      fields: [
        {key: 'Cluster', sortable: true},
        {key: 'count', sortable: true},
        {key: 'mean', sortable: true},
        {key: 'min', sortable: true},
        {key: 'max', sortable: true},
        {key: 'stdev', sortable: true}
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
            },
            allAreas: true
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
          console.log(cluster)
          for(var k in response.data[cluster]) {
            response.data[cluster][k] = this.numberWithCommas(response.data[cluster][k])
          }
          response.data[cluster]["Cluster"] = cluster;
          items.push(response.data[cluster]);
        }
        this.clusterStat = items;
        // this.isBusy = !this.isBusy;
      });
      Axios.post("http://0.0.0.0:4000/mapcluster2", {
      num: this.selectedNum
    }).then(response => {
      console.log(response.data)
      this.clusterlabel = response.data;
      var i, j;
      for (j = 0; j < 5; j++) {
        var k = [];
        for (i = 0; i < this.clusterlabel["labels"].length; i++) {
          var cluster_id = this.clusterlabel["labels"][i][0];
          var district_id = this.clusterlabel["labels"][i][1];
          if (cluster_id == j) {
            k.push(this.clusterlabel["keys"][district_id]);
          }
        }
        this.bkkmap.chartOptions.series.push({
          name: String(j),
          data: k.map(function(code) {
            return { code: code };
          })
        });
      }
      this.stat = response.data['stat'];
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
  #selectAlgorithm {
    padding: 10px;
  }
  #viewAndHide{
    padding: 10px;
  }
  .cluster {
    height: 550px;
  }
</style>
