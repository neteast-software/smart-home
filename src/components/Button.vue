<template>
    <button
        class="text-info flex-col flex-center bg-gray rounded-0.5 border-2 border-solid border-[#0D121B] text-14px active:bg-[#1f283b] transition"
        :style="{ width: `${width}px`, height: `${height}px` }"
    >
        <slot></slot>
    </button>
</template>

<script setup lang="ts">
interface Props {
    width?: number;
    height?: number;
}
withDefaults(defineProps<Props>(), {
    width: 80,
    height: 80
});
</script>

<style scoped></style>
