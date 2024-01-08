import { ref, shallowRef } from "vue";
import { defineStore } from "pinia";
import Dialog from "@/components/Dialog";

// import UserApi from '@/api/UserApi'

export const useUserStore = defineStore("user", () => {
  const tokenName = "tokenAuth";
  const token = ref<string>("");
  const loginDialog = shallowRef<Dialog>();
  const nickname = ref<string>("");
  function setToken(newToken: string) {
    localStorage.setItem(tokenName, newToken);
    token.value = newToken;
  }
  function removeToken() {
    localStorage.removeItem(tokenName);
    token.value = "";
  }
  const userInfo: any = ref(null);
  /**
   * 获取用户信息
   */
  function getUserInfo() {
    return new Promise(async (resolve, reject) => {
      //    const resData = await UserApi.getUserInfo()
      //    userInfo.value = resData
      return resolve(true);
    });
  }
  /**
   *  清除存储的信息 如：token，用户信息
   */
  function clearStore() {
    removeToken();
    userInfo.value = null;
  }
  function setLoginDialog(dialog: Dialog) {
    loginDialog.value = dialog;
  }
  function showLoginDialog() {
    loginDialog.value?.show();
  }
  function setNickName(name: string) {
    nickname.value = name;
  }
  return {
    token,
    setToken,
    removeToken,
    clearStore,
    userInfo,
    getUserInfo,
    setLoginDialog,
    showLoginDialog,
    nickname,
    setNickName,
  };
});
