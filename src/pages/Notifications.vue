<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-12">
        <h5>Set notifications rules</h5>
        <hr>
        <button type="button" class="btn btn-success btn-sm" v-b-modal.rule-modal>+ Add a rule</button>
        <br><br>
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col" style="text-align:center">Value</th>
              <th scope="col" style="text-align:center">Type</th>
              <th scope="col" style="text-align:center">District</th>
              <th scope="col" style="text-align:center">Period</th>
              <th scope="col" style="text-align:center">Operation</th>
              <th scope="col" style="text-align:center">Condition</th>
              <th scope="col" style="text-align:center">Amount</th>
              <th scope="col" style="text-align:center">Edit</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(rule, index) in rules" :key="index">
              <td>{{ rule.value }}</td>
              <td>{{ rule.type }}</td>
              <td>{{ rule.district.join(', ') }}</td>
              <td>{{ rule.period + " month" }}</td>
              <td>{{ rule.operation }}</td>
              <td>{{ rule.condition }}</td>
              <td>{{ rule.amount }}</td>
              <td>
                <div class="btn-group" role="group">
                  <button
                    type="button"
                    class="btn btn-warning btn-sm"
                    v-b-modal.rule-update-modal
                    @click="editRule(rule)">
                    Update
                  </button>
                  <button
                    type="button"
                    class="btn btn-danger btn-sm"
                    @click="onDeleteRule(rule)">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <b-modal ref="addRuleModal"
            id="rule-modal"
            title="Add a new rule"
            hide-footer>
      <b-form @submit="onSubmit" @reset="onReset" class="w-100">

        <!-- Value -->
        <label class="typo__label"><b><strong>Value</strong></b></label>
        <multiselect v-model="addRuleForm.value" :options=" addRuleForm.ValueState"  required placeholder="Select a focused value"></multiselect>
      
        <!-- Type -->
         <label class="typo__label"><b><strong>Type</strong></b></label> 
        <multiselect v-model="addRuleForm.type" :options="addRuleForm.typeState"  required placeholder="Select type"></multiselect>

        <!-- District -->
        <label class="typo__label"><b><strong>District</strong></b></label>
        <multiselect v-model="addRuleForm.district" :options="addRuleForm.districtState" :multiple="true" :close-on-select="false" :clear-on-select="false" :preserve-search="true" placeholder="Search for districts ..."
              label="name"
              track-by="name"
              :preselect-first="true"
              :max="5"
        ></multiselect>

        <!-- Period -->
        <label class="typo__label"><b><strong>Period</strong></b></label> 
        <multiselect v-model="addRuleForm.period" :options="addRuleForm.periodState" placeholder="Select period" label="ptext"></multiselect>

         <!-- Operation -->
        <label class="typo__label"><b><strong>Operation</strong></b></label> 
        <multiselect v-model="addRuleForm.operation" :options="addRuleForm.operationState" placeholder="Select operation"></multiselect>

        <!-- Condition -->
        <label class="typo__label"><b><strong>Condition</strong></b></label> 
        <multiselect v-model="addRuleForm.condition" :options="addRuleForm.conditionState" placeholder="Dropdown" slot="prepend"></multiselect>
         
        <div>
          <b-input-group v-if="addRuleForm.value === 'Price to rent ratio'" append="%">
            <b-form-input v-model="addRuleForm.amount"></b-form-input>
          </b-input-group>
          <b-input-group v-else append="units">
            <b-form-input v-model="addRuleForm.amount"></b-form-input>
          </b-input-group>
        </div> 
       
        <b-button-group>
          <b-button type="submit" variant="primary">Submit</b-button>
          <b-button type="reset" variant="danger">Reset</b-button>
        </b-button-group>
      </b-form>
    </b-modal>



    <!-- Edit Rule-->
    <b-modal ref="editRuleModal"
         id="rule-update-modal"
         title="Update"
         hide-footer>
    <b-form @submit="onSubmitUpdate" @reset="onResetUpdate" class="w-100">

      <!-- Value -->
      {{ editRuleForm }}
        <label class="typo__label"><b><strong>Value</strong></b></label>
        <multiselect v-model="editRuleForm.value" :options="addRuleForm.ValueState"  required placeholder="Select a focused value"></multiselect>
      
        <!-- Type -->
         <label class="typo__label"><b><strong>Type</strong></b></label> 
        <multiselect v-model="editRuleForm.type" :options="addRuleForm.typeState"  required placeholder="Select type"></multiselect>

        <!-- District -->
        <label class="typo__label"><b><strong>District</strong></b></label>
        <multiselect v-model="editRuleForm.district" :options="addRuleForm.districtState" :multiple="true" :close-on-select="false" :clear-on-select="false" :preserve-search="true" placeholder="Search for districts ..."
              label="name"
              track-by="name"
              :preselect-first="true"
              :max="5"
        ></multiselect>

        <!-- Period -->
        <label class="typo__label"><b><strong>Period</strong></b></label> 
        <multiselect v-model="editRuleForm.period" :options="addRuleForm.periodState" placeholder="Select period" label="ptext"></multiselect>

         <!-- Operation -->
        <label class="typo__label"><b><strong>Operation</strong></b></label> 
        <multiselect v-model="editRuleForm.operation" :options="addRuleForm.operationState" placeholder="Select operation"></multiselect>

        <!-- Condition -->
        <label class="typo__label"><b><strong>Condition</strong></b></label> 
        <multiselect v-model="editRuleForm.condition" :options="addRuleForm.conditionState" placeholder="Dropdown" slot="prepend"></multiselect>
         
        <div>
          <b-input-group v-if="editRuleForm.value === 'Price to rent ratio'" append="%">
            <b-form-input v-model="editRuleForm.amount"></b-form-input>
          </b-input-group>
          <b-input-group v-else append="units">
            <b-form-input v-model="editRuleForm.amount"></b-form-input>
          </b-input-group>
        </div>  
       
        <b-button-group>
          <b-button type="submit" variant="primary">Update</b-button>
          <b-button type="reset" variant="danger">Cancel</b-button>
        </b-button-group>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import axios from 'axios';
 import Multiselect from 'vue-multiselect'
