import whiteList from "@/router/whiteList";
import { localPermissionConfigKey } from "@/config";

// 路由级权限判断
export const hasRoutePermission = (path) => {
  return true // [...whiteList, ...permissionList].includes(path)
}

// 操作权限判断
export const hasActionPermission = (actionName) => {
  return true
}

export const hasApiPermission = (api) => {
  return true
}

export const hasLogin = () => !!sessionStorage.getItem(localPermissionConfigKey)
