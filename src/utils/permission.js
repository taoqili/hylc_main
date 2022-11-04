import whiteList from "@/router/whiteList";
import { ignorePermission, localPermissionConfigKey } from "@/config";
import { getLocalPermissionConfig } from "@/utils/index";

// 路由权限判断
export const hasRoutePermission = (path) => {
  if (ignorePermission) {
    return true
  }
  const { route: routePermissionList } = getLocalPermissionConfig()
  return [...whiteList, ...routePermissionList].includes(path)
}

// 操作权限判断
export const hasActionPermission = (actionName) => {
  return true
}

// API权限判断
export const hasApiPermission = (api) => {
  return true
}


export const hasLogin = () => !!sessionStorage.getItem(localPermissionConfigKey)