export default {
  components: {
      Multiselect
    },
  data() {
      return {
        rules: [],
        addRuleForm:{
          value:'',
          ValueState: ["Price to rent ratio","Rental Unit","Selling unit"],

          type: '',
          typeState: ["Home","Condo"],

          district: '',
          districtState: [
            { name: "All" },
            { name: "Bang Bon"},
            { name: "Bang Kapi" },
            { name: "Bang Khae"},
            { name: "Bang Khen" },
            { name: "Bang Kho Laem"},
            { name: "Bang Khun Thian"},
            { name: "Bang Na"},
            { name: "Bang Phlat" },
            { name: "Bang Rak"},
            { name: "Bang Sue" },
            { name: "Bangkok Noi"},
            { name: "Bangkok Yai"},
            { name: "Bueng Kum"},
            { name: "Chom Thong"},
            { name: "Din Daeng" },
            { name: "Don Mueang" },
            { name: "Dusit" },
            { name: "Huai Khwang"},
            { name: "Khan Na Yao"},
            { name: "Khlong Sam Wa" },
            { name: "Khlong San"},
            { name: "Khlong Toei"},
            { name: "Lak Si" },
            { name: "Lat Krabang" },
            { name: "Lat Phrao"},
            { name: "Min Buri"},
            { name: "Nong Chok" },
            { name: "Nong Khaem" },
            { name: "Pathum Wan"},
            { name: "Phasi Charoen" },
            { name: "Phaya Thai" },
            { name: "Phra Khanong" },
            { name: "Phra Nakhon" },
            { name: "Pom Prap Sattru Phai"},
            { name: "Prawet" },
            { name: "Rat Burana" },
            { name: "Ratchathewi" },
            { name: "Sai Mai"},
            { name: "Samphanthawong" },
            { name: "Saphan Sung"},
            { name: "Sathon" },
            { name: "Suan Luang" },
            { name: "Taling Chan" },
            { name: "Thawi Watthana" },
            { name: "Thon Buri" },
            { name: "Thung Khru" },
            { name: "Wang Thonglang"},
            { name: "Watthana" },
            { name: "Yan Nawa" }
          ],
          period: '',
          periodState: [{pvalue:1, ptext:"1 month"},{pvalue:3, ptext:"3 month"},{pvalue:6, ptext:"6 month"},{pvalue:12, ptext:"12 month"}],
          operation:'',
          operationState:["increase","decrease","equal"],
          amount:'',
          con:'',
          condition:'',
          conditionState: ["less than","more than","equal"],
          
    },
    editRuleForm:{
    }
    }
  },
  methods: {
    getRules() {
      const path = 'http://0.0.0.0:4000/rules';
      axios.get(path)
        .then((res) => {
          this.rules = res.data.rules;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
        });
    },
    addRule(payload) {
      const path = 'http://0.0.0.0:4000/rules';
      // this.rules.push(payload);
      axios.post(path, payload)
        .then(() => {
          this.getRules();
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
          this.getRules();
        });
    },
    editRule(rule) {
      this.editRuleForm._id = rule._id;
      this.editRuleForm.value = rule.value;
      this.editRuleForm.type = rule.type;
      var d = []
      for(var i = 0; i < rule.district.length; i++){
        d.push({'name': rule.district[i]})
      }
      this.editRuleForm.district = d;
      this.editRuleForm.period = { "ptext": rule.period + " month" , "pvalue": rule.period } ;
      this.editRuleForm.operation = rule.operation;
      this.editRuleForm.condition = rule.condition;
      this.editRuleForm.amount = rule.amount;
    },
    updateRule(payload) {
      const path = 'http://0.0.0.0:4000/rules';
      console.log(payload)
      axios.put(path, payload)
        .then(() => {
          this.getRules();
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
          this.getRules();
        });
    },
    removeRule(ruleID) {
      const path = `http://0.0.0.0:4000/rules/${ruleID}`;
      axios.delete(path)
        .then(() => {
          this.getRules();
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
          this.getRules();
        });
    },
    onDeleteRule(rule) {
      this.removeRule(rule._id);
    },
    initForm() {
      this.addRuleForm.value = '';
      this.addRuleForm.type = '';
      this.addRuleForm.district = '';
      this.addRuleForm.period = '';
      this.addRuleForm.operation = '';
      this.addRuleForm.condition = '';
      this.addRuleForm.amount = '';

      this.editRuleForm.id = '';
      this.editRuleForm.value = '';
      this.editRuleForm.type = '';
      this.editRuleForm.district = '';
      this.editRuleForm.period = '';
      this.editRuleForm.operation = '';
      this.editRuleForm.condition = '';
      this.editRuleForm.amount = '';
    
    },

    onSubmit(evt) {
      evt.preventDefault();
      this.$refs.addRuleModal.hide();
      const payload = {
        value: this.addRuleForm.value ,
        type: this.addRuleForm.type,
        district: this.addRuleForm.district,
        period: this.addRuleForm.period ,
        operation: this.addRuleForm.operation,
        condition: this.addRuleForm.condition,
        amount: this.addRuleForm.amount
      };
      this.addRule(payload);
      this.initForm();
    },

    onSubmitUpdate(evt) {
      evt.preventDefault();
      this.$refs.editRuleModal.hide();
      const payload = {
        _id: this.editRuleForm._id,
        value: this.editRuleForm.value ,
        type: this.editRuleForm.type,
        district: this.editRuleForm.district,
        period: this.editRuleForm.period ,
        operation: this.editRuleForm.operation,
        condition: this.editRuleForm.condition,
        amount: this.editRuleForm.amount,
      };
      this.updateRule(payload, this.editRuleForm.id);
    },
    onReset(evt) {
      evt.preventDefault();
      this.$refs.addRuleModal.hide();
      this.initForm();
    },
    onResetUpdate(evt) {
      evt.preventDefault();
      this.$refs.editRuleModal.hide();
      this.initForm();
    }
  },
  created() {
    this.getRules();
  },
};
</script>