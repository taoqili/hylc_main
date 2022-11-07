import { homePath } from "@/config";

export default [
  {
    key: 'home',
    title: '首页',
    icon: require('@/assets/home-2x.png'),
    noBreadcrumb: true,
    children: [
      {
        key: 'homeIndex',
        title: '首页',
        path: homePath
      }
    ]
  },
  {
    key: 'overview',
    title: '全景视图',
    icon: require('@/assets/panoramic-2x.png'),
    noBreadcrumb: true,
    children: [
      {
        key: 'policySetting',
        title: '全景概览',
        path: '/zgmh/ucock-policySetting'
      }
    ]
  },
  {
    key: 'assets',
    title: '资产分析',
    icon: require('@/assets/assets-2x.png'),
    children: [
      {
        key: 'assetAnalysis',
        title: '资产管理',
        path: '/zgmh/ucock-assetAnalysis',
        // children: [
        //   {
        //     key: 'assetsQueryproduct1',
        //     title: '产品11查询',
        //     path: '/zgmh/ucock-assetsQueryproduct1'
        //   },
        // ]
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
    ]
  },
  {
    key: 'product',
    title: '产品分析',
    icon: require('@/assets/product-2x.png'),
    children: [
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
    defaultPath: '/bap/combinatory/overview',
    icon: require('@/assets/combinatory-2x.png'),
    showProductSelector: true,
    showStartDatePicker: false,
    showEndDatePicker: false,
    showDataDatePicker: false,
    children: [
      {
        key: 'combinatoryOverview',
        title: '组合总览',
        path: '/bap/combinatory/overview',
        showDataDatePicker: true,
        icon: require('@/assets/home-2x.png'),
      },
      {
        key: 'combinatoryCashflow',
        title: '现金流分析',
        path: '/bap/combinatory/cashflow',
        icon: require('@/assets/panoramic-2x.png')
      },
      {
        key: 'combinatoryPositioning',
        title: '持仓分析',
        path: '/bap/combinatory/positioning',
      }
    ]
  },
  // {
  //   key: 'handwork',
  //   title: '手工录入',
  //   icon: require('@/assets/handwork-2x.png')
  // },
  {
    key: 'setting',
    title: '系统维护',
    icon: require('@/assets/setting-2x.png'),
    children: [
      {
        key: 'menu',
        title: '菜单管理',
        path: '/main/role/menus'
      },
      {
        key: 'role',
        title: '角色管理',
        path: '/main/role/index'
      },
      {
        key: 'user',
        title: '用户管理',
        path: '/main/role/users'
      },
      {
        key: 'resource',
        title: '资源管理',
        path: '/main/role/resources'
      }
    ]
  },
]

