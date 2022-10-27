
export default {
  setTabs(store, value) {
    store.commit('setTabs', value)
  },
  setIframes(store, value) {
    store.commit('setIframes', value)
  },
  setLoadedMicroApps(store, value) {
    store.commit('setLoadedMicroApps', value)
  },
  setSideBarIsOpen(store, value) {
    store.commit('setSideBarIsOpen', value)
  },
  setSearchParams(store, value) {
    store.commit('setSearchParams', value)
  }
}
