<template>
  <div>
    <b-button v-b-modal.modal-prevent-closing>+ Add a notification rule</b-button>
    
    <div>
      <!-- <b-table :fields="fields"></b-table> -->
      <b-table :items="rule">

        <!-- <template slot="Edit" slot-scope="row">
          <b-button v-b-modal.modalEdit>Edit</b-button>
          <b-modal
            id="modalEdit"
            ref="modalE"
            title="Edit"
            @show="resetEdit"
            @hidden="resetEdit"
            @ok="handleEdit">

              <form ref="form" @submit.stop.prevent="handleEdit">
                <b-form-group :state="NumE" label="NumberE" label-for="NumE-input" invalid-feedback="New Number is required">
                  <b-form-input id="NumE-input" v-model="NumE" :state="NumEState" required></b-form-input>
                </b-form-group>
              </form>
          </b-modal>

        </template> -->

      </b-table>
    </div>

    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      title="Add a rule"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <label class="typo__label">Value</label>
        <multiselect v-model="Value" :options="ValueState" placeholder="Select a focused value"></multiselect>
        <pre class="language-json"><code>{{ Value }}</code></pre>
        <!-- <div v-if="Value = ">
          
        </div> -->
      
        <!-- Type Selection -->
        <label class="typo__label">Type</label> 
        <multiselect v-model="Type" :options="TypeState" placeholder="Select type"></multiselect>
        <pre class="language-json"><code>{{ Type }}</code></pre>

        <label class="typo__label">District</label>
        <multiselect v-model="District" placeholder="Which district " label="dtext" track-by="dvalue" :options="DistrictState" :multiple="true" :taggable="true" @tag="addDistrict"></multiselect>
        <pre class="language-json"><code>{{ District }}</code></pre>

        <label class="typo__label">Period</label> 
        <multiselect v-model="StartYear" :options="StartYearState" placeholder="Select period" label="ptext"></multiselect>
        <pre class="language-json"><code>{{ StartYear }}</code></pre>

        <label class="typo__label">Operation</label> 
        <multiselect v-model="Operation" :options="OperationState" placeholder="Select operation" label="optext"></multiselect>
        <pre class="language-json"><code>{{ Operation }}</code></pre>
      </form>
    </b-modal>
  </div>
</template>

<script>
  import Multiselect from 'vue-multiselect'
  export default {
    components: {
      Multiselect
    },
    data() {
      return {
        Value:'',
        // ValueState: [{value:1, text: "Price to rent ratio"}, {value:2, text:"Rental Unit"},{value:3, text:"Selling unit"}],
        ValueState: ["Price to rent ratio","Rental Unit","Selling unit"],
        Type: '',
        // TypeState: [{value:1, text: "All"},{value:2, text: "Home"},{value:3, text: "Condo"}],
        TypeState: ["All","Home","Condo"],
        District: '',
        DistrictState: [{dvalue:1, dtext:"All"},{dvalue:2, dtext: "Bangbon"},{dvalue:1, dtext:"Bangna"}],
        StartYear: '',
        StartYearState: [{pvalue:1, ptext:"1 month"},{pvalue:3, ptext:"3 month"},{pvalue:6, ptext:"6 month"},{pvalue:12, ptext:"1 yaer"}],
        Operation:'',
        OperationState:[{opvalue:">", optext:"increase"},{opvalue:"<", optext:"decrease"},{opvalue:"=", optext:"equal"}],
        PC:'',
        PCState: null,
        submittedValue: [],
        submittedType: [],
        submittedDistrict: [],
        submittedStartYear: [],
        submittedEndYear: [],
        submittedOperation: [],
        submittedNum: [],
        rule: [],
        //fields: ['Value','Type', 'District', 'Start Year', 'End Year','With', 'Amount', 'Edit']
      }
    },

    methods:{
       resetModal() {
        Value = null
        ValueState = null
        Type = null
        TypeState = null
        District = null
        DistrictState = null
        StartYear = null
        StartYearState = null
        Operation = null
        OperationState = null
        PC = null
        PCState = null
        submittedValue = null
        submittedType = null
        submittedDistrict = null
        submittedStartYear = null
        submittedEndYear = null
        submittedOperation = null
        submittedNum = null
      },
      checkFormValidity() {
        const valid = this.$ref.modal.checkValidity()
        this.TypeState = valid ? 'valid' : 'invalid'
        return valid
      },
      handleOk(bvModalEvt) {
        // Prevent modal from closing
        bvModalEvt.preventDefault()
        // Trigger submit handler
        this.handleSubmit()
      },
      handleSubmit() {
        // Exit when the form isn't valid
        if (!this.checkFormValidity()) {
          return "Fail"
        }
        // this.submittedType.push(this.Value)
        // this.submittedType.push(this.Type)
        // this.submittedDistrict.push(this.District)
        // this.submittedStartYear.push(this.StartYear)
        // // this.submittedEndYear.push(this.EndYear)
        // this.submittedEndYear.push(this.Operation)
        // this.submittedNumber.push(this.Num)
        // this.rule.push({t: this.Type, d: this.District, s: this.StartYear, e: this.EndYear})
        // this.rule.push({value:this.Value, type: this.Type})
        // Hide the modal manually
        this.$nextTick(() => {
          this.rule.push({value:this.Value, type: this.Type, district: District})
          this.$refs.modal.hide()
         })
       }
    }
    // methods: {
    //   resetModal() {
    //     Value = ''
    //     ValueState = null
    //     Type = ''
    //     TypeState = null
    //     District = ''
    //     this.DistrictState = null
    //     this.StartYear = ''
    //     this.StartYearState = null
    //     // this.EndYear = ''
    //     // this.EndYearState = null
    //     this.Operation = ''
    //     this.OperationState = null
    //     this.PC = ''
    //     this.PCState = null
    //   },
    //   checkFormValidity() {
    //     const valid = this.$refs.form.checkValidity()
    //     this.TypeState = valid ? 'valid' : 'invalid'
    //     return valid
    //   },
    //   handleOk(bvModalEvt) {
    //     // Prevent modal from closing
    //     bvModalEvt.preventDefault()
    //     // Trigger submit handler
    //     this.handleSubmit()
    //   },
    //   handleSubmit() {
    //     // Exit when the form isn't valid
    //     if (!this.checkFormValidity()) {
    //       return "Fail"
    //     }
    //     // this.submittedType.push(this.Value)
    //     // this.submittedType.push(this.Type)
    //     // this.submittedDistrict.push(this.District)
    //     // this.submittedStartYear.push(this.StartYear)
    //     // // this.submittedEndYear.push(this.EndYear)
    //     // this.submittedEndYear.push(this.Operation)
    //     // this.submittedNumber.push(this.Num)
    //     // this.rule.push({t: this.Type, d: this.District, s: this.StartYear, e: this.EndYear})

    //     // Hide the modal manually
    //     this.$nextTick(() => {
    //       this.rule.push({value:this.Value, type: this.Type, district: this.District, period: this.StartYear, with: this.Operation,amount: this.PC, Edit:''})
    //       this.$refs.modal.hide()
    //     })
    //   }
    // }
  }
</script>