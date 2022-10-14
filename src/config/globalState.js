import { initGlobalState } from 'qiankun'

const initialState = {
  token: '',
  userInfo: '',
  btnPermissionList: [],
  loadMicroApp: null,// 从微应用加载其他微应用页面
  openTab: null,// 从微应用打开新标签页处理
  historyAction: null, // 历史记录行为：null/push/pop
}

// 初始化 state
export const globalState = initGlobalState(initialState)
