<template>
  <section class="monitor-gallery">
    <div class="monitor-grid-container" :class="`grid-${gridCount}`">
      <img
        class="monitor"
        v-for="monitor in monitorList"
        src="/images/Monitor/monitor-test.png"
        alt=""
      />
    </div>
    <!-- <draggable
        :class="`grid-${gridCount}`"
        :disabled="gridCount === 1"
        v-model="monitorList"
        group="monitor"
        item-key="url"
      >
        <template #item="{ element: item, index }"> 123123 </template>
      </draggable> -->
    <!-- <Monitor
        :controls="gridCount === 1"
        :src="''"
        :index-code="'123'"
        :name="'test'"
        @dblclick="pickMonitor(1)"
      ></Monitor> -->
    <!-- <template v-else>
      <Monitor src="" index-code="" name=""></Monitor>
    </template> -->
    <!-- <MonitorSlider
      ref="historyBar"
      v-motion-slide-bottom
      v-on-click-outside="() => (showHistory = false)"
      v-if="showHistory"
      class="absolute bottom-0 left-0 w-full z-50"
    ></MonitorSlider> -->
    <div class="grid-switch-container">
      <!-- <button class="text-white z-50 bg-black/50 h-10 px-4 rounded-full mr-3" @click="showHistory = true">
                历史记录
            </button> -->
      <div
        class="switch-btn"
        v-for="grid in gridOptions"
        @click="gridCount = grid.num"
        :class="{ 'switch-btn-active': gridCount === grid.num }"
      >
        {{ grid.num }}
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import Monitor from "./Monitor.vue";
import DevicePanel from "@/components/DevicesControle/DevicePanel.vue";
// import MonitorSlider from "./MonitorSlider.vue";
// import {
//   getDefaultMonitorList,
//   getMonitorInfo,
// } from "@ebuild/utils/network/api/security";
import { computed, ref, onMounted, watch } from "vue";

import { MonitorItem } from "@/types/monitor";
// import { pickMonitorKey } from "./helper";
import { useEventBus, useDebounceFn } from "@vueuse/core";
import draggable from "vuedraggable";
import { isEmptyObject } from "@/utils/other";

