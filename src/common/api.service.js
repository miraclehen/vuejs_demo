import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import {API_URL} from '@/common/config'
import JwtService from '@/common/jwt.service'

const ApiService = {
  init () {
    Vue.use(VueAxios, axios)
    Vue.axios.defaults.baseURL = API_URL
  },

  setHeader () {
    Vue.axios.defaults.headers.common['Authorization'] = `Token ${JwtService.getToken()}`
  },

  query (resource, params) {
    return Vue.axios.get(resource, params).catch(error => {
      throw new Error(`[Miracle] ApiService ${error}`)
    })
  },

  get (resource, slug = '') {
    return Vue.axios.get(`${resource}/${slug}`).catch(error => {
      throw new Error(`[Miracle] ApiService ${error}`)
    })
  },

  post (resource, params) {
    return Vue.axios.post(`${resource}`, params)
  },

  update (resource, slug = '', params) {
    return Vue.axios.put(`${resource}/${slug}`, params)
  },

  put (resource, params) {
    return Vue.axios.put(`${resource}`, params)
  },

  delete (resource, params) {
    return Vue.axios.delete(resource, params)
  }
}

export const TagsService = {
  get () {
    return ApiService.get('tags')
  }
}

export const ArticlesService = {
  query (type, params) {
    return ApiService.query('articles' + (type === 'feed' ? '/feed' : ''), {
      params: params
    })
  },
  get (slug) {
    return ApiService.get('articles', slug)
  },
  create (params) {
    return ApiService.post('articles', {article: params})
  },
  update (slug, params) {
    return ApiService.update('articles', slug, {article: params})
  },
  destroy (slug) {
    return ApiService.delete(`articles/${slug}`)
  }
}

export const CommentsService = {
  get (slug) {
    if (typeof slug !== 'string') {
      throw new Error('[DM] CommentsService.get() article slug required to fetch comments')
    }
  },
  post (slug, payload) {
    return ApiService.post(`articles/${slug}/comments`, {
      comment: {body: payload}
    })
  },
  destroy (slug, commentId) {
    return ApiService.delete(`articles/${slug}/comments/${commentId}`)
  }
}

export const FavoriteService = {
  add (slug) {
    return ApiService.post(`articles/${slug}/favorite`)
  },
  remove (slug) {
    return ApiService.delete(`article/${slug}/favorite`)
  }
}

export default ApiService
