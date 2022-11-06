<template>
  <div class="tab-bar">
    <div class="tabs">
      <div v-for="item in tabs" :key="item.id" :class="{ tab: true, active: item.active }" @click="tabClick(item)">
        <div class="tab-wrap">
          <div class="tab-title">{{ item.title }}</div>
          <div class="el-icon-close tab-icon" v-if="item.closeAble && tabs.length > 1 && item.id !== 'home'"
               @click.stop="$tabs.closeTab(item)"/>
        </div>
      </div>
    </div>
    <div class="actions">
      <el-dropdown @command="handleCommand" trigger="click">
        <span class="el-dropdown-link">
          <i class="el-icon-arrow-down el-icon--right"/>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="closeOthers">关闭其他</el-dropdown-item>
          <el-dropdown-item command="closeAll">关闭所有</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
  import { getPathTitleMapFromMenus } from '@/utils'

  const pathTitleMap = getPathTitleMapFromMenus()

  export default {
    name: 'TabBar',
    data() {
      return {
        microApp: null,
        tabs: []
      }
    },

    methods: {
      tabClick(el) {
        if (el.id === this.$tabs.activeTab.id) return // 点击的是当前页签
        this.$tabs.switchTab(el)
      },
      handleCommand(command) {
        switch (command) {
          case 'closeOthers':
            this.$tabs.closeOtherTabs()
            break
          case 'closeAll':
            this.$tabs.closeAllTabs()
            break
          default:

        }
      },
      closeOtherClickAble(el) {
        let tabs = [...this.tabs]
        return tabs.some(item => {
          return item.path !== el.path && item.closeAble
        })
      },
      closeAllClickAble() {
        let tabs = [...this.tabs]
        return tabs.some(item => {
          return item.closeAble
        })
      }
    },
    mounted() {
      let {path, query} = this.$route
      const {tabs = []} = this.$tabs

      //TODO 修复非子应用路由刷新时tab标签异常情况
      if (path !== location.pathname) {
        path = location.pathname
      }

      this.tabs = tabs
      if (path === '/') {
        path = '/home'
      }
      const existTab = tabs.find(item => {
        return item.originRoute.path === path
      })
      this.$tabs.openTab({
        title: existTab ? existTab.title : (pathTitleMap[path.replace(/\/$/, '')] || '首页'),
        query,
        path,
        closeAble: path !== '/home'
      }, true)
    },
    watch: {
      '$store.state.tabs': function () {
        this.tabs = this.$tabs.tabs
      }
    }
  }
</script>
<style lang="less" scoped>
  .tab-bar {
    display: flex;
    width: 100vw;
    height: 30px;
    position: relative;
    background: #fff;
    box-shadow: 0px 0px 6px 0px rgba(15, 37, 51, 0.1);

    .tabs {
      display: flex;
      margin: 0px 0 0 20px;
      overflow-x: auto;
      scrollbar-width: none;
      -ms-overflow-style: none;
      box-shadow: -2px 0px 0px -1px #eee;

      flex: 1;

      &::-webkit-scrollbar {
        display: none;
      }

      img {
        width: 12px;
        height: 13px;
        margin-top: 8px;
        margin-right: 12px;
        cursor: pointer;
      }

      .tab {
        position: relative;
        transition: all 0.1s ease;
        padding: 0 20px;
        min-width: 120px;
        height: 30px;
        line-height: 30px;
        box-shadow: 0 1px 1px 0 #ddd;

        &:last-child {
          margin-right: 0px;
        }

        .tab-wrap {
          position: relative;
          display: flex;
          align-items: center;
          user-select: none;
          text-align: center;
          font-size: 13px;
          height: 30px;
          padding: 8px 4px;
          cursor: pointer;

          .tab-title {
            text-overflow: ellipsis;
            line-height: 1;
            white-space: nowrap;
            flex: 1;
          }

          .tab-icon {
            color: #999999;
            font-weight: 600;
            width: 20px;
            position: absolute;
            right: -18px;

            &:hover {
              color: #2979ff
            }
          }
        }

        &.active {
          overflow: initial;
          background: #f0f2f5;
          color: #409EFF;
          font-weight: 600;
          z-index: 1;
        }
      }
    }

    .actions {
      padding-top: 6px;
      padding-left: 12px;
      width: 30px;
      cursor: pointer;
      margin-right: 16px;
      box-shadow: -2px 0px 0px -1px #eee;
    }
  }
</style>
