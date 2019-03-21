import Vue from 'vue'
import Vuex from 'vuex'

import auth from './auth.module'
import article from './article.module'
import profile from './profile.module'
import home from './home.module'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    article,
    profile,
    home
  }
})
