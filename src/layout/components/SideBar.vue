<template>
  <div class="wrapper" :style="{ height: `calc(100vh - ${showFilter ? '167' : '115'}px)`}">
    <div class="extra" v-if="filterPosition !== 'sidebar' ? false : showFilter">
      <div class="hylc-main-product-selector" v-if="showProductSelector">
        <el-select
          v-model="products"
          size="small"
          multiple
          filterable
          :filter-method="filter"
          collapse-tags
          default-first-option
          placeholder="请选择产品"
        >
          <el-option
            v-for="item in productList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="hylc-main-date-picker">
        <div class="start-date" v-if="showStartDatePicker">
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
        <div class="end-date" v-if="showEndDatePicker">
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
        <div class="data-date" v-if="showDataDatePicker">
          <div>数据日:</div>
          <el-date-picker
            v-model="dataDate"
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
      <side-menu :menus="menus" :is-collapsed="sideMenuIsCollapsed" v-on:side-menu-selected="onSelect"/>
    </div>
  </div>
</template>

<script>
  import { getProductList } from '@/api'
  import SideMenu from './SideMenu'
  import {
    getLastDate,
    params2Search,
    createMicroApp,
    hasRoutePermission,
    getYearFirstDay,
    getTopMenuByPath, filterSearchParams
  } from "@/utils";
  import { filterPosition } from "@/config";
  import { mapState } from 'vuex'

  export default {
    name: "SideBar",
    props: {
      menus: {
        type: Array,
        default: () => {
          return []
        }
      },
      showProductSelector: {
        type: Boolean,
        default: false
      },
      showDataDatePicker: {
        type: Boolean,
        default: false
      },
      showStartDatePicker: {
        type: Boolean,
        default: false
      },
      showEndDatePicker: {
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
      const {products = '', startDate, endDate, dataDate} = query
      const realProducts = products ? products.split(',') : ''
      return {
        filterPosition,
        products: realProducts,
        startDate: startDate || getYearFirstDay(),
        endDate: endDate || lastDate,
        dataDate: dataDate || lastDate,
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
      if (filterPosition === 'sidebar') {
        getProductList().then((res = {}) => {
          const ret = res.result || []
          this.selectOptions = ret
          this.productList = ret
        })
      }
    },
    computed: {
      ...mapState({
        searchParams: state => state.searchParams,
        sideMenuIsCollapsed: state => state.sideMenuIsCollapsed
      }),
      showFilter() {
        return this.showProductSelector || this.showDataDatePicker || this.showStartDatePicker || this.showEndDatePicker
      }
    },
    methods: {
      filter(value) {
        const products = this.selectOptions.filter(item => item.value.indexOf(value) !== -1 || item.label.indexOf(value) !== -1)
        this.productList = products
      },
      onSelect(page) {
        const {path, title} = page
        if (path === this.$route.path) {
          return
        }
        if (!hasRoutePermission(path)) {
          this.$message({type: 'error', message: '您暂无访问权限，请联系管理员后再试！', offset: 87, duration: 1500})
          return
        }
        const topMenu = getTopMenuByPath(path)
        const filterKeys = [];
        if (topMenu.showProductSelector) {
          filterKeys.push('products')
        }
        if (topMenu.showDataDatePicker) {
          filterKeys.push('dataDate')
        }
        if (topMenu.showStartDatePicker) {
          filterKeys.push('startDate')
        }
        if (topMenu.showEndDatePicker) {
          filterKeys.push('endDate')
        }
        this.open({
          path,
          title,
          query: filterSearchParams(this.searchParams, filterKeys) || {}
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
        const {startDate, endDate, dataDate, products = []} = this
        const params = {}
        if (this.showDataDatePicker) {
          params.dataDate = dataDate || lastDate
        }
        if (this.showProductSelector) {
          params.products = products && products.length ? products.join(',') : ''
        }
        if (this.showStartDatePicker) {
          params.startDate = startDate || getYearFirstDay()
        }
        if (this.showEndDatePicker) {
          params.endDate = endDate || lastDate
        }
        const paramsStr = params2Search(params)
        this.$router.replace(`${location.pathname}?${paramsStr}`)
        this.$store.commit('setSearchParams', params)
      },
      resetSearchParams() {
        const lastDate = getLastDate()
        const startDate = getYearFirstDay()
        this.products = ''
        this.dataDate = lastDate
        this.startDate = startDate
        this.endDate = lastDate
        const params = {}
        if (this.showProductSelector) {
          params.products = ''
        }
        if (this.showDataDatePicker) {
          params.dataDate = lastDate
        }
        if (this.showStartDatePicker) {
          params.startDate = startDate
        }
        if (this.showEndDatePicker) {
          params.endDate = lastDate
        }
        this.$router.replace(`${location.pathname}?${params2Search(params)}`)
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
    border-radius: 4px;
    box-shadow: 3px 3px 6px 0px #ddd;

    .extra {
      padding: 16px;
      border-bottom: 1px solid #eee;

      .start-date,
      .end-date,
      .data-date {
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
