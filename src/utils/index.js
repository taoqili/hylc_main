import crypto from 'crypto'
import {
  localPermissionConfigKey,
  localSiteMenusKey,
  staticPathTitleMap,
  defaultMenu,
  ignorePermission, localUserInfoKey, localTokenKey, homePath
} from "@/config"
import { isMicroApp } from './microApp'

export * from './microApp'
export * from './permission'

export const getLocalPermissionConfig = () => {
  const defaultConfig = {menu: [], route: [], action: [], api: []}
  try {
    const config = sessionStorage.getItem(localPermissionConfigKey)
    return config ? JSON.parse(config) : defaultConfig
  } catch (e) {
    return defaultConfig
  }
}

export const getLocalUserInfo = () => {
  try {
    const info = sessionStorage.getItem(localUserInfoKey)
    return info ? JSON.parse(info) : {}
  } catch (e) {
    return {}
  }
}

export const formatFilterKeys = (filterKeys = [], onlyLeaf) => {
  let ret = []
  filterKeys.forEach(item => {
    const add = !onlyLeaf ? [...item.split(':')] : [item.substring(item.indexOf(':') + 1)]
    ret = [...ret, ...add]
  })
  return [...new Set(ret)]
}

const filterEmptyChildren =  (arr = [], ret = []) => {
  if (!arr.length) return []
  for (let item of arr) {
    let node = {...item}
    Reflect?.deleteProperty(node, 'children')
    ret.push(node)
    if (item.children && item.children.length) {
      node.children = []
      filterEmptyChildren(item.children, node.children)
    }
  }
  return ret
}

function filterTree (tree = [], validate = () => {}, result = []) {
  if (!tree.length) return []
  for (let item of tree) {
    if (!validate.apply(null,[item])) continue
    let node = {...item, children: []}
    result.push(node)
    if (item.children && item.children.length) filterTree(item.children, validate, node.children)
  }
  return filterEmptyChildren(result)
}

// 获取权限菜单
const pickPermissionMenus = (menus = [], filterKeys = []) => {
  const formatKeys = formatFilterKeys(filterKeys)
  return filterTree(menus,(menu) => {
    return formatKeys.includes(menu.key)
  })
}

export const getSiteMenus = () => {
  const {menu: menuFilterKeys = []} = getLocalPermissionConfig()
  try {
    const allMenus = JSON.parse(sessionStorage.getItem(localSiteMenusKey) || '[]')
    if (!allMenus.length) {
      return defaultMenu
    }
    if (ignorePermission) {
      return allMenus
    }
    return pickPermissionMenus(allMenus, menuFilterKeys)
  } catch (e) {
    return []
  }
}

export const encryptVal = (val) => {
  // 加密
  if (!val) return
  const key = Buffer.from('9vApxLk5G3PAsJrM', 'utf8')
  const iv = Buffer.from('FnJL7EDzjqWjcaY9', 'utf8')
  const cipher = crypto.createCipheriv('aes-128-cbc', key, iv)
  let crypted = cipher.update(val, 'utf8', 'hex')
  crypted += cipher.final('hex')
  return crypted
}

export const decryptVal = (val) => {
  // 解密
  const key = Buffer.from('9vApxLk5G3PAsJrM', 'utf8')
  const iv = Buffer.from('FnJL7EDzjqWjcaY9', 'utf8')
  const decipher = crypto.createDecipheriv('aes-128-cbc', key, iv)
  let str = decipher.update(val, 'hex', 'utf8')
  str += decipher.final('utf8')
  return str
}

export const randomString = (length = 32) => {
  const charts = 'abcdefghijklmnopqrstuvwxyz1234567890'
  let ret = ''
  for (let i = 0; i < length; i++) {
    ret += charts.charAt(Math.floor(Math.random() * charts.length))
  }
  return ret
}

export const isIframe = (path) => {
  // let reg = new RegExp(`${window.globalDataTemp.microApp5100}/`)
  return path.startsWith('http')
}

export const getYearFirstDay = (year) => {
  return `${year || new Date().getFullYear()}-01-01`
}

export const getLastDate = () => {
  const now = new Date()
  const lastDay = new Date(now - 24 * 60 * 60 * 1000)
  let year = lastDay.getFullYear()
  let month = lastDay.getMonth() + 1 < 10 ? '0' + (lastDay.getMonth() + 1) : lastDay.getMonth() + 1
  let day = lastDay.getDate() < 10 ? '0' + lastDay.getDate() : lastDay.getDate()
  return year + '-' + month + '-' + day
}

export const params2Search = (params = {}) => {
  const str = Object.keys(params).reduce((pre, cur) => {
    pre.push(cur + '=' + params[cur])
    return pre
  }, [])
  return str.join('&')
}

