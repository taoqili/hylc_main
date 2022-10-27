<template>
  <div class="tab-bar">
    <div class="tabs">
      <!--      //TODO 暂时注释，展开收起时主内容区域宽度有个样式问题需要修复 -->
<!--      <el-tooltip v-show="hasSideMenus" :content="isOpen ? '隐藏侧边栏':'显示侧边栏'" placement="top-start">-->
<!--        <img :src="isOpen ? leftArrow : rightArrow" alt="" @click="toggleSideBar">-->
<!--      </el-tooltip>-->
<!--      <img v-show="!hasSideMenus" :src="isOpen ? leftArrow : rightArrow" alt=""-->
<!--           @click="hasSideMenus ? toggleSideBar:() => {}" />-->
      <div v-for="item in tabs" :key="item.title" :class="{ tab: true, active: item.active }" @click="tabClick(item)">
        <div class="tab-wrap">
          <div class="tab-title">{{ item.title }}</div>
          <div class="el-icon-close tab-icon" v-if="item.closeAble && tabs.length > 1 && item.id !== 'home'"
               @click.stop="$tabs.closeTab(item)"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { sideMenus } from '@/config'
  import { getPathTitleMapFromMenuConfig, isMicroApp } from '@/utils'
  import leftArrow from '../assets/left-arrow.png'
  import rightArrow from '../assets/right-arrow.png'
  const tabTitleMap = getPathTitleMapFromMenuConfig(sideMenus)

  export default {
    name: 'TabBar',
    data() {
      return {
        microApp: null,
        tabs: [],
        leftArrow,
        rightArrow,
        isOpen: true,
        hasSideMenus: false
      }
    },
    computed: {},
    methods: {
      getSideMenus() {
        const {path} = this.$route
        const key = path.split('/')[isMicroApp(path) ? 2 : 1]
        return sideMenus[key] || []
      },
      toggleSideBar() {
        this.isOpen = !this.isOpen
        this.$store.commit('setSideBarIsOpen', this.isOpen)
      },
      tabClick(el) {
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
      },
      getTitle() {

      }
    },
    mounted() {
      let {path, query} = this.$route
      const {tabs = []} = this.$tabs
      this.tabs = tabs
      if (path === '/') {
        path = '/home'
      }
      const existTab = tabs.find(item => {
        return item.originRoute.path === path
      })
      this.$tabs.openTab({
        title: existTab ? existTab.title : (tabTitleMap[path.replace(/\/$/, '')] || '首页'),
        query,
        path,
        closeAble: path !== '/home'
      }, true)
    },
    watch: {
      '$store.state.tabs': function () {
        this.tabs = this.$tabs.tabs
      },
      '$route': function () {
        const sMenus = this.getSideMenus()
        this.hasSideMenus = sMenus.length > 1
      }
    }
  }
</script>
<style lang="less" scoped>
  .tab-bar {
    display: block;
    width: 100%;
    height: 30px;

    position: relative;
    overflow: hidden;
    box-shadow: 0px 0px 6px 0px rgba(15,37,51,0.1);
    //margin-top: 1px;

    .tabs {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      background: #fff;
      padding: 0 10px;

      img {
        width: 12px;
        height: 13px;
        margin-top: 8px;
        margin-right: 12px;
        cursor: pointer;
      }

      .tab {
        position: relative;
        //background: #d6dae0;
        transition: all 0.1s ease;
        padding: 0 20px;
        min-width: 50px;
        //border-top-left-radius: 10px;
        //border-top-right-radius: 10px;
        //margin-right: 1px;
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
        }
      }
    }
  }
</style>
