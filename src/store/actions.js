
export default {
  setTabs(context, value) {
    context.commit('setTabs', value)
  },
  setIframes(context, value) {
    context.commit('setIframes', value)
  },
  setLoadedMicroApps(context, value) {
    context.commit('setLoadedMicroApps', value)
  },
  setSideBarIsOpen(context, value) {
    context.commit('setSideBarIsOpen', value)
  },
  setSearchParams(context, value) {
    context.commit('setSearchParams', value)
  }
}
