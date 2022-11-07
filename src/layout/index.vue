<template>
  <div class="wrapper" v-show="hasLogin">
    <div class="header-wrapper" @click="closeSidebar">
      <Header :menus="tMenus"></Header>
      <tab-bar></tab-bar>
      <div class="filter-outer" v-show="showFilter">
        <div class="filter-inner">
          <my-filter
            :showProductSelector="showProductSelector"
            :showDataDatePicker="showDataDatePicker"
            :showStartDatePicker="showStartDatePicker"
            :showEndDatePicker="showEndDatePicker"
          />
        </div>
      </div>
    </div>
    <div class="content" :style="{paddingTop: (showFilter ? 152 : 100) + 'px'}">
      <div class="side-bar" v-show="showSidebar">
        <side-bar
          :menus="sMenus"
          :showProductSelector="showProductSelector"
          :showDataDatePicker="showDataDatePicker"
          :showStartDatePicker="showStartDatePicker"
          :showEndDatePicker="showEndDatePicker"
        />
      </div>
      <div class="main" :style="{'padding-left': showSidebar ? '78px' : '0px'}"  @click="closeSidebar">
        <breadcrumb v-if="breadcrumb.length && showBreadcrumb & sMenus.length > 1" :data="breadcrumb"/>
        <div class="loading" v-loading="showPageLoader && isMicroApp"
             :style="{'margin-left': `calc(50% - ${showSidebar ? 130: 20}px)`}"/>
        <template v-show="!isMicroApp">
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </template>

        <template v-show="isMicroApp">
          <div v-for="item in microAppList" class="hylc-micro-wrapper" :id="item.id" :key="item.id"
               v-show="isMicroApp"/>
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
  import Filter from '@/layout/components/Filter'
  import { filterPosition, microAppList, showBreadcrumb } from "@/config";
  import {
    getSideMenuByKey, getSideMenuByPath,
    getSideMenuKeyByPath,
    getSideMenusByKey,
    getSiteMenus,
    getTopMenuByKey,
    getTopMenuKeyByPath, getYearFirstDay,
    hasLogin,
    isMicroApp
  } from "@/utils";

  export default {
    name: "Layout",
    components: {
      Header,
      TabBar,
      SideBar,
      Breadcrumb,
      MyFilter: Filter
    },
    data() {
      return {
        hasLogin: hasLogin(),
        microAppList,
        tMenus: getSiteMenus() || [],
        sMenus: [],
        showProductSelector: false,
        showDataDatePicker: false,
        showStartDatePicker: false,
        showEndDatePicker: false,
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
      }),
      showFilter() {
        if (filterPosition !== 'top') {
          return false
        }
        return this.showProductSelector || this.showDataDatePicker || this.showStartDatePicker || this.showEndDatePicker
      },
      topKey() {
        return getTopMenuKeyByPath(this.$route.path)
      },
      sideMenus() {
        return getSideMenusByKey(this.topKey)
      },
      showSidebar() {
        return this.sMenus.length > 1
      },
      isMicroApp() {
        return isMicroApp(this.$route.path);
      },
      breadcrumb() {

        const topMenu = getTopMenuByKey(this.topKey) || {}
        if (topMenu.noBreadcrumb || this.sideMenus?.length < 1) {
          return []
        }
        const sideKey = getSideMenuKeyByPath(this.$route.path)
        const sideMenu = getSideMenuByKey(this.topKey, sideKey)
        const result = [
          {
            key: 'home',
            title: '首页',
          }
        ]
        if (topMenu?.children?.length > 1) {
          result.push({
            key: this.topKey,
            title: topMenu.title,
            path: topMenu.defaultPath || sideMenu?.path
          })
        }
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
      closeSidebar() {
        this.$store.commit('setSideMenuIsCollapsed', true)
      },
      initSideBar() {
        const {
          showProductSelector,
          showDataDatePicker,
          showStartDatePicker,
          showEndDatePicker
        } = getTopMenuByKey(this.topKey) || {}
        const {
          showProductSelector: sps,
          showDataDatePicker: sdd,
          showStartDatePicker: ssd,
          showEndDatePicker: sed
        } = getSideMenuByPath(this.$route.path)
        this.sMenus = this.sideMenus
        this.showProductSelector = sps !== undefined ? sps : showProductSelector
        this.showDataDatePicker = sdd !== undefined ? sdd : showDataDatePicker
        this.showEndDatePicker = ssd !== undefined ? ssd : showEndDatePicker
        this.showStartDatePicker = sed !== undefined ? sed : showStartDatePicker
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
    .header-wrapper {
      position: fixed;
      width: 100%;
      z-index: 2000;
      .filter-outer {
        background: #f0f2f5;
        padding-top: 8px;
        .filter-inner {
          background: #fff;
          border-radius: 6px;
          margin: 0 16px;
          height: 48px;
          line-height: 48px;
          padding: 4px 16px 8px;
        }
      }
    }
    .content {
      display: flex;
      justify-content: space-between;
      padding: 16px;
      background: #f0f2f5;
      min-height: 100vh;

      .side-bar {
        position: fixed;
        height: 100vh;
        z-index: 999;
      }

      .main {
        position: relative;
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
