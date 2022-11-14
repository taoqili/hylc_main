<template>
  <div class="wrapper">
    <header>
      <div class="title">用户列表</div>
      <el-button size="small" type="primary" @click="addRole">新增用户</el-button>
    </header>
    <div class="user-list">
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
    </div>
    <el-dialog :title="mode === 'new' ? '新增用户' : '编辑用户'" :visible.sync="dialogVisible" width="60%">
      <el-form
        :model="role"
        label-width="100px"
        label-position="right"
        size="small"
      >
        <el-form-item label="用户名" required>
          <el-input v-model="role.key" placeholder="请输入用户名"/>
        </el-form-item>
        <el-form-item label="用户密码" required>
          <el-input v-model="role.desc" aria-placeholder="请输入密码"/>
        </el-form-item>
        <el-form-item label="选择角色">
          <el-transfer :titles="['所有角色','已选择角色']" v-model="value" :data="data"></el-transfer>
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
      const generateData = _ => {
        const data = [];
        for (let i = 1; i <= 15; i++) {
          data.push({
            key: i,
            label: `角色 ${ i }`,
            disabled: i % 4 === 0
          });
        }
        return data;
      };
      return {
        data: generateData(),
        value: [1, 4],
        role: {},
        mode: 'new',
        dialogVisible: false,
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
      };
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
    .user-list {
      padding: 16px;
    }
  }

</style>
