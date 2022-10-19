export const topMenus = [
  {
    key: 'home',
    title: '首页',
    icon: require('@/assets/home-2x.png')
  },
  {
    key: 'panoramic',
    title: '全景视图',
    icon: require('@/assets/panoramic-2x.png')
  },
  {
    key: 'assets',
    title: '资产分析',
    icon: require('@/assets/assets-2x.png')
  },
  {
    key: 'product',
    title: '产品分析',
    icon: require('@/assets/product-2x.png')
  },
  {
    key: 'operation',
    title: '运营分析',
    icon: require('@/assets/operation-2x.png')
  },
  {
    key: 'client',
    title: '客户分析',
    icon: require('@/assets/client-2x.png')
  },
  // {
  //   key: 'risk',
  //   title: '风险分析',
  //   icon: require('@/assets/risk-2x.png')
  // },
  {
    key: 'combinatory',
    title: '组合分析',
    defaultPath: '/hylc_bap/combinatory/overview',
    icon: require('@/assets/combinatory-2x.png'),
    // hideProductSelector: true,
    // hideDatePicker: true,
  },
  {
    key: 'handwork',
    title: '手工录入',
    icon: require('@/assets/handwork-2x.png')
  },
  {
    key: 'setting',
    title: '系统维护',
    icon: require('@/assets/setting-2x.png')
  },
]

export const sideMenus = {
  home: [
    {
      key: 'index',
      title: '平台首页',
      path: '/home'
    }
  ],
  panoramic: [
    {
      key: 'index',
      title: '全景概览',
      path: '/zgmh/ucock-policySetting'
    }
  ],
  combinatory: [
    {
      key: 'overview',
      title: '组合总览',
      path: '/hylc_bap/combinatory/overview'
    },
    {
      key: 'cashflow',
      title: '现金流分析',
      path: '/hylc_bap/combinatory/cashflow',
    },
    {
      key: 'positioning',
      title: '持仓分析',
      path: '/hylc_bap/combinatory/positioning',
    }
  ]
}
