<template>
  <div class="layout-header">
    <section class="header-wrap">
      <div class="logo">VE+经营分析平台</div>
      <div class="menu">
        <header-menu :menus="menus"/>
      </div>
      <div class="extra">
        <el-dropdown trigger="click" @command="handleCommand">
          <img :src="require('@/assets/client-2x.png')" width="40" height="40" alt="" style="cursor: pointer">
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-plus" command="personal">个人信息</el-dropdown-item>
            <el-dropdown-item icon="el-icon-circle-plus" command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </section>
  </div>
</template>
<script>
  import HeaderMenu from "@/layout/components/HeaderMenu";
  import { doLocalLogout } from "@/utils";
  export default {
    name: 'Header',
    components: {
      HeaderMenu
    },
    props: {
      menus: {
        type: Array,
        default: () => []
      }
    },
    methods: {
      handleCommand(command) {
        switch (command) {
          case 'personal':
            this.$message.warning('个人信息')
            break
          case 'logout':
            this.logout();
            break
          default:
        }
      },
      logout() {
        // 清除页签本地缓存
        this.$tabs.closeAllTabs()
        doLocalLogout()
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
    //min-width: 1200px;

    .header-wrap {
      background: #fff;
      box-shadow: 0 2px 3px 0 #eee ;
      height: 56px;
      line-height: 56px;
      display: flex;
      align-items: center;
      padding: 0 24px;


      .logo {
        width: 180px;
        font-size: 20px;
        font-weight: bolder;
      }

      .menu {
        flex: 1;
      }
      .extra {
        width: 100px;
        text-align: right;
        color: #03111A;
        font-size: 16px;
        font-weight: bolder;
      }
    }
  }
</style>
