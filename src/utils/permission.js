import whiteList from "@/router/whiteList";
export const hasRoutePermission = (path) => {
  if (whiteList.includes(path)) {
    return true
  }
  return path.indexOf('combinatory/positioning') !== -1 || path.indexOf('combinatory/overview') !== -1
}
