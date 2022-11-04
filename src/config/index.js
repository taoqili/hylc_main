
export * from './microApps'
export * from './globalState'
export * from './pathTitleMap'

// 本地缓存的一些key
export const localTabAppKey = 'HYLC_TAB_APP_KEY'
export const localPermissionConfigKey = 'HYLC_PERMISSION_CONFIG_KEY'
export const localSiteMenusKey = 'HYLC_SITE_MENUS_KEY'

// 一些全局配置
export const showBreadcrumb = true
export const maxTabSize = 10
export const defaultMenu = [
  { key: 'home', title: '首页', children: [{key: 'homeIndex', title: '首页', path: '/home'}] }
]
export const ignorePermission = true
