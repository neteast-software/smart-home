<template>
  <NModal
    :show="show"
    @mask-click="maskClosable && $emit('update:show', false)"
  >
    <div class="dialog-card">
      <slot name="header">
        <div class="dialog-header">{{ title }}</div>
      </slot>
      <slot>
        <div class="dialog-content">本次操作将 关闭 所有 照明设备</div>
      </slot>
      <slot name="buttons">
        <div class="dialog-buttons">
          <NButton
            style="
              --n-width: 120px;
              --n-height: 50px;
              --n-border-radius: 8px;
              --n-font-size: 18px;
            "
            color="#4DC591"
            @click="$emit('confirm')"
            :loading="loading"
            >确认</NButton
          >
          <NButton
            style="
              --n-width: 120px;
              --n-height: 50px;
              --n-border-radius: 8px;
              --n-font-size: 18px;
            "
            color="#8596A4"
            @click="
              $emit('update:show', false);
              $emit('cancel');
            "
            >取消</NButton
          >
        </div>
      </slot>
      <slot name="footer">
        <!-- <div class="dialog-footer">当前登录身份：林鱼丸</div> -->
      </slot>
    </div>
  </NModal>
</template>

<script setup lang="ts">
import { NModal, NButton } from "naive-ui";
interface Props {
  show: boolean;
  title?: string;
  loading?: boolean;
  maskClosable?: boolean;
}
withDefaults(defineProps<Props>(), {
  show: false,
  maskClosable: true,
});
defineEmits<{
  "update:show": [value: boolean];
  confirm: [];
  cancel: [];
}>();
</script>

<style>
.dialog-card {
  background: linear-gradient(
    126deg,
    rgba(88, 110, 144, 0.6) 3%,
    rgba(37, 54, 84, 0.6) 48%,
    rgba(75, 101, 133, 0.6) 88%
  );
  color: white;
  backdrop-filter: blur(10px);
  border-radius: 40px;
  border: 2px solid rgba(64, 96, 131, 0.65);
  width: 640px;
  padding: 0 12px;
}
.dialog-header {
  display: flex;
  justify-content: center;
  color: white;
  padding: 18px 0 20px;
  border-bottom: 1px solid #424c60;
  font-size: 24px;
}
.dialog-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 60px 0;
  font-size: 28px;
}
.dialog-buttons {
  display: flex;
  justify-content: center;
  gap: 70px;
  margin-bottom: 60px;
}
.dialog-footer {
  padding: 20px 0 18px;
  font-size: 20px;
  border-top: 1px solid #424c60;
  display: flex;
  justify-content: flex-end;
}
</style>
