// 本地缓存的一些key
export const localTabAppKey = 'HYLC_TAB_APP_KEY'
export const localPermissionConfigKey = 'HYLC_PERMISSION_CONFIG_KEY'
export const localSiteMenusKey = 'HYLC_SITE_MENUS_KEY'
export const localTokenKey = 'HYLC_TOKEN_KEY'
export const localUserInfoKey = 'HYLC_USER_INFO_KEY'

// 一些全局配置
export const homePath = '/main/home'
export const showBreadcrumb = false
export const filterPosition = 'top' // or 'sidebar'
export const defaultMenu = [
  { key: 'home', title: '首页', children: [{key: 'homeIndex', title: '首页', path: homePath}] }
]
export const ignorePermission = false
export const permissionTip = '您暂无访问权限，请联系管理员后再试！'
export const maxTabSize = 10
export const tabOverSizeTip = `您已开启超过${maxTabSize}个标签页，将严重拖慢系统响应速度，建议关闭一些不常用标签以提升性能！`

export * from './microApps'
export * from './globalState'
export * from './pathTitleMap'
export * from './whilteRouteList'




