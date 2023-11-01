import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
// import "@/styles/main.scss"; // 基础样式 引用
import "./styles/main.scss";
import navie from "naive-ui";
const app = createApp(App);
app.use(router);
app.use(createPinia());
app.use(navie);
app.mount("#app");
