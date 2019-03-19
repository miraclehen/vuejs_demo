<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <DmListErrors :errors="errors"/>
          <form v-on:submit.prevent="onPublish(article.slug);">
            <fieldset :disabledd="inProgress">
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  v-model="article.title"
                  placeholder="Article Title"/>
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  v-model="article.description"
                  placeholder="What's this article about?"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control"
                  rows="8"
                  v-model="article.body"
                  placeholder="Write your article (int markdown)"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter tags"
                  v-model="tagInput"
                  v-on:keypress.enter.prevent="addTag(tagInput);"
                />
                <div class="tag-list">
                  <span class="tag-default tag-pill"
                        v-for="(tag, index) of article.tagList"
                        :key="tag + index"
                  >
                    <i class="ion-close-round" v-on:click="removeTag(tag);">
                    </i>
                    {{ tag }}
                  </span>
                </div>
              </fieldset>
            </fieldset>
            <button
              :disabled="inProgress"
              class="btn btn-lg pull-xs-right btn-primary"
              type="submit">
              Publish Article
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import store from '@/store'
import DmListErrors from '@/components/ListErrors'
import {
  ARTICLE_PUBLISH,
  ARTICLE_EDIT,
  ARTICLE_EDIT_ADD_TAG,
  ARTICLE_EDIT_REMOVE_TAG,
  ARTICLE_RESET_STATE,
  FETCH_ARTICLE
} from '../store/actions.type'

export default {
  name: 'DmArticleEdit',
  components: {DmListErrors},
  props: {
    previousArticle: {
      type: Object,
      required: false
    }
  },
  async beforeRouteUpdate (to, from, next) {
    await store.dispatch(ARTICLE_RESET_STATE)
    return next()
  },
  async beforeRouteEnter (to, from, next) {
    await store.dispatch(ARTICLE_RESET_STATE)
    if (to.params.slug !== undefined) {
      await store.dispatch(
        FETCH_ARTICLE,
        to.params.slug,
        to.params.previousArticle
      )
    }
    return next()
  },
  async beforeRouteLeave (to, from, next) {
    await store.dispatch(ARTICLE_RESET_STATE)
    next()
  },
  data () {
    return {
      tagInput: null,
      inProgress: false,
      errors: {}
    }
  },
  computed: {
    ...mapGetters(['article'])
  },
  methods: {
    onPublish (slug) {
      let action = slug ? ARTICLE_EDIT : ARTICLE_PUBLISH
      this.inProgress = true
      this.$store
        .dispatch(action)
        .then(({data}) => {
          this.inProgress = false
          this.$router.push({
            name: 'article',
            params: {slug: data.article.slug}
          })
        })
        .catch(({response}) => {
          this.inProgress = false
          this.errors = response.data.errors
        })
    },
    removeTag (tag) {
      this.$store.dispatch(ARTICLE_EDIT_REMOVE_TAG, tag)
    },
    addTag (tag) {
      this.$store.dispatch(ARTICLE_EDIT_ADD_TAG, tag)
    }
  }

}
</script>

<style scoped>

</style>
