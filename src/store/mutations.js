export default {
  setTabs(state, val) {
    state.tabs = val
  },
  setIframes(state, val) {
    state.iframes = val
  },
  setLoadedMicroApps(state, val) {
    state.loadedMicroApps = val
  },
  setSideBarIsOpen(state, val) {
    state.sideBarIsOpen = val
  },
  setSearchParams(state, val) {
    state.searchParams = val
  },
  updateTabMenuStatus(state, menuObj) {
    state.tabMenu.status = menuObj.status
    state.tabMenu.top = menuObj.top
    state.tabMenu.left = menuObj.left
    state.tabMenu.list = menuObj.list
  }
}
