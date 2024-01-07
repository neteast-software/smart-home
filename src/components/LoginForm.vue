<template>
  <div class="dialog-content">
    <NFormItem
      label="账号"
      style="width: 438px"
      size="large"
      :feedback="feedback"
      :labelStyle="{ color: '#A0AEC0', fontSize: '20px' }"
    >
      <NInput
        class="login-input"
        :class="{ 'login-input--error': feedback }"
        :style="{
          '--n-color': 'transparent',
          '--n-color-focus': 'transparent',
          '--n-border': '0',
          '--n-border-hover': '0',
          '--n-border-focus': '0',
          '--n-box-shadow-focus': 'none',
          '--n-border-disabled': '1px solid #8A92A6',
          '--n-text-color': '#fff',
          '--n-padding-left': '0',
          '--n-border-radius': '0',
        }"
        :value="username"
        @focus="$emit('focus')"
        @update:value="$emit('update:username', $event)"
        placeholder="请输入账号"
      ></NInput>
    </NFormItem>
    <NFormItem
      label="密码"
      style="width: 438px"
      size="large"
      :feedback="feedback"
      :labelStyle="{ color: '#A0AEC0', fontSize: '20px' }"
    >
      <NInput
        type="password"
        showPasswordOn="click"
        class="login-input"
        :class="{ 'login-input--error': feedback }"
        :style="{
          '--n-color': 'transparent',
          '--n-color-focus': 'transparent',
          '--n-border': '0',
          '--n-border-hover': '0',
          '--n-border-focus': '0',
          '--n-box-shadow-focus': 'none',
          '--n-border-disabled': '1px solid #8A92A6',
          '--n-text-color': '#fff',
          '--n-padding-left': '0',
          '--n-border-radius': '0',
        }"
        :value="password"
        @update:value="$emit('update:password', $event)"
        @focus="$emit('focus')"
        placeholder="请输入密码"
      ></NInput>
    </NFormItem>
  </div>
</template>

<script setup lang="ts">
import { NFormItem, NInput } from "naive-ui";
interface Props {
  username?: string;
  password?: string;
  feedback?: string;
}
withDefaults(defineProps<Props>(), {});
defineEmits<{
  "update:username": [value: string];
  "update:password": [value: string];
  "focus": []
}>();
</script>

<style scoped>
.login-input {
  border-bottom: 1px solid #8a92a6;
}
.login-input--error {
  border-color: #ff7648;
}
:deep(.n-form-item-feedback__line) {
  text-align: right;
  color: #ff7648;
}
:deep(.n-input__suffix .n-base-icon),
:deep(.n-input__suffix .n-base-icon svg) {
  width: 1.4rem;
  height: 1.4rem;
}
</style>
