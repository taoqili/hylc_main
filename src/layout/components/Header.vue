<template>
  <div class="layout-header">
    <section class="header-wrap">
      <div class="logo">经营分析平台</div>
      <div class="menu">
        <header-menu :menus="menus"/>
      </div>
      <div class="extra">
        XX  | 退出登录
      </div>
    </section>
  </div>
</template>
<script>
  import HeaderMenu from "@/layout/components/HeaderMenu";

  export default {
    components: {
      HeaderMenu
    },
    props: {
      menus: {
        type: Array,
        default: []
      }
    },
    methods: {
      logout() {
        // 清除页签本地缓存
        this.$tabs.closeAllTabs()
        this.$router.replace({
          path: '/login'
        })
      }
    }
  }
</script>

<style lang="less">
  .el-menu--horizontal >.el-menu-item {
    height: 57px;
    line-height: 57px;
    cursor: pointer;
  }
</style>

<style lang="less" scoped>
  .layout-header {
    position: relative;
    min-width: 1200px;

    .header-wrap {
      background: #fff;
      box-shadow: 0 2px 3px 0 #eee ;
      height: 56px;
      line-height: 56px;
      display: flex;
      align-items: center;
      padding: 0 24px;


      .logo {
        width: 250px;
        font-size: 20px;
        font-weight: bolder;
      }

      .menu {
        flex: 1;
      }
      .extra {
        width: 200px;
        text-align: right;
        color: #2979ff;
      }
    }
  }
</style>
