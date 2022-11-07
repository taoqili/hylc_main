// 本地缓存的一些key
export const localTabAppKey = 'HYLC_TAB_APP_KEY'
export const localPermissionConfigKey = 'HYLC_PERMISSION_CONFIG_KEY'
export const localSiteMenusKey = 'HYLC_SITE_MENUS_KEY'

// 一些全局配置
export const homePath = '/main/home'
export const showBreadcrumb = false
export const maxTabSize = 10
export const filterPosition = 'top' // or 'sidebar'
export const defaultMenu = [
  { key: 'home', title: '首页', children: [{key: 'homeIndex', title: '首页', path: homePath}] }
]
export const ignorePermission = true

export * from './microApps'
export * from './globalState'
export * from './pathTitleMap'
export * from './whilteRouteList'




