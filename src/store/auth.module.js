import ApiService from '@/common/api.service'
import JwtService from '@/common/jwt.service'
import {
  LOGIN,
  LOGOUT,
  REGISTER,
  CHECK_AUTH,
  UPDATE_USER
} from '@/store/actions.type'

import {
  SET_AUTH,
  PURGE_AUTH,
  SET_ERROR
} from '@/store/mutations.type'

const state = {
  errors: null,
  user: {},
  isAuthenticated: !!JwtService.getToken()
}

const getters = {
  currentUser (state) {
    return state.user
  },
  isAuthenticated (state) {
    return state.isAuthenticated
  }
}

const actions = {
  [LOGIN] (context, credentials) {
    return new Promise(resolve => {
      ApiService.post('users/login', {user: credentials})
        .then(({data}) => {
          context.commit(SET_AUTH, data.user)
          resolve(data)
        })
        .catch(({response}) => {
          context.commit(SET_ERROR, response.data.errors)
        })
    })
  },
  [LOGOUT] (context) {
    context.commit(PURGE_AUTH)
  },
  [REGISTER] (context, credentials) {
    return new Promise(resolve => {
      ApiService.post('users', {user: credentials})
        .then(({data}) => {
          context.commit(SET_AUTH, data.user)
        })
        .catch(({response}) => {
          context.commit(SET_ERROR, response.data.errors)
        })
    })
  },
  [CHECK_AUTH] (context) {
    if (JwtService.getToken()) {
      ApiService.setHeader()
      ApiService.get('user')
        .then(({data}) => {
          context.commit(SET_AUTH, data.user)
        })
        .catch(({data}) => {
          context.commit(SET_ERROR, data.data.errors)
        })
    } else {
      context.commit(PURGE_AUTH)
    }
  },
  [UPDATE_USER] (context, payload) {
    const {email, username, password, image, bio} = payload
    const user = {
      email,
      username,
      image,
      bio
    }
    if (password) {
      user.password = password
    }

    return ApiService.put('user', user).then(data => {
      context.commit(SET_AUTH, data.user)
      return data
    })
  }
}

const mutations = {
  [SET_ERROR] (state, errors) {
    state.errors = errors
  },
  [SET_AUTH] (state, user) {
    state.isAuthenticated = true
    state.user = user
    state.errors = {}
    JwtService.saveToken(state.user.token)
  },
  [PURGE_AUTH] (state) {
    state.isAuthenticated = false
    state.user = {}
    state.errors = {}
    JwtService.destroyToken()
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
