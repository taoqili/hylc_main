import store from "@/store";
import { loadMicroApp } from "qiankun";
import { microAppList } from "@/config";
import $tabs from '@/utils/tabs'

export const isMicroApp = (path) => {
  return !!microAppList.some(item => {
    return path.startsWith(item.activeRule)
  })
}

// 查找当前页签是否是微应用下的页面，并返回对应微应用配置项
export const findMicroAppByPath = (path) => {
  return microAppList.find(item => {
    let activeRule = item.activeRule
    return path.startsWith(activeRule)
  })
}

// 创建微应用
export const createMicroApp = (path) => {
  return new Promise((resolve, reject) => {
    const loadedMicroApps = {...store.state.loadedMicroApps} // 已手动挂载的微应用对象
    const microApp = findMicroAppByPath(path)
    // 非微应用直接跳转
    if (!microApp) {
      resolve()
      return
    }

    // 已经加载微应用也直接跳转
    if (loadedMicroApps[microApp.name]) {
      resolve()
      return
    }

    try {
      loadedMicroApps[microApp.name] = loadMicroApp(
        {
          ...microApp,
          props: {
            token: 'asdfd',
            userInfo: 'taoqili',
            permissionList: {
              menu: ['home:homeIndex', 'role:users'],
              action: ['actionName'],
              route: ['/home', '/role/users'],
              api: ['/api/users/get']
            },
            tabUtil: $tabs,
            historyAction: null, // 历史记录行为：null/push/pop
          }
        },
        {
          sandbox: {
            experimentalStyleIsolation: true
          }
        },
        {
          afterMount: () => {
            store.commit('setPageLoaderIsShow', false)
          },
          afterUnmount: () => {
          }
        }
      ) // 加载微应用
      store.commit('setLoadedMicroApps', loadedMicroApps)
      console.log('已挂载的微应用==>', store.state.loadedMicroApps)
      resolve()
    } catch (err) {
      reject(err)
      console.log(err)
    }
  })
}
