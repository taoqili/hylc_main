<template>
  <el-form-item label="菜单配置" required>
    <el-tree
      :data="menus"
      show-checkbox
      node-key="key"
      ref="menuTree"
      :props="{label: 'title'}"
      :render-content="renderContent"
    />
  </el-form-item>
</template>

<script>
  export default {
    name: "MenuPermission",
    props: {
      menus: {
        type: Array,
        default: () => []
      },
      permissionMenuKeys: {
        type: Array,
        default: () => []
      }
    },
    watch: {
      permissionMenuKeys: {
        handler(value) {
          this.$refs.menuTree.setCheckedKeys(value)
        }
      }
    },
    methods: {
      getCheckedKeys(...arg) {
        const { getCheckedKeys, getHalfCheckedKeys } = this.$refs.menuTree
        const keys = getCheckedKeys(...arg)
        const halfKeys = getHalfCheckedKeys()
        return [...keys, ...halfKeys]
      },
      renderContent(h, {data }) {
        const { hidden, title } = data || {}
        return <span>{title + (hidden ? '（路由）' : '')}</span>
      }
    }
  }
</script>

<style scoped>

</style>
