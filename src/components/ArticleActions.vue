<template>
  <span v-if="canModify">
    <router-link
      class="btn btn-sm btn-outline-secondary"
      :to="{name: 'article-edit', params: {slug: this.article.slug}}"
      >
        <i class="ion-edit"></i><span>Edit Article</span>
    </router-link>
    <span>&nbsp;&nbsp;</span>
    <button class="btn btn-outline-danger btn-sm" @click="deleteArticle">
      <i class="ion-trash-a"></i><span>Delete Article</span>
    </button>
  </span>
  <span v-else>
      <button class="btn btn-sm btn-outline-secondary" @click="toggleFollow">
        <i class="ion-plus-roud"></i><span>&nbsp;</span>
        <span
          >{{ }}</span>
      </button>
  </span>

</template>

<script>
import {mapGetters} from 'vuex'
import {
  FAVORITE_ADD,
  FAVORITE_REMOVE,
  ARTICLE_DELETE,
  FETCH_PROFILE_FOLLOW,
  FETCH_PROFILE_UNFOLLOW
} from '@/store/actions.type'

export default {
  name: 'DmArticleActions',
  props: {
    article: {type: Object, required: true},
    canModify: {type: Object, required: true}
  },
  computed: {
    ...mapGetters(['profile', 'isAuthenticated'])
  },
  methods: {
    toggleFavorite () {
      if (!this.isAuthenticated) {
        this.$router.push({name: 'login'})
        return
      }
      const action = this.article.favorited ? FAVORITE_REMOVE : FAVORITE_ADD
      this.$store.dispatch(action, this.article.slug)
    },
    toggleFollow () {
      if (!this.isAuthenticated) {
        this.$router.push({name: 'login'})
        return
      }
      const action = this.article.following ? FETCH_PROFILE_UNFOLLOW : FETCH_PROFILE_FOLLOW
      this.$store.dispatch(action, {username: this.profile.username})
    },
    async deleteArticle () {
      try {
        await this.$store.dispatch(ARTICLE_DELETE, this.article.slug)
        this.$router.push('/')
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style scoped>

</style>
