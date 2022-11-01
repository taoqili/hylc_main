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