const gridOptions = [{ num: 1 }, { num: 6 }];
const gridCount = ref(6);
const sourceList = ref<MonitorItem[]>([]);
const monitorList = computed({
  get() {
    // const total = sourceList.value.length;
    // const count = gridCount.value;
    // const gap = count - total < 0 ? 0 : count - total;

    // console.log(1111111);
    // console.log(
    //   sourceList.value.slice(0, count).concat(new Array(gap).fill({}))
    // );

    // return sourceList.value.slice(0, count).concat(new Array(gap).fill({}));
    return gridCount.value;
  },
  set(newList) {
    // const l = newList.filter((item) => !isEmptyObject(item));
    // sourceList.value.splice(0, l.length, ...l);
  },
});
watch(monitorList, (val) => {
  console.log("monitorList改变", val);
});
async function initMonitorList() {
  //   const { data } = await getDefaultMonitorList();
  //   sourceList.value = data;
  // sourceList.value = [
  //     {
  //         url: 'rtsp://rcyktjsb001:Rcykt001@220.250.19.58:8554/Streaming/tracks/1201starttime=20231018t171200z&endtime=20231018t235959z&fast=5',
  //         indexCode:
  //             'rtsp://rcyktjsb001:Rcykt001@220.250.19.58:8554/Streaming/tracks/1201starttime=20231018t171200z&endtime=20231018t235959z&fast=5',
  //         id: 24,
  //         regionName: '测试监控',
  //         regionPathName: '测试监控'
  //     },
  //     {
  //         url: 'rtsp://rcyktjsb001:Rcykt001@220.250.19.58:8554/Streaming/tracks/101?starttime=20231018t140000z&endtime=20231018t235959z',
  //         indexCode:
  //             'rtsp://rcyktjsb001:Rcykt001@220.250.19.58:8554/Streaming/tracks/101?starttime=20231018t140000z&endtime=20231018t235959z',
  //         id: 21,
  //         regionName: '测试监控',
  //         regionPathName: '测试监控'
  //     },
  //     {
  //         url: 'rtsp://rcyktjsb001:Rcykt001@220.250.19.58:8554/Streaming/Channels/201',
  //         indexCode: 'rtsp://rcyktjsb001:Rcykt001@220.250.19.58:8554/Streaming/Channels/201',
  //         id: 22,
  //         regionName: '测试监控',
  //         regionPathName: '测试监控'
  //     },
  //     {
  //         url: 'rtsp://rcyktjsb001:Rcykt001@220.250.19.58:8554/Streaming/Channels/301',
  //         indexCode: 'rtsp://rcyktjsb001:Rcykt001@220.250.19.58:8554/Streaming/Channels/301',
  //         id: 23,
  //         regionName: '测试监控',
  //         regionPathName: '测试监控'
  //     },
  //     {
  //         url: 'rtsp://rcyktjsb001:Rcykt001@220.250.19.58:8554/Streaming/Channels/501',
  //         indexCode: 'rtsp://rcyktjsb001:Rcykt001@220.250.19.58:8554/Streaming/Channels/501',
  //         id: 25,
  //         regionName: '测试监控',
  //         regionPathName: '测试监控'
  //     },
  //     {
  //         url: 'rtsp://rcyktjsb001:Rcykt001@220.250.19.58:8554/Streaming/Channels/601',
  //         indexCode: 'rtsp://rcyktjsb001:Rcykt001@220.250.19.58:8554/Streaming/Channels/601',
  //         id: 26,
  //         regionName: '测试监控',
  //         regionPathName: '测试监控'
  //     },
  //     {
  //         url: 'rtsp://rcyktjsb001:Rcykt001@220.250.19.58:8554/Streaming/Channels/701',
  //         indexCode: 'rtsp://rcyktjsb001:Rcykt001@220.250.19.58:8554/Streaming/Channels/701',
  //         id: 27,
  //         regionName: '测试监控',
  //         regionPathName: '测试监控'
  //     },
  //     {
  //         url: 'rtsp://rcyktjsb001:Rcykt001@220.250.19.58:8554/Streaming/Channels/1001',
  //         indexCode: 'rtsp://rcyktjsb001:Rcykt001@220.250.19.58:8554/Streaming/Channels/1001',
  //         id: 28,
  //         regionName: '测试监控',
  //         regionPathName: '测试监控'
  //     },
  //     {
  //         url: 'rtsp://rcyktjsb001:Rcykt001@220.250.19.58:8554/Streaming/Channels/901',
  //         indexCode: 'rtsp://rcyktjsb001:Rcykt001@220.250.19.58:8554/Streaming/Channels/901',
  //         id: 29,
  //         regionName: '测试监控',
  //         regionPathName: '测试监控'
  //     }
  // ];
}
onMounted(initMonitorList);
function pickMonitor(index: number) {
  const item = sourceList.value.splice(index, 1)[0];
  sourceList.value.unshift(item);
  gridCount.value = 1;
}

// 历史回放
const showHistory = ref(false);
const addMonitorLock = useDebounceFn(addMonitor, 300);
async function addMonitor(indexCode: string) {
  sourceList.value.unshift({ indexCode } as unknown as MonitorItem);
  //   const { data } = await getMonitorInfo(indexCode);
  // sourceList.value.unshift(data);
  const idx = sourceList.value.findIndex(
    (item) => item.indexCode === indexCode
  );
  //   sourceList.value.splice(idx, 1, data);
  //   console.log("新增显示器data", data, sourceList.value);
}
// const monitorBus = useEventBus(pickMonitorKey);
// monitorBus.on((indexCode: string) => {
//   addMonitorLock(indexCode);
// });
</script>

<style lang="scss" scoped>
@import "@/styles/globalStyles.scss";
.monitor-gallery {
  position: relative;
  width: 100vw;
  height: 75vh;
}
.monitor-grid-container {
  position: relative;
  width: 100vw;
  height: 70vh;
}
.grid-1 {
  .monitor {
    width: 100vw;
    height: 100%;
    object-fit: contain;
  }
}
.grid-6 {
  //   display: flex;
  //   flex-wrap: wrap;
  display: grid;
  grid-template-columns: 33% 33% 33%;
  grid-template-rows: 50% 50%;
  gap: 0;
  .monitor {
    height: 100% !important;
    object-fit: contain;
  }
}

.grid-switch-container {
  position: absolute;
  right: 0;
  bottom: 0;
  display: flex;
  .switch-btn {
    width: 18px;
    height: 18px;
    font-size: 14px;
    text-align: center;
    line-height: 18px;
    border-radius: 4px;
    border: 2px solid #fff;
    opacity: 0.4;
    transition: all 0.15s ease;
    margin-right: 12px;
    cursor: pointer;
  }
  .switch-btn-active {
    opacity: 1;
  }
}
</style>
