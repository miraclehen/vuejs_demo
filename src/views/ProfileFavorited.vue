<template>
  <div class="profile-page">
    <article-list :favorited="favorited" :items-per-page="5"></article-list>
  </div>
</template>

<script>
import ArticleList from '../components/ArticleList'

export default {
  name: 'ProfileFavorited',
  components: {
    ArticleList
  },
  computed: {
    favorited () {
      return this.$route.params.username
    }
  }
}
</script>

<style scoped>

</style>
