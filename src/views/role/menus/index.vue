<template>
  <div class="hylc-page-role-menu">
    <header>
      <div class="title">菜单列表</div>
      <el-button size="small" type="primary" @click="addTopMenu">新建顶部菜单</el-button>
    </header>
    <el-tree
      :data="data"
      node-key="id"
      default-expand-all
      draggable
      :expand-on-click-node="false"
      :render-content="renderContent"
      style="padding: 0 16px 16px"
    >
    </el-tree>

    <el-dialog :title="`新建${type === 'top'? '顶部': '侧边'}菜单`" :visible.sync="dialogVisible" width="30%">
      <el-form
        :model="menu"
        label-width="100px"
        label-position="right"
        size="small"
      >
        <el-form-item label="菜单名" required>
          <el-input v-model="menu.key" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="菜单标题" required>
          <el-input v-model="menu.title"/>
        </el-form-item>
        <el-form-item label="访问路由" v-if="type==='side'" required>
          <el-input v-model="menu.path"/>
        </el-form-item>
        <el-form-item label="菜单图标">
          <el-input v-model="menu.icon"/>
        </el-form-item>
        <el-form-item label="个性化" v-if="type==='top'">
          <el-checkbox-group v-model="menu.config">
            <el-checkbox label="产品选择" name="config" value="productSelector"></el-checkbox>
            <el-checkbox label="起始日期" name="config" value="startDate"></el-checkbox>
            <el-checkbox label="结束日期" name="config" value="endDate"></el-checkbox>
            <el-checkbox label="数据日期" name="config" value="dataDate"></el-checkbox>
          </el-checkbox-group>
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
  let id = 1000;
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
              children: [
                {
                  id: 9,
                  label: '三级 1-1-1'
                }, {
                  id: 10,
                  label: '三级 1-1-2'
                }
              ]
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
        data,
        dialogVisible: false,
        type: 'top',
        menu: {
          key: '',
          title: '',
          path: '',
          icon: '',
          config: []
        }
      }
    },
    methods: {
      addTopMenu() {
        this.type = 'top'
        this.dialogVisible = true
      },
      addSideMenu() {
        this.type = 'side'
        this.dialogVisible = true
        // this.append(data)
      },
      append(data) {
        this.dialogVisible = true
        // const newChild = {id: id++, label: 'testtest', children: []};
        // if (!data.children) {
        //   this.$set(data, 'children', []);
        // }
        // data.children.push(newChild);
      },

      remove(node, data) {
        const parent = node.parent;
        const children = parent.data.children || parent.data;
        const index = children.findIndex(d => d.id === data.id);
        children.splice(index, 1);
      },
      renderContent(h, {node, data}) {
        return (
          <div class="hylc-menu-tree-node">
            <div class="label">{node.label}</div>
            <div class="action">
              <el-button size="mini" type="text" on-click={() => this.addSideMenu(data)}>新建子菜单</el-button>
              <el-popconfirm
                title="您确定要删除当前菜单吗？"
                onConfirm={() => this.remove(node, data)}
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
<style lang="less" scoped>
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
</style>
<style lang="less">
  .hylc-page-role-menu {
    background: #fff;
    box-shadow: rgb(56 82 143 / 12%) 3px 3px 6px 0px;
    border-radius: 6px;
    .hylc-menu-tree-node {
      display: flex;
      width: 100%;
      height: 40px;
      justify-content: space-between;
      justify-items: center;
      align-items: center;
      align-content: center;
      .label {
        flex: 1;
        word-break: break-all;
      }
      .action {
        width: 142px;
        margin-left: 16px;
        text-align: right;
        button {
          margin-right: 20px;
          &:last-child {
            margin-right: 10px;
          }
        }
      }
    }
    .el-tree-node__content {
      height: 32px;
    }
    .el-button--small {
      padding: 6px 15px;
    }
  }
</style>
