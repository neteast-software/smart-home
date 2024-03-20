<template>
    <div class="relative card rounded-3 flex-center p-3px" :style="{ width: width + 'px', height: height + 'px' }">
        <main class="flex-center flex-col w-full h-full bg-(primary opacity-20) rounded-3 overflow-hidden">
            <slot></slot>
        </main>

        <div class="w-full h-px border-(dashed complement b-1) absolute top-line z-2">
            <span class="text-(complement 4.5) font-250 absolute -top-6 right-2"
                >{{ float2Percent(maxCozy) }}<span class="text-3.5">{{ unit }}</span></span
            >
        </div>
        <div class="w-full h-px border-(dashed complement b-1) absolute bottom-line z-2">
            <span class="text-(complement 4.5) font-250 absolute -bottom-6 right-2"
                >{{ float2Percent(minCozy) }}<span class="text-3.5">{{ unit }}</span></span
            >
        </div>
        <div
            class="w-full h-22 bg-(primary opacity-40) rounded-b-3 absolute bottom-0 z-1 transition-height duration-320 ease"
            :style="{ height: `${dynamicPct * 100}%` }"
        ></div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
export interface Props {
    value: number;
    unit?: string;
    upperLimit: number;
    lowerLimit: number;
    maxCozy: number;
    minCozy: number;
    ratio?: number;
    width?: number;
    height?: number;
}
const props = withDefaults(defineProps<Props>(), {
    width: 200,
    height: 200,
    ratio: 0.225
});
const percent = `${props.ratio * 100}%`;
const total = computed(() => props.upperLimit - props.lowerLimit);
function float2Percent(value: number) {
    if (value >= 0 && value <= 1) {
        return `${(value * 100).toFixed(0)}%`;
    }
    return value;
}
const dynamicPct = computed(() => {
    const { lowerLimit, minCozy, maxCozy, upperLimit, ratio, value } = props;
    const middle = maxCozy - minCozy;
    const lowerPct = ratio;
    const middlePct = 1 - 2 * lowerPct;
    const upperPct = ratio;
    let pct = 0;

    switch (true) {
        case value >= lowerLimit && value < minCozy:
            pct = ((value - lowerLimit) / (minCozy - lowerLimit)) * lowerPct;
            break;
        case value >= minCozy && value < maxCozy:
            pct = lowerPct + ((value - minCozy) / middle) * middlePct;
            break;
        case value >= maxCozy && value < upperLimit:
            pct = lowerPct + middlePct + ((value - maxCozy) / (upperLimit - maxCozy)) * upperPct;
            break;
        case value >= upperLimit:
            pct = 1;
            break;
        case value < lowerLimit:
            pct = 0;
            break;
        default:
            break;
    }
    return pct;
});
</script>

<style scoped>
.card {
    background: linear-gradient(180deg, rgba(45, 108, 80, 0.2) 0%, rgba(0, 0, 0, 0.2) 100%);
    box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.3);
}
.top-line {
    top: v-bind(percent);
}
.bottom-line {
    bottom: v-bind(percent);
}
.test {
    transition: height 0.3s ease;
}
</style>
