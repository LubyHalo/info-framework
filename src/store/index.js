import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import tabs from './modules/tabs'
import dialog from './modules/dialog'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    tabs,
    dialog
  },
  getters
})

export default store
