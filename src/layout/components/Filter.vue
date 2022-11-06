<template>
  <div class="hylc-layout-filter">
      <el-form :inline="true" :model="formData" class="demo-form-inline">
        <el-form-item label="产品选择:" v-show="showProductSelector">
          <el-select
            class="hylc-layout-filter-select"
            size="small"
            multiple
            v-model="formData.products"
            filterable
            :filter-method="filter"
            @change="fixStyle"
            collapse-tags
            default-first-option
            placeholder="请选择产品"
            style="width: 250px"
          >
            <el-option
              v-for="item in productList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="数据日期:" v-if="showDataDatePicker">
          <el-date-picker
            v-model="formData.dataDate"
            style="width: 140px"
            align="right"
            type="date"
            value-format="yyyy-MM-dd"
            size="small"
            placeholder="选择日期"
            :picker-options="pickerOptions">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="开始日期:" v-if="showStartDatePicker">
          <el-date-picker
            style="width: 140px"
            v-model="formData.startDate"
            align="right"
            type="date"
            value-format="yyyy-MM-dd"
            size="small"
            placeholder="选择日期"
            :picker-options="pickerOptions">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束日期:" v-if="showEndDatePicker">
          <el-date-picker
            v-model="formData.endDate"
            style="width: 140px"
            align="right"
            type="date"
            value-format="yyyy-MM-dd"
            size="small"
            placeholder="选择日期"
            :picker-options="pickerOptions">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" plain size="mini" round @click="confirmSearchParams">确认</el-button>
          <el-button size="mini" round @click="resetSearchParams">重置</el-button>
        </el-form-item>
      </el-form>
  </div>
</template>

<script>
  import { getLastDate, getYearFirstDay, params2Str } from "@/utils";
  import { getProductList } from "@/api";
  import { filterPosition } from "@/config";

  export default {
    name: "myFilter",
    props: {
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
    data() {
      const {query = {}} = this.$route
      const {products = [], startDate, endDate, dataDate} = query
      return {
        formData: {
          products: products,
          startDate: startDate || getYearFirstDay(),
          endDate: endDate || getLastDate(),
          dataDate: dataDate || getLastDate(),
        },
        productList: [],
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
      }
    },
    mounted() {
      if (filterPosition === 'top') {
        getProductList().then((res = {}) => {
          const ret = res.result || []
          this.selectOptions = ret
          this.productList = ret
        })
      }
    },
    methods: {
      confirmSearchParams() {
        const lastDate = getLastDate()
        const {startDate, endDate, dataDate, products = []} = this.formData
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
        const paramsStr = params2Str(params)
        this.$router.replace(`${location.pathname}?${paramsStr}`)
        this.$store.commit('setSearchParams', params)
      },
      resetSearchParams() {
        const lastDate = getLastDate()
        const startDate = getYearFirstDay()
        this.formData = {
          products: '',
          startDate: startDate,
          endDate: lastDate,
          dataDate: lastDate
        }
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
        this.$router.replace(`${location.pathname}?${params2Str(params)}`)
        this.$store.commit('setSearchParams', params)
      },
      fixStyle(e) {
        setTimeout(() => {
          const tagsWrap = document.querySelector('.hylc-layout-filter-select .el-select__tags')
          const childrenSpan = tagsWrap?.querySelectorAll('span > span')
          tagsWrap.style.maxWidth = childrenSpan.length > 2 ? '164px' : '218px'
        })
      },
      filter(value) {
        const products = this.selectOptions.filter(item => item.value.indexOf(value) !== -1 || item.label.indexOf(value) !== -1)
        this.productList = products
      },
    }
  }
</script>

<style lang="less">
  .hylc-layout-filter {
    .el-button--mini, .el-button--mini.is-round {
      padding: 7px 27px;
      border-radius: 6px;
    }
    .el-select {
      .el-select__tags {
        flex-wrap: nowrap;
      }
    }
  }
</style>
