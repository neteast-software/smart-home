import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import { IonicVue } from "@ionic/vue";
import { createPinia } from "pinia";

/* Uno CSS */
// import '@unocss/reset/eric-meyer.css';
import "@unocss/reset/tailwind.css";
import "virtual:uno.css";

/* Core CSS required for Ionic components to work properly */
import "@ionic/vue/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/vue/css/normalize.css";
import "@ionic/vue/css/structure.css";
import "@ionic/vue/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/vue/css/padding.css";
import "@ionic/vue/css/float-elements.css";
import "@ionic/vue/css/text-alignment.css";
import "@ionic/vue/css/text-transformation.css";
import "@ionic/vue/css/flex-utils.css";
import "@ionic/vue/css/display.css";

/* Theme variables */
import "./theme/variables.css";

import "./styles/main.scss";

import { StatusBar, Animation } from "@capacitor/status-bar";
import { NavigationBar } from "@hugotomazi/capacitor-navigation-bar";
import { Device } from "@capacitor/device";
StatusBar?.hide({ animation: Animation.None });
NavigationBar?.hide();

const app = createApp(App).use(IonicVue).use(router).use(createPinia());
Device.getId().then(async ({ identifier }) => {
  console.log("Device ID:", identifier);
  localStorage.setItem("device_id", identifier);
  await router.isReady();
  const meta = document.createElement("meta");
  meta.name = "naive-ui-style";
  document.head.appendChild(meta);
  app.mount("#app");
});
// router.isReady().then(() => {
//   const meta = document.createElement("meta");
//   meta.name = "naive-ui-style";
//   document.head.appendChild(meta);
//   app.mount("#app");
// });
