<template>
<div>
 <h4> Crawling Status </h4>
  <br>
  <card>
   <table class="table table-bordered table-hover">

  <thead>
    <tr>
      <th scope="col"></th>
      <th scope="col">#</th>
      <th scope="col">Website</th>
      <th scope="col">Status</th>
      <th scope="col">Last crawling</th>
      <th scope="col">Last down</th>
      <th scope="col">Number of records</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><input type="checkbox" name="name1" checked/></td>
      <th scope="row">1</th>
      <td>Thaihometown</td>
      <td class="table-success" >Crawling</td>
      <td>2018-10-02</td>
      <td>-</td>
      <td>7542</td>
    </tr>
    <tr>
      <td><input type="checkbox" name="name2" checked/></td>
      <th scope="row">2</th>
      <td>Thaiger Property</td>
      <td class="table-success">Crawling</td>
      <td>2018-11-12</td>
      <td>-</td>
      <td>8976</td>
    </tr>
    <tr>
      <td><input type="checkbox" name="name3" checked/></td>
      <th scope="row">3</th>
      <td>Homefinder</td>
      <td class="table-danger">Stop</td>
      <td>-</td>
      <td>2018-11-12</td>
      <td>5976</td>
    </tr>
  </tbody>
</table>
</card>

<h5>* Crawling = The system is crawling data from this source, 
      Stop = The system is stop crawling data from this source due to connection problem
</h5>

<div class="upload-btn-wrapper col-3">
  <h4>User Input </h4>
  <div class="container">
    <div class="large-12 medium-12 small-12 cell">
      <label>File
        <input type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>
      </label>
      <button v-on:click="submitFile()">Submit</button>
    </div>
  </div>
</div>
<br>

<card>
   <table class="table table-bordered table-hover">
     
  <thead>
    <tr>
      <th scope="col"></th>
      <th scope="col">#</th>
      <th scope="col">File</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><input type="checkbox" name="name1" /></td>
      <th scope="row">1</th>
      <td>Sources1</td>
      <td class="td-actions text-left">
        <button type="button" rel="tooltip" title="Remove" class="btn btn-danger btn-simple btn-xs">
        <i class="fa fa-times"></i>
        </button></td>
  
    </tr>
    </tbody>
  </table>
  </card>
</div>      
</template>
<script>
import axios from "axios";

export default {
    data(){
      return {
        file: ''
      }
    },

    methods: {
      /*
        Submits the file to the server
      */
      submitFile(){
            let formData = new FormData();
            formData.append('file', this.file);

            axios.post('http://0.0.0.0:4000/uploadfile',
                formData,
                {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
              }
            ).then(function(){
          console.log('SUCCESS!!');
        })
        .catch(function(){
          console.log('FAILURE!!');
        });
      },
      handleFileUpload(){
        this.file = this.$refs.file.files[0];
      }
    }
  }
</script>
<style>
/*.upload-btn-wrapper {
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

.upload-btn-wrapper input[type="file"] {
  font-size: 100px;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
}*/
</style>

