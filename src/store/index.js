import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    username:"",
    only_read:"",
  },
  mutations: {
    //设置username
    setUserName(state, username){
      state.username = username;
    },
    //设置only_read
    setOnlyRead(state, only_read){
      state.only_read = only_read;
    }
  },
  actions: {
    
  }
});
export default store;
