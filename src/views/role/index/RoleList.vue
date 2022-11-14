<template>
  <div class="role-list">
    <el-table :data="dataSource" stripe style="width: 100%;">
      <el-table-column prop="id" label="角色编号" width="180"/>
      <el-table-column prop="name" label="角色名称" width="180"/>
      <el-table-column prop="desc" label="角色描述" width="180"/>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="editRole(scope.row)"
            type="text"
            size="small"
          >编辑</el-button>
          <el-popconfirm
            title="您确定要删除当前角色吗？"
            @confirm="deleteConfirm(scope.row)"
          >
            <el-button slot="reference" type="text" size="small">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: "RoleList",
    props: {
      dataSource: {
        type: Array,
        default: () => []
      },
      onDelete: {
        type: Function,
        default: () => {}
      },
      onEdit: {
        type: Function,
        default: () => {}
      }
    },
    methods: {
      deleteConfirm(data) {
        this.onDelete(data)
      },
      editRole(data) {
        this.onEdit(data)
      }
    }
  }
</script>

<style scoped>

</style>
