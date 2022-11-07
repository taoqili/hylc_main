<template>
  <div id="app">
    <template v-if="!!$route.meta?.single">
      <router-view/>
    </template>
    <template v-else>
      <Layout></Layout>
    </template>
  </div>
</template>
<script>
  import Layout from '@/layout'
  import { createMicroApp } from '@/utils'
  import { globalState } from '@/config'

  export default {
    components: {
      Layout
    },
    data() {
      return {}
    },
    created() {
      createMicroApp(location.pathname)
      globalState.onGlobalStateChange((state, prev) => {
        let {historyAction, loadMicroApp, openTab} = state
        this.$tabs.activeTabHistoryAction[historyAction]()
      })
    }
  }
</script>
<style lang="less">
  #app {
    font-family: "Microsoft YaHei", Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>
