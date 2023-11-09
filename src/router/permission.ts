import router, { userRoutes, adminRoutes } from "./index";
// import {} from "@/stores/user";
// import UserApi from '../api/userApi'
// import NProgress from "nprogress";
// import { message } from 'ant-design-vue';
const whiteList = [
  "/login",
  "/user/devicesControle",
  "/user/devicesControle2",
  "/user/digitalFactory",
];
router.beforeEach(async (to, from, next) => {
  //   const user = useUserStore();
  //   TODO
  const user: any = {};
  // ~更新当前正激活的侧边栏主模块 设定不同角色初始访问的页面等
  // let newActiveIcon:string = ''
  // if(to.fullPath.includes('hrManagement')){
  //     newActiveIcon = 'hrManagement'
  // }else if(to.fullPath.includes('materialManagement')){
  //     newActiveIcon = 'materialManagement'
  // } if(to.fullPath.includes('systemManagement')){
  //     newActiveIcon = 'systemManagement'
  // }
  // Store.commit('user/SET_ACTIVE_ICON', newActiveIcon)
  // NProgress.start()
  if (user.token) {
    // 查看是否存储用户信息，若无用户信息则需要获取一遍，且利用用户信息动态加载对应模块的路由
    if (!user.userInfo) {
      await user.getUserInfo();
      if (user.userInfo?.role == "user") {
        userRoutes.forEach((route) => {
          router.addRoute(route);
        });
      }
      if (user.userInfo?.role == "admin") {
        adminRoutes.forEach((route) => {
          router.addRoute(route);
        });
        userRoutes.forEach((route) => {
          router.addRoute(route);
        });
      }
      next({ path: `${to.fullPath}`, query: to.query }); // 放行，不然会404
    }
    if (to.name === "login") {
      const currentRoutes = router.getRoutes();
      currentRoutes.some((route) => {
        if (route.meta.breadcrumbList) {
          next({ name: route.name });
          return true;
        }
      });
    }
  } else {
    user.clearStore();
    // 没有登录只能够访问白名单上的路由，若不是白名单上的路由，跳回登录页面
    if (whiteList.indexOf(to.path) !== -1) {
      // return true
      next();
    } else {
      next({ name: "login" });
      // return { name: 'login' }
    }
  }
});
router.afterEach((to) => {
  // ~路由切换后
  // ~1.更新面包屑
  // if (to.meta?.breadcrumbList) {
  //     Store.commit('user/SET_BREADCRUMB_LIST', to.meta.breadcrumbList)
  // }
  // ~2.检查与设置 当前页面是否为xxxx页面 并做相关处理
  // if (to.meta?.isXXXPage) {
  //     Store.commit('user/SET_IS_XXX_PAGE', true)
  // } else {
  //     Store.commit('user/SET_IS_XXX_PAGE', false)
  // }
  // NProgress.done()
});
