<template>
  <div class="wrapper">
    <Header :menus="tMenus"></Header>
    <tab-bar></tab-bar>
    <div class="content">
      <div class="side-bar" v-show="sMenus.length > 1 && showSideBar">
        <side-bar :menus="sMenus" :hideProductSelector="hideProductSelector" :hideDatePicker="hideDatePicker" />
      </div>
      <div class="main">
        <div class="breadcrumb" v-if="breadcrumb.length && showBreadcrumb">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item v-for="i in breadcrumb" :key="i.key" :to="{ path: i.path }">{{i.title}}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>

        <template v-show="!isMicroApp">
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </template>

        <template v-show="isMicroApp">
          <div v-for="item in microAppList" :id="item.id" :key="item.id" v-show="isMicroApp"/>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
  import Header from "@/layout/components/Header";
  import TabBar from "@/layout/components/TabBar";
  import SideBar from "@/layout/components/SideBar";
  import { isMicroApp, microAppList, sideMenus, topMenus, showBreadcrumb } from "@/config";

  export default {
    name: "Layout",
    components: {
      Header,
      TabBar,
      SideBar
    },
    data() {
      return {
        microAppList,
        tMenus: topMenus || [],
        sMenus: [],
        hideProductSelector: false,
        hideDatePicker: false,
        showSideBar: true,
        showBreadcrumb
      };
    },
    mounted() {
      this.initSideBar()
    },
    computed: {
      isMicroApp() {
        return isMicroApp(this.$route.path);
      },
      breadcrumb() {
        const topKey = this.getTopMenuKey()
        const sideMenus = this.getSideMenus()
        if (!topKey || topKey === 'home' || !sideMenus.length) {
          return []
        }
        const { title, defaultPath } = topMenus.find(item => item.key === topKey) || {}
        const result = [
          {
            key: 'hylc_bap',
            title: '首页',
            path: '/home'
          },
          {
            key: topKey,
            title,
            path: defaultPath || sideMenus[0].path
          }
        ]
        const sideKey = this.getSideMenuKey()
        const sideMenu = sideMenus.find(item => item.key === sideKey)
        if (!sideMenu) {
          return result
        }
        result.push({
          key: sideKey,
          title: sideMenu.title || document.title || '',
          path: sideMenu.path
        })
        return result
      }
    },
    watch: {
      '$store.state.sideBarIsOpen': {
        handler(value) {
          this.showSideBar = value
        }
      },
      '$route': {
        handler() {
          this.initSideBar()
        }
      }
    },
    methods: {
      getTopMenuKey() {
        const { path } = this.$route
        return path.split('/')[isMicroApp(path) ? 2 : 1]
      },
      getSideMenuKey() {
        const { path } = this.$route
        return  path.split('/')[isMicroApp(path) ? 3 : 2]
      },
      getSideMenus() {
        const key = this.getTopMenuKey()
        return sideMenus[key] || []
      },
      getTopMenu(menus = [], key) {
        return menus.find(item => item.key === key)
      },
      initSideBar() {
        this.sMenus = this.getSideMenus()
        const topKey = this.getTopMenuKey()
        const { hideProductSelector, hideDatePicker } = this.getTopMenu(topMenus, topKey) || {}
        this.hideProductSelector = hideProductSelector
        this.hideDatePicker = hideDatePicker
      }
    }
  };
</script>

<style lang="less" scoped>
  .wrapper {
    .content {
      display: flex;
      justify-content: space-between;
      padding: 16px;
      background: #f0f2f5;
      .side-bar {
        width: 220px;
        min-width: 220px;
      }
      .main {
        flex: 1;
        .breadcrumb {
          padding-bottom: 10px;
        }
      }
    }
  }
</style>