export const search2Params = (search = '') => {
  const params = search.split('&').reduce((pre, cur) => {
    const [key, value] = cur.split('=')
    if (key && value) {
      pre[key] = value
    }
    return pre
  }, {})
  return params
}

export const getTopMenuKeyByPath = (path = '') => {
  if (path === '/') {
    path = homePath
  }
  const pathMenuMap = getPathMenuMap()
  // 有特殊配置时直接取配置
  if (pathMenuMap[path]) {
    return pathMenuMap[path].top
  }
  // 否则按照 /microapp/top/side的规范去解析url；如果不是微应用，原则上按照/top/side格式去解析
  const paths = path.substring(1).split('/')
  const keyIndex = isMicroApp(path) ? 1 : 0
  return paths[keyIndex] || 'home'
}

export const getTopMenuByKey = (topKey = '') => {
  const siteMenus = getSiteMenus()
  return siteMenus.find(item => item.key === topKey)
}

export const getTopMenuByPath = (path = '') => {
  if (path === '/') {
    path = homePath
  }
  const topKey = getTopMenuKeyByPath(path)
  return getTopMenuByKey(topKey)
}

export const getSideMenuKeyByPath = (path = '') => {
  if (path = '/') {
    path = homePath
  }
  const pathMenuMap = getPathMenuMap()
  // 有特殊配置时直接取配置
  if (pathMenuMap[path]) {
    return pathMenuMap[path].side
  }
  // 否则按照 /microapp/top/side的规范去解析url；如果不是微应用，原则上按照/top/side格式去解析
  const paths = path.substring(1).split('/')
  const keyIndex = isMicroApp(path) ? 2 : 1
  return paths[keyIndex] || ('index_' + setTimeout(() => {
  }))
}

export const getSideMenuByPath = (path = '') => {
  if (path === '/') {
    path = homePath
  }
  const topKey = getTopMenuKeyByPath(path)
  const sideKey = getSideMenuKeyByPath(path)
  return getSideMenuByKey(topKey, sideKey)
}

export const getSideMenusByKey = (topKey = '') => {
  const siteMenus = getSiteMenus()
  const sMenus = siteMenus.find(item => item.key === topKey)
  return sMenus ? sMenus.children : []
}

export const getSideMenuByKey = (topKey = '', sideKey = '') => {
  const sideMenus = getSideMenusByKey(topKey)
  // 从侧边菜单查询sideKey是否有对应的菜单配置，如果没有获取到，则直接取侧边菜单的第一个节点（目前只支持两级）
  let defaultSideMenu = sideMenus.find(menu => menu.key === sideKey)
  if (!defaultSideMenu) {
    defaultSideMenu = sideMenus[0]
    // 下探2级，多了暂时不做支持
    if (defaultSideMenu.children && defaultSideMenu.children.length) {
      defaultSideMenu = defaultSideMenu.children[0]
    }
  }
  return defaultSideMenu
}

export const getPathTitleMapFromSideMenus = (menus = [], result = {}) => {
  menus.forEach(menu => {
    if (menu.children && menu.children.length) {
      getPathTitleMapFromSideMenus(menu.children, result)
    } else {
      result[menu.path] = menu.title
    }
  })
  return result
}


export const getPathTitleMapFromMenus = () => {
  let ret = {
    ...staticPathTitleMap
  }
  const siteMenus = getSiteMenus()
  const tmp = {}
  siteMenus.forEach(menu => {
    const sideMenus = menu.children || []
    const map = getPathTitleMapFromSideMenus(sideMenus, tmp)
    ret = {...ret, ...map}
  })
  return ret
}

export function getPathMenuMap() {
  const result = {}
  const siteMenus = getSiteMenus()
  siteMenus.forEach(menu => {
    const sideMenus = menu.children || []
    sideMenus.forEach(sideMenu => {
      result[sideMenu.path] = {
        top: menu.key,
        side: sideMenu.key
      }
    })
  })
  return result
}

export const filterSearchParams = (params = {}, filterKeys = []) => {
  const newParams = {}
  filterKeys.forEach(key => {
    newParams[key] = params[key]
  })
  return newParams
}

export const doLocalLogout = () => {
  sessionStorage.removeItem(localTokenKey)
  sessionStorage.removeItem(localPermissionConfigKey)
  sessionStorage.removeItem(localSiteMenusKey)
}

export const doLocalLogin = ({token = '', siteMenus = [], permissionConfig = {}}) => {
  sessionStorage.setItem(localTokenKey, token)
  sessionStorage.setItem(localSiteMenusKey, JSON.stringify(siteMenus))
  sessionStorage.setItem(localPermissionConfigKey, JSON.stringify(permissionConfig))
}
