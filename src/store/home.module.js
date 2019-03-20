import {TagsService, ArticlesService} from '../common/api.service'
import {FETCH_ARTICLES, FETCH_TAGS} from './actions.type'
import {FETCH_START, FETCH_END, SET_TAGS, UPDATE_ARTICLE_IN_LIST} from './mutations.type'

const state = {
  tags: [],
  articles: [],
  isLoading: true,
  articlesCount: 0
}

const getters = {
  articlesCount (state) {
    return state.aritclesCount
  },
  articles (state) {
    return state.articles
  },
  isLoading (state) {
    return state.isLoading
  },
  tags (state) {
    return state.tags
  }
}

const actions = {
  [FETCH_ARTICLES] ({commit}, params) {
    commit(FETCH_START)
    return ArticlesService.query(params.stype, params.filters)
      .then(({data}) => {
        commit(FETCH_END, data)
      })
      .catch(error => {
        throw new Error(error)
      })
  },
  [FETCH_TAGS] ({commit}) {
    return TagsService.get()
      .then(({data}) => {
        commit(SET_TAGS, data.tags)
      })
      .catch(error => {
        throw new Error(error)
      })
  }
}

const mutations = {
  [FETCH_START](state) {
    state.isLoading = true
  }
}
