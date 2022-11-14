<template>
  <div class="hylc-main-side-menu-wrapper">
    <el-tooltip class="item" effect="dark" :content="isCollapsed? '展开' : '收起'">
      <div class="toggle-trigger" @click="toggleSideMenu()" >{{isCollapsed ? '&gt;' : '&lt;'}}</div>
    </el-tooltip>
    <el-menu
      :defaultActive="defaultActiveKey"
      :collapse="isCollapsed"
      :collapse-transition="false"
      @select="handleSelect"
    >
      <menu-tree :menu-data="menus" :collapsed="isCollapsed"></menu-tree>
    </el-menu>
  </div>
</template>

<script>
  import { getSideMenuByKey, getSideMenuKeyByPath, getTopMenuKeyByPath } from "@/utils";
  import MenuTree from "@/layout/components/MenuTree";
  import { mapState } from "vuex";
  export default {
    name: "SideMenu",
    components: {
      MenuTree
    },
    props: {
      menus: {
        type: Array,
        default: () => []
      },
      isCollapsed: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        cachePageMap: {},
      }
    },
    computed: {
      ...mapState({
        sideMenuIsCollapsed: state => state.sideMenuIsCollapsed
      }),
      defaultActiveKey() {
        return getSideMenuKeyByPath(this.$route.path)
      }
    },
    methods: {
      toggleSideMenu() {
        this.$store.commit('setSideMenuIsCollapsed', !this.sideMenuIsCollapsed)
      },
      handleSelect(sideKey) {
        const topKey = getTopMenuKeyByPath(this.$route.path)
        const menu = getSideMenuByKey(topKey, sideKey)
        this.$emit('side-menu-selected', menu)
      }
    }
  }
</script>

<style lang="less">
  .hylc-main-side-menu-wrapper {
    position: relative;
    padding-top: 16px;
    .toggle-trigger {
      position: absolute;
      right: -10px;
      top: 200px;
      width: 10px;
      height: 60px;
      line-height: 60px;
      color: #aaa;
      font-weight: 400;
      font-size: 12px;
      background: #fff; //rgb(237,245,255);
      box-shadow: 3px 3px 6px 0px #ddd;
      cursor: pointer;
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px;
    }
    .el-menu {
      border-right: none;
      &:not(.el-menu--collapse) {
        width: 220px;
      }
    }
    .el-menu-item {
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 600;
      color: #5D6265;
      user-select: none;
      &.is-active {
        color: #409EFF;
        background: rgb(237, 245, 255);
      }
    }
    .el-submenu {
      .el-menu-item {
        padding-left: 28px !important;
        padding-right: 0;
        min-width: 100px;
      }
    }
  }

</style>
