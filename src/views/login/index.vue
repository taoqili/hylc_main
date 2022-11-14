<template>
  <div class="login_background">
    <div class="hzbank_logo"></div>
    <p class="system_name">经营分析平台</p>
    <div class="login_input">
      <p>账户密码登录</p>
      <el-input placeholder="账户" v-model="username">
        <i slot="prefix" class="el-input__icon icon-user"></i>
      </el-input>
      <el-input
        placeholder="初始密码为000000"
        v-model="password"
        show-password
        class="input_password">
        <i slot="prefix" class="el-input__icon icon-lock"></i>
      </el-input>
      <span class="btn_login" @click="doLogin()">登录</span>
    </div>
  </div>
</template>

<script>
  import siteMenus from "@/api/mock/menus";
  import { doLocalLogin } from "@/utils";
  import { homePath } from "@/config";

  export default {
    data() {
      return {
        password: '',
        username: ''
      }
    },
    methods: {
      doLogin() {
        doLocalLogin({
          token: 'sadfadsf',
          siteMenus,
          permissionConfig: {
            menu: [
              'home',
              'homeIndex',
              'overview',
              'policySetting',
              'assets',
              'assetsQueryproduct',
              'assets',
              'productinvestmentFunds',
              'combinatory',
              'combinatoryOverview',
              'combinatoryCashflow',
              'setting',
              'role',
              'menu',
              'user'
            ],
            route: [
              homePath,
              '/zgmh/ucock-policySetting',
              '/bap/combinatory/overview',
              '/main/role/index',
              '/main/role/users',
              '/main/role/menus',
              '/main/role/resources',
              '/zgmh/ucock-assetsQueryproduct',
              '/zgmh/ucock-productinvestmentFunds'
            ],
            action: ["showDeleteUser","totalDrillDown"],
            api: ['/api/test1', '/api/user/delete']
          }
        })
        this.$tabs.resetTabs()
        window.location.href = homePath
      }
    }
  }
</script>

<style scoped>
  .login_background {
    height: 100vh;
    background: url(../../assets/bgblue.png) center center no-repeat;
    background-size: cover;
    padding-top: 14%;
  }

  .hzbank_logo {
    margin: 0 auto;
    width: 165px;
    height: 46px;
    background: url(../../assets/hzbank_logo.png) no-repeat;
  }

  .system_name {
    font-size: 38px;
    color: #2f2f4d;
    margin-top: 25px;
    text-align: center;
  }

  .login_input {
    width: 370px;
    margin: 0 auto;
  }

  .login_input p {
    font-size: 16px;
    color: #2f2f4d;
    letter-spacing: 0.62px;
    line-height: 16px;
    font-weight: bold;
    margin-top: 32px;
  }

  .login_input /deep/ .el-input {
    height: 32px;
    margin-top: 40px;
    font-size: 13px;
  }

  .login_input /deep/ .input_password .el-input__icon {
    line-height: 35px;
  }

  .login_input .icon-user {
    background: url(../../assets/user_icon.svg) 0 0 no-repeat;
    width: 14px;
    display: inline-block;
    height: 14px;
    margin-top: 12px;
    margin-left: 6px;
  }

  .login_input .icon-lock {
    background: url(../../assets/pwd_icon.svg) 0 0 no-repeat;
    width: 14px;
    display: inline-block;
    height: 14px;
    margin-top: 12px;
    margin-left: 6px;
  }

  .btn_login {
    margin-top: 40px;
    background-image: linear-gradient(222deg, #46b1f6 0%, #46b1f6 100%);
    border-radius: 4px;
    width: 100%;
    height: 40px;
    display: inline-block;
    font-size: 16px;
    line-height: 40px;
    color: #fff;
    text-align: center;
    letter-spacing: 8px;
    cursor: pointer;
  }
</style>
