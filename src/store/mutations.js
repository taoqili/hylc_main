import { localTabAppKey } from '@/config'
import { randomString } from '@/utils/tools'

export default {
  setTabs(state, val) {
    if (!val || !val.length) {
      let defaultTabs = [{
        id: randomString(8),
        title: '首页',
        originRoute: {
          path: '/',
          query: {},
          params: {}
        },
        realRoute: {
          path: '/',
          query: {},
          params: {}
        },
        active: true,
        closeAble: false,
        cachePaths: [],
        history: [],
        isIframe: false
      }]
      localStorage.setItem(localTabAppKey, JSON.stringify(defaultTabs))
      state.tabs = [...defaultTabs]
      console.log('state=>', state);
      return
    }
    localStorage.setItem(localTabAppKey, JSON.stringify(val))
    state.tabs = val
  },
  setIframes(state, val) {
    state.iframes = val
  },
  setLoadedMicroApps(state, val) {
    state.loadedMicroApps = val
  },

  updateTabMenuStatus(state, menuObj) {
    state.tabMenu.status = menuObj.status
    state.tabMenu.top = menuObj.top
    state.tabMenu.left = menuObj.left
    state.tabMenu.list = menuObj.list
  }
}
