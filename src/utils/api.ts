import axios from "axios";

import { useUserStore } from "@/stores/user";
import router from "../router";
const tokenPrefix = "bearer ";
const api = axios.create({
  baseURL: "",
  // paramsSerializer: (params:object):string => {
  //    return qs.stringify(params, {indices: false})
  // }
});
api.interceptors.request.use((reqConfig: any) => {
  const user = useUserStore();
  //~ 设置提交加载状态  及加载提示
  // store.commit('user/SET_SUBMIT_LOADING')
  if (user.token) {
    // ~ 在请求头中携带token
    Object.assign(reqConfig, {
      headers: {
        Authorization: tokenPrefix + user.token,
      },
    });
  }
  return reqConfig;
});
api.interceptors.response.use(
  (response) => {
    // ~取消提交加载状态 及加载提示
    // store.commit('user/CANCEL_SUBMIT_LOADING')
    if (response.config.responseType === "blob") {
      return response;
    }
    return response.data;
  },
  (err) => {
    // ~取消提交加载状态 及加载提示
    // store.commit('user/CANCEL_SUBMIT_LOADING')
    console.log(err);
    switch (err.response.status) {
      case 400:
        // message.error({ content: '请求参数错误:' + err })
        break;
      case 401:
        // message.error({ content: '登录凭证过期，请重新登录' })
        const user = useUserStore();
        user.removeToken();
        router.push({ name: "Login" });
        break;
      default:
        // message.error({ content: '出错了:' + err })
        break;
    }
  }
);
export default api;
