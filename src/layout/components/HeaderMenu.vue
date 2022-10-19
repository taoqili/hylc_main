<template>
  <div class="header-wrapper">
    <el-menu mode="horizontal" :default-active="defaultActive"	>
      <el-menu-item v-for="menu in menus" :key="menu.key" :index="menu.key" @click="open(menu)" >
        <img :src="menu.icon" width="20" alt="" v-if="!!menu.icon" style="margin-right: 4px" />
        <span>{{menu.title}}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
  import { createMicroApp, isMicroApp, sideMenus } from "@/config";
  import { getTopMenuKey } from "@/utils/tools";

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
      defaultActive: ''
    }
  },
  mounted() {
    this.defaultActive = getTopMenuKey(this.$route.path) //this.getTopMenu()
  },
  methods: {
    open(page) {
      const { key, path } = page
      const sMenus = sideMenus[key] || []
      if (!path && !sMenus.length) {
        this.$router.push('/404')
      }
      let menu = sMenus[0]
      if (menu.children && menu.children.length) {
        menu = menu.children[0]
      }
      createMicroApp(menu.path).then(res => {
        this.$tabs.openTab({
          title: menu.title,
          path: menu.path,
          query: menu.query
        })
      })
    }
  },
  watch: {
    '$route': {
      handler() {
        this.defaultActive = getTopMenuKey(this.$route.path) // this.getTopMenu()
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
    }
  }
</style>
