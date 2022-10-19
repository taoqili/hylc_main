export const topMenus = [
  {
    key: 'home',
    title: '首页',
    icon: require('@/assets/home-2x.png')
  },
  // {
  //   key: 'test',
  //   title: '测试',
  //   icon: require('@/assets/client-2x.png')
  // },
  {
    key: 'overview',
    title: '全景视图',
    icon: require('@/assets/panoramic-2x.png')
  },
  {
    key: 'assets',
    title: '资产分析',
    icon: require('@/assets/assets-2x.png'),
    hideProductSelector: true,
    hideDatePicker: true
  },
  {
    key: 'product',
    title: '产品分析',
    icon: require('@/assets/product-2x.png')
  },
  // {
  //   key: 'operation',
  //   title: '运营分析',
  //   icon: require('@/assets/operation-2x.png')
  // },
  // {
  //   key: 'client',
  //   title: '客户分析',
  //   icon: require('@/assets/client-2x.png')
  // },
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
  },
  // {
  //   key: 'handwork',
  //   title: '手工录入',
  //   icon: require('@/assets/handwork-2x.png')
  // },
  // {
  //   key: 'setting',
  //   title: '系统维护',
  //   icon: require('@/assets/setting-2x.png')
  // },
]

export const sideMenus = {
  home: [
    {
      key: 'index',
      title: '平台首页',
      path: '/home'
    }
  ],
  // test: [
  //   {
  //     key: 'a',
  //     title: '测试a',
  //     path: '/dd/test/a'
  //   },
  //   {
  //     key: 'b',
  //     title: '测试b',
  //     path: '/dd/test/b'
  //   },
  //   {
  //     key: 'c',
  //     title: '测试c',
  //     path: '/dd/test/c'
  //   },
  // ],
  overview: [
    {
      key: 'policySetting',
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
  ],
  assets: [
    {
      key: 'assetAnalysis',
      title: '资产管理',
      path: '/zgmh/ucock-assetAnalysis'
    },
    {
      key: 'assetsQueryproduct',
      title: '产品查询',
      path: '/zgmh/ucock-assetsQueryproduct'
    },
    {
      key: 'productinvestmentFunds',
      title: '科创投资',
      path: '/zgmh/ucock-productinvestmentFunds'
    }
  ],
  product: [
    {
      key: 'projectInvest',
      title: '产品管理',
      path: '/zgmh/ucock-projectInvest'
    },
    {
      key: 'productAccount',
      title: '历史业绩',
      path: '/zgmh/ucock-productAccount'
    },
    {
      key: 'productQueryAssets',
      title: '资产查询',
      path: '/zgmh/ucock-productQueryAssets'
    },
    {
      key: 'tradeBenchmarkingAnalysis',
      title: '同业对标',
      path: '/zgmh/ucock-tradeBenchmarkingAnalysis'
    },
    {
      key: 'productFlow',
      title: '资金流追踪',
      path: '/zgmh/ucock-productFlow'
    }
  ]
}

