<template>
  <div class="home-tag">
    <div class="home-tag">
      <article-list :tag="tag"></article-list>
    </div>
  </div>
</template>

<script>
import ArticleList from '../components/ArticleList'

export default {
  name: 'HomeTag',
  components: {
    ArticleList
  },
  computed: {
    tag () {
      return this.$route.params.tag
    }
  }
}
</script>

<style scoped>

</style>
