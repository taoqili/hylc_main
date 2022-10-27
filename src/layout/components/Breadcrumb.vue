<template>
  <div class="hylc-breadcrumb">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item v-for="i in data" :key="i.key" :to="getBreadcrumbPath(i)">{{ i.title }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
  export default {
    name: "breadcrumb",
    props: {
      data: {
        type: Array,
        default: () => []
      }
    },
    methods: {
      getBreadcrumbPath(item) {
        return {
          path: item.path,
          query: this.searchParams || {}
        }
      }
    }
  }
</script>

<style lang="less">
  .hylc-breadcrumb {
    .el-breadcrumb__item {
      &:first-child {
        span {
          cursor: unset !important;
          &:hover {
            color: unset;
          }
        }
      }
    }
  }
</style>
