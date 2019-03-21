<template>
  <div class="article-preview">
    <dm-article-meta isPreview :article="article"/>
    <router-link :to="articleLink" class="preview-link">
      <h1 v-text="article.title"></h1>
      <p v-text="article.description"></p>
      <span>Read more...</span>
    </router-link>
  </div>

</template>

<script>
import DmArticleMeta from './ArticleMeta'

export default {
  name: 'DmArticlePreview',
  components: {
    DmArticleMeta
  },
  props: {
    article: {type: Object, required: true}
  },
  computed: {
    articleLink () {
      return {
        name: 'article',
        params: {
          slug: this.article.slug
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
