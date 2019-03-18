<template>
  <div id="app">
    <DmHeader></DmHeader>
    <router-view></router-view>
    <DmFooter></DmFooter>
  </div>
</template>

<script>
import DmHeader from '@/components/TheHeader'
import DmFooter from '@/components/TheFooter'

export default {
  name: 'App',
  components: {
    DmHeader,
    DmFooter
  }
}
</script>

<style>

</style>
