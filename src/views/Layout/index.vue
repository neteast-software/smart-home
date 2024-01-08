<script setup lang="ts">
import LayoutHeader from "./LayoutHeader/index.vue";
import LayoutMain from "./LayoutMain.vue";
import LayoutBottom from "./LayoutBottom.vue";
import ConfirmDialog from "@/components/Dialog/ConfirmDialog.vue";
import { useDialogManagerStore } from "@/stores/dialogManager";
import { storeToRefs } from "pinia";
import { NConfigProvider, darkTheme, NFormItem, NInput } from "naive-ui";
import { IonPage, IonRouterOutlet, createGesture } from "@ionic/vue";
import { onMounted, ref, h, reactive } from "vue";
import Dialog from "@/components/Dialog";
import { useUserStore } from "@/stores/user";
import { login as loginApi, getUserInfo } from "@/api";
import storage from "@/utils/storage";
import LoginForm from "@/components/LoginForm.vue";
import { useRouter } from "vue-router";

const dialogManager = useDialogManagerStore();
const { dialogContainerRef, showDialog } = storeToRefs(dialogManager);
const { handleCloseDialog } = dialogManager;
const userStore = useUserStore();
const router = useRouter();
const container = ref<HTMLElement>();
onMounted(() => {});

const account = reactive({
  username: "",
  password: "",
  feedback: "",
});
const loading = ref(false);
const loginDialog = new Dialog(container, {
  title: "权限确认",
  maskCloseable: false,
  onConfirm: login,
  onCancel: () => {
    router.replace("/user/energy");
  },
  loading,
  footer: () => undefined,
  default: () =>
    h(
      LoginForm,
      {
        username: account.username,
        password: account.password,
        feedback: account.feedback,
        "onUpdate:username": (val: string) => {
          account.username = val;
        },
        "onUpdate:password": (val: string) => {
          account.password = val;
        },
        onFocus: () => {
          account.feedback = "";
        },
      },
      {}
    ),
});
async function login() {
  loading.value = true;
  try {
    const { data } = await loginApi(account.username, account.password);
    console.log("登录下来");
    const { access_token } = data;
    storage.set("access_token", access_token);
    loginDialog.hide();
    const { data: userInfo } = await getUserInfo();
    userStore.setNickName(userInfo.nickName);
    router.go(0);
  } catch {
    account.feedback = "账号或密码错误";
  } finally {
    loading.value = false;
  }
}
userStore.setLoginDialog(loginDialog);

// userStore.setLoginDialog(loginDialog);
// loginDialog.show();
// const window2 = window;
// {{ window2.screen.width }}
// {{ window2.screen.height }}
</script>
<template>
  <IonPage class="page">
    <!-- <NConfigProvider :theme="darkTheme"> -->
    <div
      class="dialog-container"
      :class="{ 'show-dialog': showDialog }"
      ref="dialogContainerRef"
    >
      <ConfirmDialog class="confirm-dialog-container" />
      <div class="dialog-bg" @click="handleCloseDialog"></div>
    </div>
    <div ref="container" class="layout-container">
      <LayoutHeader class="layout-header" />
      <!-- <LayoutMain class="layout-main" /> -->
      <IonRouterOutlet
        class="relative layout-main"
        :key="$route.name!"
      ></IonRouterOutlet>
      <LayoutBottom class="layout-bottom" />
    </div>
    <!-- </NConfigProvider> -->
  </IonPage>
</template>
<style lang="scss" scoped>
@import "@/styles/globalStyles.scss";
.dialog-container {
  position: absolute;
  width: 100vw;
  height: 100vh;
  z-index: 99;
  pointer-events: none;
  opacity: 0;
  transition: all 0.15s ease;
  .dialog-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    opacity: 0.85;
    background-color: $theme-bg;
    z-index: -1;
  }
}
.confirm-dialog-container {
  transition: all 0.15s ease;
  transform-origin: center;
  transform: translate(-50%, -50%) scale(0.6);
}
.show-dialog {
  opacity: 1;
  pointer-events: auto !important;
  .confirm-dialog-container {
    transform: translate(-50%, -50%) scale(1);
  }
}
.layout-container {
  position: relative;
  max-width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
}
.layout-header {
  margin-bottom: 20px;
}
.layout-main {
  width: 100vw;
  height: 75vh;
  overflow: hidden;
}
</style>
