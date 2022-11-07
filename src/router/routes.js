import { homePath } from "@/config";

export default [
  {
    path: "/",
    name: "index",
    redirect: homePath
  },
  {
    path: "/main",
    name: "index",
    redirect: homePath
  },
  {
    path: homePath,
    name: "首页",
    component: () =>
      import(/* webpackChunkName: "Home" */ "@/views/home/index.vue"),
  },
  {
    path: "/login",
    name: "登录",
    component: () =>
      import(/* webpackChunkName: "Login" */ "@/views/login/index.vue"),
    meta: {
      single: true,
    },
  },
  {
    path: '/main/role/index',
    name: '角色管理',
    component: () => import(/* webpackChunkName: "RoleIndex" */ "@/views/role/index/index.vue"),
  },
  {
    path: '/main/role/menus',
    name: '菜单管理',
    component: () => import(/* webpackChunkName: "RoleMenus" */ "@/views/role/menus/index.vue"),
  },
  {
    path: '/main/role/resources',
    name: '资源管理',
    exact: true,
    component: () => import(/* webpackChunkName: "RoleResources" */ "@/views/role/resources/index.vue"),
  },
  {
    path: '/main/role/users',
    name: '用户管理',
    exact: true,
    component: () => import(/* webpackChunkName: "RoleUsers" */ "@/views/role/users/index.vue"),
  }
];
