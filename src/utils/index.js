import crypto from 'crypto'
import { sideMenus, topMenus, pathTitleMap } from "@/config";
import { isMicroApp } from './microApp'

const pathMenuMap = getPathMenuMap(sideMenus)

export * from './microApp'

export function encryptVal(val) {
  // 加密
  if (!val) return
  const key = Buffer.from('9vApxLk5G3PAsJrM', 'utf8')
  const iv = Buffer.from('FnJL7EDzjqWjcaY9', 'utf8')
  const cipher = crypto.createCipheriv('aes-128-cbc', key, iv)
  let crypted = cipher.update(val, 'utf8', 'hex')
  crypted += cipher.final('hex')
  return crypted
}

export function decryptVal(val) {
  // 解密
  const key = Buffer.from('9vApxLk5G3PAsJrM', 'utf8')
  const iv = Buffer.from('FnJL7EDzjqWjcaY9', 'utf8')
  const decipher = crypto.createDecipheriv('aes-128-cbc', key, iv)
  let str = decipher.update(val, 'hex', 'utf8')
  str += decipher.final('utf8')
  return str
}

export function randomString(length = 32) {
  const charts = 'abcdefghijklmnopqrstuvwxyz1234567890'
  let ret = ''
  for (let i = 0; i < length; i++) {
    ret += charts.charAt(Math.floor(Math.random() * charts.length))
  }
  return ret
}


export function isIframe(path) {
  // let reg = new RegExp(`${window.globalDataTemp.microApp5100}/`)
  return path.startsWith('http')
}

export const getLastDate = () => {
  const now = new Date()
  const lastDay = new Date(now - 24 * 60 * 60 * 1000)
  let year = lastDay.getFullYear()
  let month = lastDay.getMonth() + 1 < 10 ? '0' + (lastDay.getMonth() + 1) : lastDay.getMonth() + 1
  let day = lastDay.getDate() < 10 ? '0' + lastDay.getDate() : lastDay.getDate()
  return year + '-' + month + '-' + day
}

export const params2Str = (params = {}) => {
  const str = Object.keys(params).reduce((pre, cur) => {
    pre.push(cur + '=' + params[cur])
    return pre
  }, [])
  return str.join('&')
}



export const getTopMenuKey = (path = '') => {
  // 有特殊配置时直接取配置
  if (pathMenuMap[path]) {
    return pathMenuMap[path].top
  }
  // 否则按照 /microapp/top/side的规范去解析url；如果不是微应用，原则上按照/top格式去解析
  const paths = path.substring(1).split('/')
  const keyIndex = isMicroApp(path) ? 1 : 0
  return paths[keyIndex] || 'home'
}

export const getTopMenu = (key = '') => {
  return topMenus.find(item => item.key === key)
}

export const getSideMenuKey = (path = '') => {
  let defaultSideKey
  if (pathMenuMap[path]) {
    defaultSideKey = pathMenuMap[path].side
  } else {
    defaultSideKey = path.substring(1).split('/')[isMicroApp(path) ? 2 : 1]
  }
  return defaultSideKey
}

export const getSideMenuByPath = (path = '') => {
  const topKey = getTopMenuKey(path)
  const sideKey = getSideMenuKey(path)
  return getSideMenu(topKey, sideKey)
}

export const getSideMenu = (topKey= '', sideKey = '') => {
  if (!sideKey) {
    return getSideMenuByPath(topKey)
  }
  const sMenus = sideMenus[topKey] || []
  // 从侧边菜单查询sideKey是否有对应的菜单配置，如果没有获取到，则直接取侧边菜单的第一个节点（目前只支持两级）
  let defaultMenu = sMenus.find(menu => menu.key === sideKey)
  if (!defaultMenu) {
    defaultMenu = sMenus[0]
    if (defaultMenu.children && defaultMenu.children.length) {
      defaultMenu = defaultMenu.children[0]
    }
  }
  return defaultMenu
}

export const menus2pathTitleMap = (menus = [], result= {}) => {
  menus.forEach(menu => {
    if (menu.children && menu.children.length) {
      menus2pathTitleMap(menu.children, result)
    } else {
      result[menu.path] = menu.title
    }
  })
  return result
}

export const getPathTitleMapFromMenuConfig = (menuConfig = {}) => {
  let ret = {
    ...pathTitleMap
  }
  Object.keys(menuConfig).forEach(key => {
    const item = menuConfig[key]
    const map = menus2pathTitleMap(item, {})
    ret = {
      ...ret,
      ...map
    }
  })
  return ret
}

export function getPathMenuMap (sideMenus = []) {
  const result = {}
  Object.keys(sideMenus).forEach((topKey) => {
    const menus = sideMenus[topKey] || []
    menus.forEach((menu= {}) => {
      result[menu.path] = {
        top: topKey,
        side: menu.key
      }
    })
  })
  return result
}
