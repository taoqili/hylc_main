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
          <div>开始日: </div>
          <el-date-picker
            v-model="start"
            align="right"
            type="date"
            size="small"
            placeholder="选择日期"
            :picker-options="pickerOptions">
          </el-date-picker>
        </div>
        <div class="end-date">
          <div>结束日: </div>
          <el-date-picker
            v-model="end"
            align="right"
            size="small"
            type="date"
            placeholder="选择日期"
            :picker-options="pickerOptions">
          </el-date-picker>
        </div>
      </div>
      <div class="hylc-main-confirm">
        <el-button type="primary" plain size="mini" round>确认</el-button>
        <el-button size="mini" round>重置</el-button>
      </div>
    </div>
    <div class="menus">
      <side-menu :menus="menus" />
    </div>
  </div>
</template>

<script>
  import SideMenu from './SideMenu'
  const mockProductList = [{
    value: '选项1',
    label: '黄金糕'
  }, {
    value: '选项2',
    label: '双皮奶啊水电费'
  }, {
    value: '选项3',
    label: '蚵仔煎贷款'
  }, {
    value: '选项4',
    label: '龙须面啊水电费的撒'
  }, {
    value: '选项5',
    label: '北京烤鸭'
  }]
  export default {
    name: "SideBar",
    props: {
      menus: {
        type: Array,
        default: []
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
    data(){
      return {
        products: [],
        start: '',
        end: '',
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
      this.productList = mockProductList
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
