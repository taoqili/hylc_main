<template>
  <div class="wrapper">
    <header>
      <div class="title">角色列表</div>
      <el-button size="small" type="primary" @click="addRole">新增角色</el-button>
    </header>
    <RoleList :dataSource="roleList" :onEdit="editRole" :onDelete="deleteConfirm"/>
    <el-dialog
      :title="mode === 'new' ? '新增角色' : '编辑角色'"
      :visible.sync="dialogVisible"
      width="45%"
      @close="onClose()"
    >
      <el-form
        :model="role"
        label-width="100px"
        label-position="right"
        size="small"
      >
        <el-form-item label="角色编号" :hidden="mode==='new'">
          <el-input v-model="role.id" placeholder="请输入" :disabled="mode === 'edit'"/>
        </el-form-item>
        <el-form-item label="角色名称" required>
          <el-input v-model="role.name"/>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="role.desc"/>
        </el-form-item>
        <MenuPermission ref="roleMenu" v-if="siteMenus.length" :menus="siteMenus" :permissionMenuKeys="permissionMenuKeys"/>
        <ApiPermission ref="roleApi" v-if="allApis.length" :apis="allApis" :permissionApis="permissionApis"></ApiPermission>
        <ActionPermission ref="roleAction" v-if="allActions.length" :actions="allActions" :permissionActions="permissionActions"></ActionPermission>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="onCancel">取 消</el-button>
        <el-button size="small" type="primary" @click="onConfirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { localSiteMenusKey } from "@/config";
  import { formatFilterKeys } from "@/utils";
  import MenuPermission from "@/views/role/index/MenuPermission";
  import RoleList from "@/views/role/index/RoleList";
  import ActionPermission from "@/views/role/index/ActionPermission";
  import ApiPermission from "@/views/role/index/ApiPermission";

  export default {
    name: "RoleIndex",
    components: {
      MenuPermission,
      RoleList,
      ActionPermission,
      ApiPermission
    },
    data() {
      return {
        dialogVisible: false,
        mode: 'new',
        role: {},
        originRole: {},
        roleList: [],
        siteMenus: [],
        allApis: [],
        allActions: [],
        permissionMenuKeys: [],
        permissionApis: [],
        permissionActions: []
      }
    },
    mounted() {
      this.initRoleList()
      this.initMenuList()
      this.initActionList()
      this.initApiList()
    },
    methods: {
      initRoleList() {
        this.roleList = [
          {
            id: '2016-05-02',
            name: '超级管理员',
            desc: '角色描述',
            menu: '["home:homeIndex","assets:productinvestmentFunds"]',
            route: '["/main/home","/zgmh/sdasdf/sss"]',
            action: '["showDeleteUser","totalDrillDown"]',
            api: '[{"path":"/api/users","dataMask":true},{"path":"/api/xsdfd"}]'
          }, {
            id: '2016-05-04',
            name: '管理员',
            desc: '角色描述',
            menu: '["home:homeIdex","product:projectInvest"]',
            route: '["/main/home","/zgmh/sdasdf/sss"]',
            action: '["showDeleteUser","totalDrillDown"]',
            api: '[{"path":"/api/user/delete","dataMask":true},{"path":"/api/xsdfd"}]'
          }, {
            id: '2016-05-01',
            name: '普通用户',
            desc: '角色描述',
            menu: '["home:homeIdex","overview:ssdsf"]',
            route: '["/main/home","/zgmh/sdasdf/sss"]',
            action: '["showDeleteUser","totalDrilldown"]',
            api: '[{"path":"/api/someData"},{"path":"/api/xsdfd"}]'
          }
        ]
      },
      initMenuList() {
        const siteMenus = JSON.parse(sessionStorage.getItem(localSiteMenusKey) || '[]')
        this.siteMenus = siteMenus
      },
      initApiList() {
        this.allApis = [
          {id: '1', name: 'getUsers', desc: '获取用户列表', path: '/api/users'},
          {id: '2', name: 'getSomeData', desc: '获取某个数据', path: '/api/someData'},
          {id: '3', name: 'deleteUser', desc: '删除用户', path: '/api/user/delete'},
        ]
      },
      initActionList() {
        this.allActions = [
          {id: '1', name: "showDeleteUser", desc: '显示删除按钮'},
          {id: '2', name: "totalDrillDown", desc: '数据下钻'},
          {id: '3', name: "other", desc: '其他'},
        ]
      },
      addRole() {
        this.mode = 'new'
        this.dialogVisible = true
        this.permissionMenuKeys = []
        this.permissionActions = []
        this.permissionApis = []
        this.role = {}
      },
      editRole(data) {
        this.mode = 'edit'
        this.dialogVisible = true
        this.originRole = {...data}
        this.role = {...data}
        this.$nextTick(() => {
          const checkedMenuKeys = formatFilterKeys(JSON.parse(data.menu), true)
          const checkedApiKeys = JSON.parse(data.api)
          const checkedActionKeys = JSON.parse(data.action)
          this.permissionMenuKeys = checkedMenuKeys
          this.permissionActions = checkedActionKeys
          this.permissionApis = checkedApiKeys
        })
      },
      deleteConfirm(data) {
        // deleteRole()
        // this.initRoleList()
      },
      onClose() {
        this.permissionMenuKeys = []
        this.permissionApis = []
        this.permissionActions = []
      },
      onConfirm() {
        this.dialogVisible = false
        const menus = this.$refs.roleMenu.getCheckedKeys()
        const apis = this.$refs.roleApi.getCheckedKeys()
        const actions = this.$refs.roleAction.getCheckedKeys()
        debugger

        this.role = {}
      },
      onCancel() {
        this.dialogVisible = false
        this.role = {}
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

    .role-list {
      padding: 16px;
    }
  }

</style>
