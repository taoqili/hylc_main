<template>
  <div class="tabBar">
    <div class="tabs">
      <div v-for="item in tabs" :key="item.title" :class="{ tab: true, active: item.active }" @click="tabClick(item)">
        <div class="tab-wrap">
          <div class="tab-title">{{ item.title }}</div>
          <div class="el-icon-close tab-icon" v-if="item.closeAble && tabs.length > 1" @click.stop="$tabs.closeTab(item)"/>
        </div>
      </div>
    </div>
    <!-- <TabMenu></TabMenu> -->
  </div>
</template>
<script>
  // import TabMenu from '@c/TabMenu'
  import {tabTitleMap} from '@/config'
  export default {
    name: 'TabBar',
    components: {
      // TabMenu
    },
    data() {
      return {
        microApp: null,
        tabs: []
      }
    },
    computed: {},
    methods: {
      tabClick(el) {
        // 切换页签
        if (el.id === this.$tabs.activeTab.id) return // 点击的是当前页签
        this.$tabs.switchTab(el)
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
      },
      rightMenuObj(item) {
        let _this = this
        let menus = [
          {
            label: '重新加载',
            handler() {
              _this.$tabs.reloadTab(item)
            },
            clickAble: item.active
          },
          {
            label: '关闭',
            handler() {
              _this.$tabs.closeTab(item)
              // _this.closeTab(item)
            },
            clickAble: item.closeAble
          },
          {
            label: '关闭其他',
            handler() {
              _this.$tabs.closeOtherTabs(item)
            },
            clickAble: this.closeOtherClickAble(item)
          },
          {
            label: '关闭全部',
            handler() {
              _this.$tabs.closeAllTabs(item)
            },
            clickAble: this.closeAllClickAble()
          }
        ]
        return menus
      }
    },
    mounted() {
      const {tabs} = this.$tabs
      this.tabs = tabs
      let { path, query } = this.$route
      if (path === '/') {
        path = '/home'
      }
      const existTab = tabs.find(item => {
        return item.originRoute.path === path
      })
      this.$tabs.openTab({
        title: existTab ? existTab.title : tabTitleMap[path.replace(/\/$/, '')] || '首页',
        query,
        path
      }, !existTab)
    },
    watch: {
      '$store.state.tabs': function () {
        this.tabs = this.$tabs.tabs
      }
    }
  }
</script>
<style lang="less" scoped>
  .tabBar {
    display: block;
    width: 100%;
    height: 32px;

    position: relative;
    overflow: hidden;
    margin-top: 12px;

    //&::before {
    //  display: block;
    //  position: absolute;
    //  left: 0;
    //  top: 0;
    //  content: '';
    //  width: 100%;
    //  height: 100%;
    //  background-color: rgba(0, 0, 0, 0.1);
    //}

    .tabs {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      background: #fff;
      padding: 0 10px;

      .tab {
        position: relative;
        background: #d6dae0;
        transition: all 0.1s ease;
        padding: 0 20px;
        min-width: 50px;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        margin-right: 2px;
        &:last-child {
          margin-right: 0px;
        }

        //&:before {
        //  content: '';
        //  position: absolute;
        //  z-index: -1;
        //  width: 20px;
        //  height: 20px;
        //  border-bottom-right-radius: 100%;
        //  left: -10px;
        //  bottom: -10px;
        //}
        //
        //&:after {
        //  content: '';
        //  position: absolute;
        //  z-index: -1;
        //  width: 20px;
        //  height: 20px;
        //  border-bottom-left-radius: 100%;
        //  right: -10px;
        //  bottom: -10px;
        //  z-index: 1;
        //}

        .tab-wrap {
          position: relative;
          display: flex;
          align-items: center;
          user-select: none;
          text-align: center;
          font-size: 14px;
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
            position: relative;
            right: -16px;
            &:hover {
              color: #2979ff
            }
          }
        }

        &.active {
          overflow: initial;
          background: #f0f2f5;
          color: #2979ff;
          font-weight: 600;
          z-index: 1;
          //&:before {
          //  border-bottom: 10px solid #f0f2f5;
          //  border-right: 10px solid #f0f2f5;
          //}
          //&:after {
          //  border-bottom: 10px solid #f0f2f5;
          //  border-left: 10px solid #f0f2f5;
          //}
        }
      }
    }
  }
</style>
