export default [
  {
    path: "/",
    name: "index",
    redirect: '/home'
  },
  {
    path: "/home",
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
    component: () => import(/* webpackChunkName: "RoleIndex" */ "@/views/role/menus/index.vue"),
  },
  {
    path: '/main/role/resources',
    name: '资源管理',
    exact: true,
    component: () => import(/* webpackChunkName: "RoleIndex" */ "@/views/role/resources/index.vue"),
  },
  {
    path: '/main/role/users',
    name: '用户管理',
    exact: true,
    component: () => import(/* webpackChunkName: "RoleIndex" */ "@/views/role/users/index.vue"),
  }
];
