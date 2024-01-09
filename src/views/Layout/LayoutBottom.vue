<script lang="ts" setup>
import { useRoute, useRouter, RouteRecordRaw } from "vue-router";
import { ref, watch, nextTick, onMounted } from "vue";
const route = useRoute();
const router = useRouter();
const currentRoutes = router.getRoutes();
const navBarList = currentRoutes.filter((item) => item.meta?.navBar);
const currentRouteName = ref(route.name);
const navClick = (item: RouteRecordRaw) => {
  router.push(item.path);
};
const navActiveBar = ref();

// onMounted(() => {
//     const naActive: HTMLElement = document.querySelector(".nav-active")!;
//     navActiveBar.value.style.left = naActive.offsetLeft + "px";
// });
let isFirst = true;
function resolveTimeout() {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, 300);
  });
}
watch(
  () => route.name,
  async (val) => {
    currentRouteName.value = val;
    await nextTick();
    if (isFirst) {
      isFirst = false;
      await resolveTimeout();
    }
    const naActive: HTMLElement = document.querySelector(".nav-active")!;
    navActiveBar.value.style.left = naActive.offsetLeft + "px";
    // const naActive: HTMLElement = document.querySelector(".nav-active")!;
  },
  { immediate: true }
);
</script>
<template>
  <div class="nav-container">
    <div class="nav-decorate left-decorate">
      <div class="spline top-spline"></div>
      <div class="spline"></div>
    </div>
    <div class="nav-decorate right-decorate">
      <div class="spline top-spline"></div>
      <div class="spline"></div>
    </div>
    <div class="nav-option">
      <div class="nav-active-bar" ref="navActiveBar"></div>
      <div
        class="nav-item"
        :class="{ 'nav-active': item.name === currentRouteName }"
        v-for="item in navBarList"
        @click="navClick(item)"
      >
        <div class="nav-title">{{ item.meta.title }}</div>
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
  .nav-decorate {
    position: absolute;
    bottom: -12px;
    transform-origin: center;
    .spline {
      width: 60px;
      height: 8px;
      border-radius: 10px;
      background-color: $theme-card;
    }
  }
  .left-decorate {
    left: 0;
    transform: translateY(5px) translateX(-114%) rotate(-66deg);
    .top-spline {
      margin-bottom: 6px;
      transform: translateX(-15px);
    }
  }
  .right-decorate {
    right: 0;
    transform: translateY(5px) translateX(118%) rotate(66deg);
    .top-spline {
      margin-bottom: 6px;
      transform: translateX(15px);
    }
  }

  .nav-option {
    position: relative;
    transform: translateY(55px);
    display: flex;
    justify-content: space-between;
    padding: 0 80px;
    font-size: 20px;
    z-index: 1;
    // font-weight: 10;
    .nav-item {
      position: relative;
      cursor: pointer;
      color: $theme-color;
      z-index: 1;
      .nav-title {
        opacity: 0.4;
        transition: all 0.2s;
      }
    }
    .nav-active {
      .nav-title {
        opacity: 1;
      }
    }
    .nav-active-bar {
      width: 18%;
      height: 80px;
      position: absolute;
      top: 0;
      border-radius: 20px 20px 0 0;
      transform: translateY(-26px) translateX(-18%) perspective(100px)
        rotateX(30deg);
      opacity: 0.3;
      transition: all 0.2s ease;
      background: linear-gradient(
        180deg,
        #6d7a8d 0%,
        rgba(109, 122, 141, 0) 100%
      );
    }
  }
  .nav-bg {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 90px;
    opacity: 1;
    border-radius: 30px 30px 0 0;
    transform: translateY(12px) perspective(500px) rotateX(30deg);
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
