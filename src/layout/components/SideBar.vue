<template>
  <div class="wrapper">
    <div class="extra" v-if="!(hideDatePicker && hideProductSelector)">
      <div class="hylc-main-product-selector" v-if="!hideProductSelector">
        <el-select
          v-model="products"
          size="small"
          multiple
          collapse-tags
          placeholder="请选择产品">
          <el-option
            v-for="item in productList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="hylc-main-date-picker" v-if="!hideDatePicker">
        <div class="start-date">
          <div>开始日:</div>
          <el-date-picker
            v-model="startDate"
            align="right"
            type="date"
            value-format="yyyy-MM-dd"
            size="small"
            placeholder="选择日期"
            :picker-options="pickerOptions">
          </el-date-picker>
        </div>
        <div class="end-date">
          <div>结束日:</div>
          <el-date-picker
            v-model="endDate"
            align="right"
            size="small"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
            :picker-options="pickerOptions">
          </el-date-picker>
        </div>
      </div>
      <div class="hylc-main-confirm">
        <el-button type="primary" plain size="mini" round @click="confirmSearchParams">确认</el-button>
        <el-button size="mini" round @click="resetSearchParams">重置</el-button>
      </div>
    </div>
    <div class="menus">
      <side-menu :menus="menus" v-on:side-menu-selected="onSelect"/>
    </div>
  </div>
</template>

<script>
  import { getProductList } from '@/api'
  import SideMenu from './SideMenu'
  import { getLastDate, params2Str, createMicroApp, hasRoutePermission } from "@/utils";

  export default {
    name: "SideBar",
    props: {
      menus: {
        type: Array,
        default: () => {
          return []
        }
      },
      hideProductSelector: {
        type: Boolean,
        default: false
      },
      hideDatePicker: {
        type: Boolean,
        default: false
      }
    },
    components: {
      SideMenu
    },
    data() {
      const lastDate = getLastDate()
      const {query = {}} = this.$route
      const {products = '', startDate, endDate} = query
      const realProducts = products ? products.split(',') : ''
      return {
        products: realProducts,
        startDate: startDate || lastDate,
        endDate: endDate || lastDate,
        searchParams: {
          products: realProducts,
          startDate: startDate || lastDate,
          endDate: endDate || lastDate
        },
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        productList: []
      }
    },
    mounted() {
      getProductList().then((res = {}) => {
        this.productList = res.result || []
      })
    },
    methods: {
      onSelect(page) {
        const {path, title} = page
        if (path === this.$route.path) {
          return
        }
        if (!hasRoutePermission(path)) {
          this.$message({type: 'error', message: '您暂无访问权限，请联系管理员后再试！', offset: 87, duration: 1500})
          return
        }
        this.open({
          path,
          title,
          query: this.searchParams || {}
        })
      },
      open(page) {
        let {path, query, title} = page
        createMicroApp(path).then(res => {
          this.$tabs.openTab({
            title,
            path,
            query
          })
        })
      },
      confirmSearchParams() {
        const lastDate = getLastDate()
        const {startDate, endDate, products = []} = this
        const params = {
          startDate: startDate || lastDate,
          endDate: endDate || lastDate,
          products: products && products.length ? products.join(',') : ''
        }
        const paramsStr = params2Str(params)
        this.$router.replace(`${location.pathname}?${paramsStr}`)
        this.searchParams = params
        this.$store.commit('setSearchParams', params)
      },
      resetSearchParams() {
        const lastDate = getLastDate()
        this.products = ''
        this.startDate = lastDate
        this.endDate = lastDate
        const params = {
          products: '',
          startDate: lastDate,
          endDate: lastDate
        }
        this.$router.replace(`${location.pathname}?${params2Str(params)}`)
        this.searchParams = params
        this.$store.commit('setSearchParams', params)
      }

    }
  }
</script>

<style lang="less">
  .hylc-main-product-selector {
    margin-bottom: 10px;

    .el-select {
      .el-select__tags {
        max-width: 124px !important;
        flex-wrap: nowrap;
      }
    }
  }

  .hylc-main-date-picker {
    .el-input--suffix .el-input__inner {
      padding-right: 12px;
    }
  }

  .hylc-main-confirm {
    text-align: center;
    padding-top: 6px;

    .el-button--mini, .el-button--mini.is-round {
      padding: 4px 27px;
      border-radius: 6px;
    }
  }
</style>

<style lang="less" scoped>
  .wrapper {
    background: #fff;
    margin-right: 16px;
    padding-bottom: 200px;
    border-radius: 4px;
    box-shadow: 3px 3px 6px 0px #ddd;

    .extra {
      margin-bottom: 16px;
      padding: 16px 16px 0;

      .start-date,
      .end-date {
        display: flex;
        word-break: keep-all;
        justify-content: center;
        justify-items: center;
        align-items: center;
        margin-bottom: 10px;
        align-content: center;

        > div:first-child {
          color: #7E8284;
          margin-right: 8px;
        }
      }
    }
  }
</style>
