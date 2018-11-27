import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

//Create a state that holds all necessary data.
const state = {

  //testing
  currentUser: null,
  currentChannel: null
};

//update state data through mutations
const mutations = {
  SET_USER(state, user) {
    state.currentUser = user;
  },
  SET_CURRENT_CHANNEL(state, channel) {
    state.currentChannel = channel;
  }
};

//create actions for mutations with necessary data.
const actions = {
 /* setUser({commit}, user) { //object destructuring
    commit('SET_USER', user)
  }*/
  setUser(state, user) {
    state.commit('SET_USER', user)
  },

  setCurrentChannel({commit}, channel) {
    commit('SET_CURRENT_CHANNEL', channel);
  }

};


//get data from state with getters.
const getters = {

  currentUser: state => state.currentUser,
  currentChannel: state => state.currentChannel

};

//create vuex store
const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
});

export default store

