<template>
  <div class="hylc-page-role-menu">
    <header>
      <div class="title">菜单（路由）列表</div>
      <el-button size="small" type="primary" @click="addTopMenu">新建一级菜单</el-button>
    </header>
    <el-tree
      :data="siteMenus"
      node-key="key"
      default-expand-all
      draggable
      :expand-on-click-node="true"
      :render-content="renderContent"
      style="padding: 0 16px 16px;"
    />

    <el-dialog
      :title="`${editMode ? '编辑' : '新建'}${type === 'top'? '一级': '子'}菜单`"
      :visible.sync="dialogVisible"
      width="30%"
      class="menu-dialog"
      :destroy-on-close="true"
      @close="onClose()"
    >
      <el-form
        :model="menu"
        label-width="100px"
        label-position="right"
        size="small"
      >
        <el-form-item label="菜单名" required>
          <el-input v-model="menu.key" placeholder="请输入菜单名，如 home"/>
        </el-form-item>
        <el-form-item label="菜单标题" required>
          <el-input v-model="menu.title" placeholder="请输入菜单标题，如 首页"/>
        </el-form-item>
        <el-form-item v-if="type === 'side'" label="访问地址" :required="true">
          <el-input v-model="menu.path" placeholder="请输入访问地址" />
        </el-form-item>
        <el-form-item v-else label="默认地址">
          <el-input v-model="menu.defaultPath" placeholder="请输入默认访问地址" />
        </el-form-item>
        <el-form-item label="菜单图标">
          <el-input v-model="menu.icon" placeholder="请输入图标地址，支持base64编码"/>
        </el-form-item>
        <el-form-item label="个性化">
          <el-checkbox v-model="menu.showProductSelector">产品代码选择器</el-checkbox>
          <el-checkbox v-model="menu.showStartDatePicker">起始日期选择器</el-checkbox>
          <el-checkbox v-model="menu.showEndDatePicker">结束日期选择器</el-checkbox>
          <el-checkbox v-model="menu.showDataDatePicker">数据日期选择器</el-checkbox>
          <el-checkbox v-model="menu.hidden">路由类型（界面上不可见）</el-checkbox>
        </el-form-item>
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
  import { addMenu, updateMenu, deleteMenu } from '@/api'

  const resetMenu = {
    key: '',    // 菜单名，唯一标识符,非空
    title: '',  // 标题
    icon: '',   // 图标
    path: '',   // 链接地址
    defaultPath: '',             // 默认链接地址
    showProductSelector: false,  // 显示产品选择器
    showStartDatePicker: false,  // 显示开始日期选择器
    showEndDatePicker: false,    // 显示结束日期选择器
    showDataDatePicker: false,   // 显示数据日期选择器
    hidden: false                // 是否隐藏显示
  }

  export default {
    name: "menus",
    data() {
      return {
        siteMenus: [],
        dialogVisible: false,
        type: 'top',
        parentId: '',
        editMode: false,
        originalMenu: resetMenu, // 修改前的菜单，每次编辑前需要保存，编辑后需要更新，如果取消编辑则需要据此还原
        menu: resetMenu   // 正在编辑中的菜单
      }
    },
    mounted() {
      this.initSiteMenus()
    },
    methods: {
      initSiteMenus() {
        const siteMenus = JSON.parse(sessionStorage.getItem(localSiteMenusKey) || '[]')
        this.siteMenus = siteMenus
      },
      onClose() {
        this.parentId = ''
        this.editMode = false
        this.menu = {...this.originalMenu}
      },
      onConfirm() {
        this.dialogVisible = false
        // if (this.editMode) {
        //   updateMenu(this.menu)
        // } else {
        //   addMenu(this.menu, this.parentId)
        // }
        // this.initSiteMenus()

        // mock
        this.siteMenus = [
          this.menu,
          ...this.siteMenus
        ]
      },
      onCancel() {
        this.dialogVisible = false
      },
      editMenu(data, type) {
        this.type = type
        this.editMode = true
        this.menu = {...data}
        this.originalMenu = {...data}
        this.dialogVisible = true
      },
      addTopMenu() {
        this.type = 'top'
        this.dialogVisible = true
        this.menu = {...resetMenu}
        this.originalMenu = resetMenu
      },
      addSideMenu(data = {}) {
        this.parentId = data.parentId
        this.type = 'side'
        this.dialogVisible = true
        this.menu = {...resetMenu}
        this.originalMenu = resetMenu
      },
      removeMenu(node, data) {
        // deleteMenu(data.id)

        // mock
        const parent = node.parent;
        const children = parent?.data?.children || parent.data;
        const index = children.findIndex(d => d.key === data.key);
        children.splice(index, 1);
      },
      renderContent(h, {node, data}) {
        const {icon, title, path, defaultPath, hidden} = data || {}
        const type = node.level === 1 ? 'top' : 'side'
        return (
          <div class={{'hylc-menu-tree-node': true}}>
            <div class="label">
              {
                icon ? <img src={icon} width="20" height="20" /> : null
              }
              <span>{title} : </span>
              <span>{path || defaultPath}</span>
            </div>
            <div>{hidden ? '路由类型' : ''}</div>
            <div class="action" on-click={(e) => e.stopPropagation()}>
              <el-button size="mini" type="text" on-click={() => this.addSideMenu(data)}>新建子菜单</el-button>
              <el-button size="mini" type="text" on-click={() => this.editMenu(data, type)}>编辑</el-button>
              <el-popconfirm
                title="您确定要删除当前菜单吗？"
                onConfirm={() => this.removeMenu(node, data)}
              >
                <el-button slot="reference" size="mini" type="text">删除</el-button>
              </el-popconfirm>
            </div>
          </div>
        )
      }
    }
  }
</script>
<style lang="less">
  .hylc-page-role-menu {
    .hylc-menu-tree-node {
      display: flex;
      width: 100%;
      height: 32px;
      justify-content: space-between;
      justify-items: center;
      align-items: center;
      align-content: center;
      .label {
        flex: 1;
        display: flex;
        height: 32px;
        align-content: center;
        align-items: center;
        word-break: break-all;
      }
      .action {
        width: 242px;
        margin-left: 16px;
        text-align: right;
        button {
          margin-right: 20px;
          margin-left: 0;
          &:last-child {
            margin-right: 10px;
          }
        }
      }
    }
    .el-tree-node__content {
      height: 32px;
    }
  }
</style>

<style lang="less" scoped>
  .hylc-page-role-menu {
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
    .menu-dialog {
      .custom-config {
        line-height: 24px;
      }
    }
  }

</style>
