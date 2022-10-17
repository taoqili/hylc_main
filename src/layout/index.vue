<template>
  <div class="wrapper">
    <Header :menus="tMenus"></Header>
    <tab-bar></tab-bar>
    <div class="content">
      <div class="side-bar" v-show="sMenus.length > 1 && isOpen">
        <side-bar :menus="sMenus" />
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
        isOpen: true
      };
    },
    mounted() {
      this.sMenus = this.getSideMenus()
    },
    computed: {
      isMicroApp() {
        return isMicroApp(this.$route.path);
      },
    },
    watch: {
      '$store.state.sideBarIsOpen': {
        handler(value) {
          this.isOpen = value
        }
      },
      '$route': {
        handler() {
          this.sMenus = this.getSideMenus()
        }
      }
    },
    methods: {
      getSideMenus() {
        const { path } = this.$route
        const key = path.split('/')[isMicroApp(path) ? 2 : 1]
        return sideMenus[key] || []
      }
    }
  };
</script>

<style lang="less" scoped>
  .wrapper {
    .content {
      display: flex;
      padding: 16px;
      background: #f0f2f5;
      //height: 100vh;
      .side-bar {
        width: 180px;
        min-width: 180px;
      }
      .main {
        flex: 1;
      }
    }
  }
</style>
