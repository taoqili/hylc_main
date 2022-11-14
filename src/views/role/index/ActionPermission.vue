<template>
  <el-form-item label="操作配置">
    <div class="hylc-action-permission-node-title">
      <div class="name">名称</div>
      <div class="desc">描述</div>
    </div>
    <el-tree
      :data="actions"
      show-checkbox
      node-key="name"
      ref="actionTree"
      :props="{label: 'desc'}"
    >
      <div slot-scope="{ node, data }" class="hylc-action-permission-node">
        <div class="name">{{data.name}}</div>
        <div class="desc">{{data.desc}}</div>
      </div>
    </el-tree>
  </el-form-item>
</template>

<script>
  export default {
    name: "ActionPermission",
    props: {
      actions: {
        type: Array,
        default: () => []
      },
      permissionActions: {
        type: Array,
        default: () => []
      }
    },
    watch: {
      permissionActions: {
        handler(value) {
          this.$refs.actionTree.setCheckedKeys(value)
        }
      }
    },
    methods: {
      getCheckedKeys(...arg) {
        return this.$refs.actionTree.getCheckedKeys(...arg)
      }
    }
  }
</script>

<style lang="less">
  .hylc-action-permission-node,
  .hylc-action-permission-node-title {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    .name {
      width: 120px;
    }
    .desc {
      flex: 1;
    }
  }
  .hylc-action-permission-node-title {
    width: calc(100% - 45px);
    margin-left: 45px;
  }
</style>
