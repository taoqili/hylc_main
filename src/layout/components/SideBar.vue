<template>
  <div class="wrapper">
    <div class="extra">一些筛选项</div>
    <div class="menus">
      <side-menu :menus="menus" />
    </div>
  </div>
</template>

<script>
  import SideMenu from './SideMenu'
  export default {
    name: "",
    props: {
      menus: {
        type: Array,
        default: []
      }
    },
    components: {
      SideMenu
    }
  }
</script>

<style lang="less" scoped>
  .wrapper {
    background: #fff;
    margin-right: 16px;
    padding-bottom: 200px;
    border-radius: 4px;
    box-shadow: 3px 3px 6px 0px #ddd;
    .extra {
      height: 100px;
      margin-bottom: 16px;
      padding: 16px;
    }
  }
</style>
