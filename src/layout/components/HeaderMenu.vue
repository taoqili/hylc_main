<template>
  <el-menu mode="horizontal" :default-active="defaultActive"	>
    <el-menu-item v-for="menu in menus" :key="menu.key" :index="menu.key" @click="open(menu)" >{{menu.title}}</el-menu-item>
  </el-menu>
</template>
<script>
  import { createMicroApp, isMicroApp, sideMenus } from "@/config";

export default {
  name: "",
  props: {
    menus: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      defaultActive: ''
    }
  },
  mounted() {
    this.defaultActive = this.getDefaultTopMenu()
  },
  methods: {
    open(page) {
      const { key, path } = page
      const menus = sideMenus[key] || []
      if (!path && !menus.length) {
        this.$router.push('/404')
      }
      const menu = menus[0]
      createMicroApp(menu.path).then(res => {
        this.$tabs.openTab({
          title: menu.title,
          path: menu.path,
          query: menu.query
        })
      })
    },
    getDefaultTopMenu() {
      const { path } = this.$route
      const key = path.split('/')[isMicroApp(path) ? 2 : 1]
      return key || 'home'
    }
  },
  watch: {
    '$route': {
      handler() {
        this.defaultActive = this.getDefaultTopMenu()
      }
    }
  }
}
</script>

<style scoped>

</style>
