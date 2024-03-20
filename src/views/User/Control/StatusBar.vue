<template>
    <div class="flex-y-center gap-x-3 text-primary text-6">
        <i :class="[online ? 'i-device:online' : 'i-device:offline text-complement']"></i>
        <i class="i-device:transfer text-info" :class="{ 'text-primary': transfering }"></i>
        <i class="i-device:lock text-info"></i>
        <i class="i-device:setting text-info"></i>
        <slot name="icons"></slot>
    </div>
</template>

<script setup lang="ts">
import { useOnline } from '@vueuse/core';
interface Props {
    transfering?: boolean;
    online?: boolean;
    hideOnline?: boolean;
}
withDefaults(defineProps<Props>(), {
    transfering: false
});
const isOnline = useOnline();
</script>

<style scoped></style>
