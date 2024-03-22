<template>
  <div class="device-panel-container flex justify-center gap-x-140px">
    <DevicePanel
      class="w-344px"
      v-for="device in devicesList"
      :key="device.name"
      v-bind="device"
      @click="
        $router.push({
          name: 'deviceList',
          params: { type: device.name },
          query: { id: setting.activeFloorId },
        })
      "
    ></DevicePanel>
  </div>
</template>
<script setup lang="ts">
import { useSettingStore } from "@/stores/setting";
import DevicePanel from "./DevicePanel.vue";
interface DevicesList {
  label: string;
  name: string;
  img: string;
  swich?: boolean;
}
interface Props {
  devicesList: DevicesList[];
}
const props = withDefaults(defineProps<Props>(), {});
const setting = useSettingStore();
// const showConfirm = ref(false);
// const swichText = ref("全关");
</script>

<style lang="scss" scoped>
@import "../../styles/globalStyles.scss";

.device-panel-container {
  position: relative;
  height: 67vh;
  padding: 0 20px;
  box-sizing: border-box;
  // display: grid;
  // grid-template-columns: 1fr 1fr 1fr 1fr; /* 创建四列，每列的大小相等 */
  // gap: 0 20px;
}
</style>
