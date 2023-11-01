<script setup lang="ts">
import { useDialogManagerStore } from "@/stores/dialogManager";
import { storeToRefs } from "pinia";
const dialogManager = useDialogManagerStore();
const { dialogHtmlContent } = storeToRefs(dialogManager);
const { handleCloseDialog, handleConfirm } = dialogManager;
</script>
<template>
  <div class="confirm-dialog-container">
    <div class="dialog-header">
      <div class="tips-icon">!</div>
      确认您的操作
    </div>
    <div class="dialog-content" v-html="dialogHtmlContent"></div>
    <div class="dialog-btn">
      <div class="common-btn cancel-btn" @click="handleCloseDialog">取消</div>
      <div class="common-btn confirm-btn" @click="handleConfirm">确认</div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import "@/styles/globalStyles.scss";
.confirm-dialog-container {
  @include absolute-center;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: pink;
  padding: 1.5%;
  padding-bottom: 4%;
  width: 46% !important;
  height: 42% !important;
  top: 45%;
  border-radius: 40px;
  opacity: 1;
  background: linear-gradient(
    126deg,
    rgba(88, 110, 144, 0.6) 3%,
    rgba(37, 54, 84, 0.6) 48%,
    rgba(75, 101, 133, 0.6) 88%
  );
  box-sizing: border-box;
  border: 2px solid;
  border-image: linear-gradient(
    310deg,
    rgba(64, 96, 131, 0.65) 2%,
    rgba(0, 0, 0, 0) 30%
  );
  backdrop-filter: blur(10px);
}
.dialog-header {
  @include flex-center;
  width: 100%;
  text-align: center;
  padding-bottom: 15px;
  margin-bottom: 1px;
  border-bottom: 1px solid #424c60;
  font-size: 18px;
  .tips-icon {
    left: 0;
    width: 18px;
    height: 18px;
    margin-right: 10px;
    font-size: 14px;
    color: #000106;
    border-radius: 50%;
    line-height: 20px;
    font-weight: 600;
    background-color: $theme-warning;
  }
}
.dialog-content {
  @include flex-center;
  font-size: 20px;
  flex-grow: 1;
}
.dialog-btn {
  font-size: 14px;
  width: 56%;
  display: flex;
  justify-content: space-between;
  .common-btn {
    height: 40px;
    line-height: 40px;
    width: 90px;
    border-radius: 6px;
    background-color: $theme-gray;
    text-align: center;
  }
  .cancel-btn {
  }
  .confirm-btn {
    background-color: $theme-primary;
  }
}
</style>
