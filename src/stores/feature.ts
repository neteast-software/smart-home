import { defineStore } from 'pinia';
import { reactive } from 'vue';
import { DeviceFeature } from '@/api';
export const useFeatureStore = defineStore('feature', () => {
    const features = reactive<Record<string, DeviceFeature[]>>({});
    return { features };
});
