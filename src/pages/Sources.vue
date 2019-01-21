<template>
    <div class="row">
      <div class="col-12">
        <card :title="table1.title" :subTitle="table1.subTitle">
          <div slot="raw-content" class="table-responsive">
            <paper-table :data="table1.data" :columns="table1.columns" :columnsKey="table1.columnsKey">

            </paper-table>
          </div>
        </card>
      </div>


<div class="upload-btn-wrapper col-3">
  <h4>User Input </h4>
  <button class="btn">Upload a file</button>
  <input type="file" name="myfile" />
</div>

      <div class="col-12">
        <card class="card-plain">
          <div class="table-full-width table-responsive">
            <paper-table type="hover" :title="table2.title" :sub-title="table2.subTitle" :data="table2.data"
                         :columns="table2.columns" :columnsKey="table2.columnsKey">

            </paper-table>
          </div>
        </card>
      </div>

    </div>
</template>
<script>
import { PaperTable } from "@/components";
const tableColumns = ["#", "Website", "Status", "Last Crawling", "Last Down"];
const tableColumnsKey = ["id", "website", "status", "lastCrawling", "lastDown"];
const tableData = [
  {
    id: 1,
    website: "Thaihometown.com",
    status: "Crawling",
    lastCrawling: "2018-10-02",
    lastDown: "-"
  },
  {
    id: 2,
    website: "Bannia.com",
    status: "Crawling",
    lastCrawling: "2018-10-02",
    lastDown: "2017-10-02"
  },
  {
    id: 3,
    website: "Source1",
    status: "Stop",
    lastCrawling: "2018-09-03",
    lastDown: "-"
  },
  {
    id: 4,
    website: "Source2",
    status: "Stop",
    lastCrawling: "2018-10-12",
    lastDown: "2018-10-04"
  }
];

const tableColumns2 = ["#", "Name", "Action"];
const tableColumnsKey2 = ["id", "name", "action"];
const tableData2 = [
  {
    id: 1,
   name: "source1",
   action: ""

  }
];

export default {
  components: {
    PaperTable
  },
  data() {
    return {
      table1: {
        title: "Crawling Data",
        subTitle: "",
        columns: [...tableColumns],
        data: [...tableData],
        columnsKey: [...tableColumnsKey]
      },
      table2: {
        title: "User Input",
        subTitle: "",
        columns: [...tableColumns2],
        data: [...tableData2],
        columnsKey: [...tableColumnsKey2]
      }
    };
  }
};
</script>
<style>
.upload-btn-wrapper {
  position: relative;
  overflow: hidden;
  display: inline-block;
}

.btn {
  border: 2px solid gray;
  color: gray;
  background-color: white;
  padding: 8px 20px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: bold;
}

.upload-btn-wrapper input[type=file] {
  font-size: 100px;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
}
</style>
