import request from "@/utils/request";
import _products from './mock/products'
import _menus from './mock/menus'

export const login  = async () => {
  return request.post('')
}

export const getMenus = async => {
  // return request.get('')
  return _menus
}

export const getProductList = async () => {
  // return request.get('')
  return _products
}

export const getMenuList = () => {
  return request.get('/aassdx')
}

export const addMenu = (data = {}, parentId) => {
  return request.post('/sdfas', {...data, parentId})
}

export const updateMenu = (data) => {
  return request.post('/asdfsadf', data)
}

export const deleteMenu = (menuId) => {
  return request.post('/sadfasd', {id: menuId})
}

export const getRoleList = () => {
  return request.get('/xxxx')
}

export const addRole = (data) => {
  return request.post('/xcvasdf', data)
}

export const updateRole = (data) => {
  return request.post('/asdfasdf', data)
}

export const deleteRole = (roleId) => {
  return request.post('/sadfasd', {id: roleId})
}
