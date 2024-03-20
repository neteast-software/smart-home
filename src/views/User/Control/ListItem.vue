<template>
    <div
        class="item block m-2.5 pb-6 pt-3 px-5 border-b border-solid active:bg-#2D6C50/50 border-[#111418] rounded overflow-hidden"
    >
        <StatusBar class="mb-2" :transfering="loading" :online="online">
            <template #icons>
                <slot name="icons" :loading="loading"></slot>
            </template>
        </StatusBar>
        <slot name="status"></slot>
        <div class="flex-y-center gap-x-10 text-white leading-38px">
            <NTooltip>
                <template #trigger>
                    <div class="text-6 w-0 flex-1 truncate text-left">{{ name }}</div>
                </template>
                <span>{{ name }}</span>
            </NTooltip>

            <slot name="middle"></slot>
            <NSwitch
                :disabled="!online"
                :value="checked"
                size="large"
                :rail-style="railStyle"
                :loading="loading"
                @update:value="toogle"
                @click.stop="onClick"
            ></NSwitch>
        </div>
    </div>
</template>

<script setup lang="ts">
import { noop } from '@vueuse/core';
import StatusBar from './StatusBar.vue';
import { NSwitch, NTooltip, useMessage } from 'naive-ui';
import { IonToggle, ToggleCustomEvent } from '@ionic/vue';
import { CSSProperties, nextTick, ref, watch } from 'vue';
import { switchDevice } from '@/api';

interface Props {
    name: string;
    value?: boolean;
    deviceId: number;
    online?: boolean;
}
const props = withDefaults(defineProps<Props>(), {});
const isPressed = ref(false);
const loading = ref(false);
const checked = ref(props.value);
watch(
    () => props.value,
    (val) => {
        checked.value = val;
    }
);

async function toogle(flag: boolean) {
    if (loading.value) return;
    loading.value = true;
    checked.value = flag;
    switchDevice(props.deviceId, flag)
        .then(() => {
            window.$message?.success(flag ? '设备开启成功' : '设备关闭成功');
        })
        .catch(() => {
            checked.value = !flag;
            window.$message?.error('操作设备失败');
        })
        .finally(() => {
            loading.value = false;
        });
}
const railStyle = ({ focused, checked }: { focused: boolean; checked: boolean }) => {
    const style: CSSProperties = {
        background: checked ? '#4DC591' : '#8A92A6'
    };
    return style;
};
function onClick() {
    if (props.online) return;
    window.$message?.warning('设备不在线', { duration: 1000 });
}
</script>

<style scoped>
ion-toggle {
    --track-background: #8a92a6;
    --handle-width: 20px;
    --handle-height: 20px;
    --handle-spacing: 1.2px;
    contain: none;
}
ion-toggle::part(track) {
    width: 46px;
    height: 22px;
    border: 2px solid #5e6a83;
    transition: all 0.2s ease-in-out;
}
ion-toggle.toggle-checked::part(track) {
    border-color: #3fb682;
}
</style>
