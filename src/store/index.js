import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutation'
import * as actions from './action'
import * as getters from './getter'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
