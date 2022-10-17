<template>
  <div>
    <div class="menu-item" v-for="menu in menus" :key="menu.key" @click="open(menu)">{{menu.title}}</div>
  </div>
</template>

<script>
  import { createMicroApp } from "@/config";

  export default {
    name: "",
    props: {
      menus: {
        type: Array,
        default: []
      }
    },
    methods: {
      open(page) {
        let {path, query, title} = page
        createMicroApp(path).then(res => {
          this.$tabs.openTab({
            title,
            path,
            query
          })
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .menu-item {
    padding: 10px 0;
    cursor: pointer;
  }
</style>
