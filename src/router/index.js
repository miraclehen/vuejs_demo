import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Login from '../views/Login'
// import Register from '@/views/Register'
import Home from '../views/Home'
import Settings from '../views/Settings'
import ArticleEdit from '../views/ArticleEdit'
import Profile from '../views/Profile'
import HomeGlobal from '../views/HomeGlobal'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Home,
      children: [
        {
          path: '',
          name: 'home',
          component: HomeGlobal
        }
      ]
    },
    {
      name: 'login',
      path: '/login',
      component: Login
    },
    {
      name: 'settings',
      path: '/settings',
      component: Settings
    },
    {
      name: 'article-edit',
      path: '/editor/:slug?',
      component: ArticleEdit
    },
    {
      path: '/@:username',
      component: Profile
    }
  ]
})
