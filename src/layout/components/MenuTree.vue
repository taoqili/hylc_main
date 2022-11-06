<template>
  <div class="hylc-menu-tree">
    <template v-for="menu in this.menuData">
      <el-submenu :key="menu.key" :index="menu.key" v-if="menu.children">
        <template slot="title">
          <img width="30" height="31" class="menu-icon" :src="menu.icon || require('@/assets/product-2x.png')" alt="">
          <span slot="title">{{menu.title}}</span>
        </template>
        <menu-tree :menuData="menu.children"></menu-tree>
      </el-submenu>
      <el-menu-item :key="menu.key" :index="menu.key" v-else>
        <img width="30" height="31" class="menu-icon" :src="menu.icon || require('@/assets/product-2x.png')" alt="">
        <span slot="title">{{menu.title}}</span>
      </el-menu-item>
    </template>
  </div>
</template>

<script>
  export default {
    props: ['menuData'],
    name: 'MenuTree'
  }
</script>

<style lang="less">
  .hylc-menu-tree {
    .el-menu-item {
      height: 48px;
      line-height: 48px;
    }
  }
  .el-menu--collapse {
    .menu-icon {
      margin-top: 10px;
    }
  }
</style>
