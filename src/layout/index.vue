<template>
  <div class="layout-container">
    <Header></Header>
    <tab-bar></tab-bar>
    <div class="layout-main">
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
</template>

<script>
  import Header from "./components/Header";
  import TabBar from "./components/TabBar";
  import { isMicroApp, microAppList } from "@/config";

  export default {
    name: "Layout",
    components: {
      Header,
      TabBar,
    },
    data() {
      return {
        microAppList
      };
    },
    computed: {
      isMicroApp() {
        return isMicroApp(this.$route.path);
      },
    },
  };
</script>

<style lang="less" scoped>
  .layout-container {
    .layout-main {
      padding: 16px;
      background: #f0f2f5;
      height: 100vh;
    }
  }
</style>
