<template>
  <el-form-item label="API配置">
    <div class="hylc-api-permission-node-title">
      <div class="name">名称</div>
      <div class="path">访问路径</div>
      <div class="mask">需要脱敏</div>
    </div>
    <el-tree
      :data="apis"
      show-checkbox
      node-key="path"
      ref="apiTree"
      @check-change="changeApiChecked"
      :props="{label: 'desc'}"
    >
      <div slot-scope="{ node, data }" class="hylc-api-permission-node">
        <div class="name">{{data.name}}</div>
        <div class="path">{{data.path}}</div>
        <div class="mask">
          <el-checkbox :ref="data.path" :value="!!maskCheckedState[data.path]" @change="(value) => changeMaskChecked(value, node)"></el-checkbox>
        </div>
      </div>
    </el-tree>
  </el-form-item>
</template>

<script>
  export default {
    name: "ApiPermission",
    props: {
      apis: {
        type: Array,
        default: () => []
      },
      permissionApis: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        permissions: [],
        maskCheckedState: {}
      }
    },
    watch: {
      permissionApis: {
        handler(value) {
          const keys = value.reduce((pre,cur) => {
            pre.push(cur.path)
            return pre
          }, [])
          this.$refs.apiTree.setCheckedKeys(keys)
          this.updateMaskChecked()
        }
      },

    },
    methods: {
      changeMaskChecked(value, {data}) {
        const { path } = data || {}
        const paths = this.$refs.apiTree.getCheckedKeys()
        this.maskCheckedState = {
          ...this.maskCheckedState,
          [path]: paths.includes(path) ? value : false
        }
      },
      changeApiChecked(data, value) {
        const { path } = data
        this.maskCheckedState = {
          ...this.maskCheckedState,
          [path]: value ? this.maskCheckedState[path] : false
        }
      },
      getCheckedKeys(...arg) {
        const checkedKeys = []
        const paths = this.$refs.apiTree.getCheckedKeys(...arg)
        paths.forEach(path => {
          const maskChecked = this.$refs[path].isChecked
          checkedKeys.push({
            path,
            dataMask: maskChecked
          })
        })
        return checkedKeys
      },
      updateMaskChecked() {
        const ret = {}
        this.apis.forEach(item => {
          const {path} = item
          const permission = this.permissionApis.find(i => i.path === path)
          if (permission) {
            ret[path] = permission?.dataMask || false
          }
        })
        this.maskCheckedState = ret
      }
    }
  }
</script>

<style lang="less">
  .hylc-api-permission-node,
  .hylc-api-permission-node-title {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    .name {
      width: 100px;
    }
    .path {
      flex: 1;
    }
    .mask {
      text-align: center;
      width: 80px;
    }
  }
  .hylc-api-permission-node-title {
    width: calc(100% - 45px);
    margin-left: 45px;
  }
</style>
