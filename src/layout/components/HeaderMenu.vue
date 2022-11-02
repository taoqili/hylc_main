<template>
  <div class="header-wrapper">
    <el-menu mode="horizontal" :default-active="defaultActive" ref="topMenus"	>
      <el-menu-item :class=" '_'+ menu.key" v-for="menu in menus" :key="menu.key" :index="menu.key" @click="open(menu)" >
        <img :src="menu.icon" width="20" alt="" v-if="!!menu.icon" style="margin-right: 4px" />
        <span>{{menu.title}}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
  import {
    getTopMenuKeyByPath,
    createMicroApp,
    hasRoutePermission,
    getSideMenuByKey,
    getSideMenuByPath
  } from "@/utils";

export default {
  name: "HeaderMenu",
  props: {
    menus: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      defaultActive: '',
      lastActive: ''
    }
  },
  mounted() {
    const defaultActive = getTopMenuKeyByPath(this.$route.path)
    this.defaultActive = defaultActive
    this.lastActive = defaultActive
  },
  methods: {
    open(page) {
      const { key, defaultPath } = page
      let sideMenu
      if (defaultPath) {
        sideMenu = getSideMenuByPath(defaultPath)
      } else {
        sideMenu = getSideMenuByKey(key)
      }
      if (!sideMenu) {
        this.$router.replace('/404')
        return
      }
      if (!hasRoutePermission(sideMenu.path)) {
        this.$message({type: 'error', message: '您暂无访问权限，请联系管理员后再试！', offset: 87, duration: 1500})
        setTimeout(() => {
          this.$refs.topMenus.updateActiveIndex(this.lastActive)
        }, 1500)
        return
      }
      createMicroApp(sideMenu.path).then(res => {
        this.lastActive = key
        this.$tabs.openTab({
          title: sideMenu.title,
          path: defaultPath || sideMenu.path,
          query: sideMenu.query
        })
      })
    }
  },
  watch: {
    '$route': {
      handler() {
        const defaultActive = getTopMenuKeyByPath(this.$route.path)
        this.defaultActive = defaultActive
        this.lastActive = defaultActive
      }
    }
  }
}
</script>

<style lang="less">
  .header-wrapper {
    .el-menu-item {
      font-weight: 600;
      font-family: PingFangSC-Regular, PingFang SC;
      padding: 0 16px;
      text-align: center;
      width: 120px;
      &.is-active,
      &:not(.is-disabled):focus,
      &:not(.is-disabled):hover {
        color: #409EFF;
      }

    }
  }
</style>
