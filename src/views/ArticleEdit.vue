<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
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
