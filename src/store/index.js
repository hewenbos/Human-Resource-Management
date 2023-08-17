import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import routers from './modules/routers'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    settings,
    app,
    routers
  },
  getters
})

export default store
