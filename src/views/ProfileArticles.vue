<template>
  <div class="profile-page">
    <article-list :author="author" :items-per-page="5"></article-list>
  </div>
</template>

<script>
import ArticleList from '../components/ArticleList'

export default {
  name: 'ProfileArticles',
  components: {
    ArticleList
  },
  computed: {
    author () {
      return this.$route.params.username
    }
  }
}
</script>

<style scoped>

</style>
