
<script>
  import { getSideMenuKey } from "@/utils/tools";

  export default {
    name: "SideMenu",
    props: {
      menus: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        cachePageMap: {}
      }
    },
    methods: {
      renderMenus(menus = []) {
        const { cachePageMap } = this
        return (
            menus.map(menu => {
              cachePageMap[menu.key] = menu
              return (
                <el-menu-item index={menu.key} key={menu.key}>{menu.title}</el-menu-item>
              )
            })
        )
      },
      handleSelect(selected) {
        const menu = this.cachePageMap[selected]
        this.$emit('side-menu-selected', menu)
      }
    },
    render(createElement, context) {
      const { menus, renderMenus, handleSelect, cachePageMap } = this
      // 侧边只有一个子菜单时不需要展示
      if (menus.length <= 1) {
        return null
      }
      const defaultSideKey = getSideMenuKey(this.$route.path)
      return (
        <div class="hylc-main-side-menu-wrapper">
          <el-menu defaultActive={defaultSideKey} onSelect={handleSelect}>
            {
              menus.map((menu) => {
                if (menu.children && menu.children.length) {
                  return (
                    <el-submenu key={menu.key} index={menu.key}>
                      <template slot="title">
                        <span>{menu.title}</span>
                      </template>
                      {renderMenus(menu.children)}
                    </el-submenu>
                  )
                }
                cachePageMap[menu.key] = menu
                return (
                  <el-menu-item index={menu.key} key={menu.key}>{menu.title}</el-menu-item>
                )
              })
            }
          </el-menu>
        </div>
      )
    }
  }
</script>

<style lang="less">
  .hylc-main-side-menu-wrapper {
    .el-menu {
      border-right: none;
    }
    .el-menu-item {
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 600;
      color: #5D6265;
      line-height: 36px;
      height: 36px;
      &.is-active {
        color: #409EFF;
        background: rgb(237, 245, 255);
      }
    }
    .el-submenu {
      .el-menu-item {
        padding-left: 28px !important;
        padding-right: 0;
        min-width: 100px;
        line-height: 36px;
        height: 36px;
      }
    }
  }

</style>
