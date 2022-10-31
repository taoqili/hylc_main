import request from "@/utils/request";

export const login  = async () => {
  return request.post('')
}

export const getProductList = async () => {
  // return request.get('')
  return {
    result: [
      {
        value: 'aa',
        label: '黄金糕'
      }, {
        value: 'bb',
        label: '双皮奶啊水电费'
      }, {
        value: 'cc',
        label: '蚵仔煎贷款'
      }, {
        value: 'dd',
        label: '龙须面啊水电费的撒'
      }, {
        value: 'ee',
        label: '北京烤鸭'
      }
    ]
  }
}
