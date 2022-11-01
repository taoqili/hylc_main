<template>
  <div class="wrapper">
    <header>
      <div class="title">角色列表</div>
      <el-button size="small" type="primary" @click="addRole">新增角色</el-button>
    </header>
    <el-table
      :data="tableData"
      stripe
      style="width: 100%"
    >
      <el-table-column
        prop="date"
        label="日期"
        width="180"
      />
      <el-table-column
        prop="name"
        label="姓名"
        width="180"
      />
      <el-table-column
        prop="address"
        label="地址"
      />
      <el-table-column
        label="操作"
      >
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="editRole(scope.$index, tableData)"
            type="text"
            size="small"
          >编辑</el-button>
          <el-button
            @click.native.prevent="deleteRole(scope.$index, tableData)"
            type="text"
            size="small"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="mode === 'new' ? '新增角色' : '编辑角色'" :visible.sync="dialogVisible" width="40%">
      <el-form
        :model="role"
        label-width="100px"
        label-position="right"
        size="small"
      >
        <el-form-item label="角色标识" required>
          <el-input v-model="role.key" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="角色名称" required>
          <el-input v-model="role.title"/>
        </el-form-item>
        <el-form-item label="角色描述" >
          <el-input v-model="role.desc"/>
        </el-form-item>
        <el-form-item label="菜单配置">
          <el-tree
            :data="treeData"
            show-checkbox
            node-key="id"
            :default-expanded-keys="[2, 3]"
            :default-checked-keys="[5]"
            :props="defaultProps">
          </el-tree>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "",
    data() {
      const data = [
        {
          id: 1,
          label: '全景视图',
          children: [
            {
              id: 4,
              label: '二级 1-1',
            },
            {
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '三级 1-1-2'
            }
          ]
        },
        {
          id: 2,
          label: '资产分析',
          children: [
            {
              id: 5,
              label: '二级 2-1'
            }, {
              id: 6,
              label: '二级 2-2'
            }
          ]
        },
        {
          id: 3,
          label: '风险分析',
          children: [
            {
              id: 7,
              label: '二级 3-1'
            },
            {
              id: 8,
              label: '二级 3-2'
            }
          ]
        }
      ];
      return {
        dialogVisible: false,
        mode: 'new',
        role: {

        },
        treeData: data,
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        tableData: [
          {
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }
        ]
      }
    },
    methods: {
      addRole() {
        this.mode = 'new'
        this.dialogVisible = true
      },
      editRole() {
        this.mode = 'edit'
        this.dialogVisible = true
      },
      deleteRole() {

      }
    }
  }
</script>
<style lang="less">
  .el-button--small {
    padding: 6px 15px;
  }
</style>

<style lang="less" scoped>
  .wrapper {
    background: #fff;
    box-shadow: rgb(56 82 143 / 12%) 3px 3px 6px 0px;
    border-radius: 6px;
    header {
      margin-bottom: 12px;
      display: flex;
      justify-content: space-between;
      align-content: center;
      padding: 16px 16px 0;
      .title {
        font-size: 16px;
        font-weight: bolder;
        height: 30px;
        line-height: 30px;
      }
    }
  }

</style>
