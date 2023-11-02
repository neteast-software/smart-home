<template>
  <div class="loading">
    <img src="/public/images/Loading/loading.svg" class="loading-img" />
    研发中, 敬请期待。
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
@import "@/styles/globalStyles.scss";
.loading {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  font-weight: 300;
  .loading-img {
    margin-right: 28px;
    width: 30px;
    height: 30px;
    animation: rotate 3s linear infinite;
    @keyframes rotate {
      0% {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  }
}
</style>
