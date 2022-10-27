<template>
  <div class="wrapper">
    <div style="position: fixed; width: 100%; z-index: 9999">
      <Header :menus="tMenus"></Header>
      <tab-bar></tab-bar>
    </div>
    <div class="content" style="padding-top: 104px">
      <div class="side-bar" v-show="hasSideBar">
        <side-bar :menus="sMenus" :hideProductSelector="hideProductSelector" :hideDatePicker="hideDatePicker" />
      </div>
      <div class="main" :style="{'padding-left': hasSideBar ? '220px' : '0px'}">
        <breadcrumb v-if="breadcrumb.length && showBreadcrumb" :data="breadcrumb" />
        <div class="loading" v-loading="showPageLoader && isMicroApp" :style="{'margin-left': `calc(50% - ${hasSideBar ? 130: 20}px)`}" />
        <template v-show="!isMicroApp">
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </template>

        <template v-show="isMicroApp">
          <div v-for="item in microAppList" class="hylc-micro-wrapper" :id="item.id" :key="item.id" v-show="isMicroApp" />
        </template>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import Header from "@/layout/components/Header";
  import TabBar from "@/layout/components/TabBar";
  import SideBar from "@/layout/components/SideBar";
  import Breadcrumb from "@/layout/components/Breadcrumb";
  import { microAppList, sideMenus, topMenus, showBreadcrumb } from "@/config";
  import { getSideMenu, getSideMenuKey, getTopMenu, getTopMenuKey, isMicroApp, createMicroApp } from "@/utils";

  export default {
    name: "Layout",
    components: {
      Header,
      TabBar,
      SideBar,
      Breadcrumb
    },
    data() {
      return {
        microAppList,
        tMenus: topMenus || [],
        sMenus: [],
        hideProductSelector: false,
        hideDatePicker: false,
        showBreadcrumb,
        searchParams: {}
      };
    },
    mounted() {
      this.initSideBar()
    },
    computed: {
      ...mapState({
        showPageLoader: state => state.pageLoaderIsShow,
        showSideBar: state => state.sideBarIsOpen
      }),
      hasSideBar() {
        return this.sMenus.length > 1 && this.showSideBar
      },
      isMicroApp() {
        return isMicroApp(this.$route.path);
      },
      breadcrumb() {
        const topKey = getTopMenuKey(this.$route.path)
        const sideMenus = this.getSideMenus(topKey)
        const topMenu = getTopMenu(topKey)
        if (topMenu.noBreadcrumb || sideMenus.length < 1) {
          return []
        }
        const { title, defaultPath } = topMenus.find(item => item.key === topKey) || {}
        const result = [
          {
            key: 'home',
            title: '首页',
          },
          {
            key: topKey,
            title,
            path: defaultPath || sideMenus[0].path
          }
        ]
        const sideKey = getSideMenuKey(this.$route.path)
        const sideMenu = getSideMenu(topKey, sideKey)
        if (!sideMenu) {
          return result
        }
        result.push({
          key: sideMenu.key,
          title: sideMenu.title || document.title || '',
          path: sideMenu.path
        })
        return result
      }
    },
    watch: {
      '$store.state.searchParams': {
        handler(value) {
          this.searchParams = value
        }
      },
      '$route': {
        handler() {
          this.initSideBar()
        }
      }
    },
    methods: {
      getSideMenus(topKey) {
        return sideMenus[topKey] || []
      },
      initSideBar() {
        const topKey = getTopMenuKey(this.$route.path)
        const sMenus = this.getSideMenus(topKey)
        const { hideProductSelector, hideDatePicker } = getTopMenu(topKey) || {}
        this.sMenus = sMenus
        this.hideProductSelector = hideProductSelector
        this.hideDatePicker = hideDatePicker
      },
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
    }
  };
</script>
<style lang="less">
  .hylc-micro-wrapper {
    > div {
      background: transparent !important;
    }
  }
</style>

<style lang="less" scoped>
  .wrapper {
    .content {
      display: flex;
      justify-content: space-between;
      padding: 16px;
      background: #f0f2f5;
      min-height: 100vh;
      .side-bar {
        width: 220px;
        min-width: 220px;
        position: fixed;
        z-index: 999;
      }
      .main {
        position: relative;
        padding-left: 220px;
        flex: 1;
        .hylc-breadcrumb {
          padding-bottom: 10px;
        }
        .loading {
          position: absolute;
          margin-top: 100px;
        }
      }
    }
  }
</style>
