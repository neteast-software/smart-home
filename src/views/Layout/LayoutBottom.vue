<script lang="ts" setup>
import { useRouter, RouteRecordRaw } from "vue-router";
const router = useRouter();
const currentRoutes = router.getRoutes();
const navBarList = currentRoutes.filter((item) => item.meta?.navBar);

const navClick = (item: RouteRecordRaw) => {
  console.log(item);
  router.push(item.path);
};
</script>
<template>
  <div class="nav-container">
    <div class="nav-option">
      <div class="nav-item" v-for="item in navBarList" @click="navClick(item)">
        <div>{{ item.meta.title }}</div>
      </div>
    </div>
    <div class="nav-bg"></div>
  </div>
</template>
<style lang="scss" scoped>
@import "@/styles/globalStyles.scss";
.nav-container {
  position: absolute;
  bottom: 0;
  width: 68%;
  height: 100px;
  .decorate {
    position: absolute;
    .spline {
    }
  }
  .nav-option {
    position: relative;
    transform: translateY(52px);
    display: flex;
    justify-content: space-between;
    padding: 0 80px;
    font-size: 20px;
    z-index: 1;
    // font-weight: 10;
    .nav-item {
      cursor: pointer;
      color: $theme-color;
      opacity: 0.4;
      transition: all 0.3s;
    }
  }
  .nav-bg {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 80px;
    opacity: 1;
    border-radius: 30px 30px 0 0;
    transform: perspective(500px) rotateX(30deg) translateY(12px);
    background: linear-gradient(
      2deg,
      rgba(88, 110, 144, 0.6) -81%,
      rgba(37, 54, 84, 0.6) 24%,
      rgba(75, 101, 133, 0.6) 147%
    );
    border: 2px solid;
    border-image: linear-gradient(180deg, #1f2937 0%, rgba(0, 0, 0, 0) 100%);
    //   background-color: #fff !important;
  }
}
</style>
