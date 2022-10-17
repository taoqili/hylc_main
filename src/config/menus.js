export const topMenus = [
  {
    key: 'home',
    title: '首页',
  },
  {
    key: 'combinatory',
    title: '组合分析',
  }
]

export const sideMenus = {
  home: [
    {
      key: 'index',
      title: '平台首页',
      path: '/home'
    }
  ],
  combinatory: [
    {
      key: 'overview',
      title: '组合总览',
      path: '/hylc_bap/combinatory/overview',
      needProductSelector: true,
      needDatePicker: true
    },
    {
      key: 'cashflow',
      title: '现金流分析',
      path: '/hylc_bap/combinatory/cashflow',
      needProductSelector: true,
      needDatePicker: false
    },
    {
      key: 'positioning',
      title: '持仓分析',
      path: '/hylc_bap/combinatory/positioning',
    }
  ]
}
