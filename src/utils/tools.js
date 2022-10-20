import crypto from 'crypto'
import { isMicroApp, sideMenus, topMenus } from "@/config";
import pathMenuMap from '@/config/pathMenuMap'

const os = require('os')

export function encryptVal(val) {
  // 加密
  if (!val) return
  const key = Buffer.from('9vApxLk5G3PAsJrM', 'utf8')
  const iv = Buffer.from('FnJL7EDzjqWjcaY9', 'utf8')
  const cipher = crypto.createCipheriv('aes-128-cbc', key, iv)
  var crypted = cipher.update(val, 'utf8', 'hex')
  crypted += cipher.final('hex')
  return crypted
}

export function decryptVal(val) {
  // 解密
  const key = Buffer.from('9vApxLk5G3PAsJrM', 'utf8')
  const iv = Buffer.from('FnJL7EDzjqWjcaY9', 'utf8')
  const decipher = crypto.createDecipheriv('aes-128-cbc', key, iv)
  var str = decipher.update(val, 'hex', 'utf8')
  str += decipher.final('utf8')
  return str
}

export function deepClone(target) {
  // 定义一个变量
  let result
  // 如果当前需要深拷贝的是一个对象的话
  if (typeof target === 'object') {
    // 如果是一个数组的话
    if (Array.isArray(target)) {
      result = [] // 将result赋值为一个数组，并且执行遍历
      for (let i in target) {
        // 递归克隆数组中的每一项
        result.push(deepClone(target[i]))
      }
      // 判断如果当前的值是null的话；直接赋值为null
    } else if (target === null) {
      result = null
      // 判断如果当前的值是一个RegExp对象的话，直接赋值
    } else if (target.constructor === RegExp) {
      result = target
    } else {
      // 否则是普通对象，直接for in循环，递归赋值对象的所有值
      result = {}
      for (let i in target) {
        result[i] = deepClone(target[i])
      }
    }
    // 如果不是对象的话，就是基本数据类型，那么直接赋值
  } else {
    result = target
  }
  // 返回最终结果
  return result
}

export function randomString(e) {
  // 随机字符串
  e = e || 32
  var t = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678',
    a = t.length,
    n = ''
  for (let i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a))
  return n
}

export function getLabel(value, dist) {
  let res = dist.filter(item => item.value === value)[0]
  if (res) {
    return res.label
  } else {
    return ''
  }
}

// 将时间戳处理为字符串
export function handleDateToString(time, showHMS) {
  if (!time) {
    return '--'
  }
  let date
  if (time instanceof Date) {
    date = time
  } else {
    date = new Date(time)
  }
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  let hour = date.getHours()
  let minute = date.getMinutes()
  let second = date.getSeconds()
  month = month < 10 ? '0' + month : month
  day = day < 10 ? '0' + day : day
  hour = hour === 0 ? '00' : hour < 10 ? '0' + hour : hour
  minute = minute === 0 ? '00' : minute < 10 ? '0' + minute : minute
  second = second === 0 ? '00' : second < 10 ? '0' + second : second
  return year + '-' + month + '-' + day + (showHMS ? ' ' + hour + ':' + minute + ':' + second : '')
}

// 将时间戳处理为字符串
export function handleDateTimeToString(time) {
  if (!time) {
    return '--'
  }
  let date
  if (time instanceof Date) {
    date = time
  } else {
    date = new Date(time)
  }
  let hour = date.getHours()
  let minute = date.getMinutes()
  let second = date.getSeconds()

  hour = hour === 0 ? '00' : hour < 10 ? '0' + hour : hour
  minute = minute === 0 ? '00' : minute < 10 ? '0' + minute : minute
  second = second === 0 ? '00' : second < 10 ? '0' + second : second
  return hour + ':' + minute + ':' + second
}

export function resolveTime(time) {
  let str = handleDateToString(time, true)
  return str.split(' ')[0] + ' ' + str.split(' ')[1]
}

export function getCurrentIp() {
  let localhost = ''
  try {
    const network = os.networkInterfaces()
    network[Object.keys(network)[0]].forEach(function (details) {
      if (localhost === '' && details.family === 'IPv4' && !details.internal) {
        localhost = details.address
        return
      }
    })
  } catch (e) {
    localhost = '127.0.0.1'
  }
  return localhost
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

export const getPath2MenuMap = () => {
  //TODO 先配置，后续需要通过topMenus以及sideMenus自动生成
  return pathMenuMap
}

export const getTopMenuKey = (path = '') => {
  // 有特殊配置时直接取配置
  const path2MenuMap = getPath2MenuMap()
  if (path2MenuMap[path]) {
    return path2MenuMap[path].top
  }
  // 否则按照 /microapp/top/side的规范去解析url；如果不是微应用，原则上按照/top格式去解析,side设置默认值index
  const paths = path.substring(1).split('/')
  const keyIndex = isMicroApp(path) ? 1 : 0
  return paths[keyIndex] || 'home'
}

export const getTopMenu = (key = '') => {
  return topMenus.find(item => item.key === key)
}

export const getSideMenuKey = (path = '') => {
  const pathMenuMap = getPath2MenuMap()
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
