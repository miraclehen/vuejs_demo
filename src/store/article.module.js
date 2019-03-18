import Vue from 'vue'
import {
  ArticlesService,
  CommentsService,
  FavoriteService
} from '../common/api.service'
import {
  FETCH_ARTICLE,
  FETCH_COMMENTS,
  COMMENT_CREATE,
  COMMENT_DESTROY,
  FAVORITE_ADD,
  FAVORITE_REMOVE,
  ARTICLE_PUBLISH,
  ARTICLE_EDIT,
  ARTICLE_EDIT_ADD_TAG,
  ARTICLE_DELETE,
  ARTICLE_RESET_STATE
} from './actions.type'
import {
  RESET_STATE,
  SET_ARTICLE,
  SET_COMMENTS,
  TAG_ADD,
  TAG_REMOVE,
  UPDATE_ARTICLE_IN_LIST
} from './mutations.type'

const initialState = {
  article: {
    author: {},
    title: '',
    description: '',
    body: '',
    tagList: []
  },
  comments: []
}

export const state = {...initialState}

export const actions = {
  async [FETCH_ARTICLE] (context, articleSlug, prevArticle) {
    if (prevArticle !== undefined) {
      return context.commit(SET_ARTICLE, prevArticle)
    }
    const {data} = await ArticlesService.get(articleSlug)
    context.commit(SET_ARTICLE, data.article)
    return data
  }
}
