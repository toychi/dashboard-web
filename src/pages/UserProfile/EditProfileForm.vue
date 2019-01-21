<template>
  <card class="card" title="Edit Profile">
     
    <div>
      <form @submit.prevent>
        <div class="row">
         
          <div class="col-md-12">

            <fg-input type="text"
                      label="Username"
                      placeholder="Username"
                      v-model="user.username">
            </fg-input>

        <div class="row">
          <div class="col-md-6">
            <fg-input type="text"
                      label="First Name"
                      placeholder="First Name"
                      v-model="user.firstName">
            </fg-input>
          </div>
          <div class="col-md-6">
            <fg-input type="text"
                      label="Last Name"
                      placeholder="Last Name"
                      v-model="user.lastName">
            </fg-input>
          </div>
        </div>
        

       <div class="row">
          <div class="col-md-6">
            <fg-input type="email"
                      label="E-mail"
                      placeholder="E-mail"
                      v-model="user.email">
            </fg-input>
          </div>
        </div>

        
          <div class="col-md-6">
            <fg-input type="password"
                      label="Password"
                      placeholder="password"
                      v-model="user.password">
            </fg-input>
          </div>
          </div>
        </div>

        

        <div class="text-center">
          <p-button type="info"
                    round
                    @click.native.prevent="updateProfile">
            Update Profile
          </p-button>
        </div>
        <div class="clearfix"></div>
      </form>
    </div>
  </card>
</template>
<script>
export default {
  data() {
    return {
      user: {
        
        username: "",
        email: "",
        lastName: ""
      }
    };
  },
  methods: {
    updateProfile() {
      alert("Your data: " + JSON.stringify(this.user));
    }
  }
};
</script>
<style>
</style>
