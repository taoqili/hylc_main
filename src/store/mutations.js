import { localTabAppKey } from '@/config'
// import { randomString } from '@/utils/tools'

export default {
  setTabs(state, val) {
    localStorage.setItem(localTabAppKey, JSON.stringify(val || []))
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
