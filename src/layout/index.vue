<template>
  <div class="wrapper">
    <Header :menus="tMenus"></Header>
    <tab-bar></tab-bar>
    <div class="content">
      <div class="side-bar" v-show="sMenus.length > 1 && showSideBar">
        <side-bar :menus="sMenus" :hideProductSelector="hideProductSelector" :hideDatePicker="hideDatePicker" />
      </div>
      <div class="main">
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
  import { isMicroApp, microAppList, sideMenus, topMenus } from "@/config";

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
        showSideBar: true
      };
    },
    mounted() {
      this.initSideBar()
    },
    computed: {
      isMicroApp() {
        return isMicroApp(this.$route.path);
      },
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
      getTopKey() {
        const { path } = this.$route
        return path.split('/')[isMicroApp(path) ? 2 : 1]
      },
      getSideMenus() {
        const key = this.getTopKey()
        return sideMenus[key] || []
      },
      getTopMenu(menus = [], key) {
        return menus.find(item => item.key === key)
      },
      initSideBar() {
        this.sMenus = this.getSideMenus()
        const topKey = this.getTopKey()
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
      }
    }
  }
</style>
