<template>
    <div class="slider_wrap" :style="{ width, height }">
        <div class="slider_rail"></div>
        <div class="slider_progress" :style="{ width: `${percent * 100}%` }"></div>
        <div class="slider_step_wrap">
            <div
                class="slider_step"
                v-for="piece in pieceCount"
                :key="piece"
                @click="$emit('update:modelValue', min + piece)"
            ></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
    modelValue: number;
    width?: number | 'auto';
    height?: number | 'auto';
    min?: number;
    max?: number;
    step?: number;
}
const props = withDefaults(defineProps<Props>(), {
    modelValue: 0,
    width: 'auto',
    height: 10,
    min: 0,
    max: 100,
    step: 1
});
defineEmits<{
    'update:modelValue': [value: number];
}>();
const width = computed(() => {
    if (props.width == 'auto') return '100%';
    return `${props.width}px`;
});
const height = computed(() => {
    if (props.height == 'auto') return '100%';
    return `${props.height}px`;
});
const percent = computed(() => {
    const { modelValue, max, min } = props;
    const value = Math.max(Math.min(modelValue, max), min);
    return (value - min) / (props.max - props.min);
});
const pieceCount = computed(() => (props.max - props.min) / props.step);
</script>

<style scoped>
.slider_wrap {
    position: relative;
}
.slider_progress {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background: #4dc591;
    will-change: width;
    transition: width 0.2s ease;
}
.slider_rail {
    width: 100%;
    height: 100%;
    background: #232d42;
    position: absolute;
}
.slider_step_wrap {
    display: flex;
    position: relative;
    width: 100%;
    height: 100%;
    z-index: 124;
}
.slider_step {
    flex: 1;
}
.slider_step:not(:last-child) {
    border-right: 1px dashed #d8d8d8;
    opacity: 0.5;
}
</style>
