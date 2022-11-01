import whiteList from "@/router/whiteList";
import { localPermissionListKey } from "@/config";

let permissionList = []
try {
  permissionList = JSON.parse(sessionStorage.getItem(localPermissionListKey) || '[]')
} catch (e) {
  permissionList = []
}

// 路由级权限判断
export const hasRoutePermission = (path) => {
  return true // [...whiteList, ...permissionList].includes(path)
}

/*
 * 菜单权限, 初期路由权限可通过菜单树勾选；
 * TODO 后续可能需要针对非菜单类型的路由进行权限配置
 *
 */
export const pickPermissionMenus = () => {

}
