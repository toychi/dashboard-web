// store/index.js

import Vue from "vue";
import Vuex from "vuex";

// imports of AJAX functions will go here
import { authenticate, register } from "@/api";
import { isValidJwt, EventBus } from "@/utils";

Vue.use(Vuex);

const state = {
  // single source of data
  surveys: [],
  currentSurvey: {},
  user: {},
  jwt: ""
};

const actions = {
  // asynchronous operations

  //
  // omitting the other action methods...
  //

  login(context, userData) {
    context.commit("setUserData", { userData });
    return authenticate(userData)
      .then(response => context.commit("setJwtToken", { jwt: response.data }))
      .catch(error => {
        console.log("Error Authenticating: ", error);
        EventBus.$emit("failedAuthentication", error);
      });
  },
  register(context, userData) {
    context.commit("setUserData", { userData });
    return register(userData)
      .then(context.dispatch("login", userData))
      .catch(error => {
        console.log("Error Registering: ", error);
        EventBus.$emit("failedRegistering: ", error);
      });
  },
  submitNewSurvey(context, survey) {
    return postNewSurvey(survey, context.state.jwt.token);
  },
  logout(context) {
      context.commit("deleteJwtToken");
  }
};

const mutations = {
  // isolated data mutations

  //
  // omitting the other mutation methods...
  //

  setUserData(state, payload) {
    console.log("setUserData payload = ", payload);
    state.userData = payload.userData;
  },
  setJwtToken(state, payload) {
    console.log("setJwtToken payload = ", payload);
    localStorage.token = payload.jwt.data.token;
    state.jwt = payload.jwt.data;
  },
  deleteJwtToken(state) {
    state.jwt = "";
    localStorage.token = "";
  }
};

const getters = {
  // reusable data accessors
  isAuthenticated(state) {
    if(state.jwt.token) {
        return isValidJwt(state.jwt.token);
    } else {
        return isValidJwt(localStorage.token);
    }
  }
};

const store = new Vuex.Store({
    state,
    actions,
    mutations,
    getters
  })
  
  export default store