<template>
  <div class="device-panel-container">
    <DevicePanel
      v-for="device in devicesList"
      :key="device.name"
      v-bind="device"
    ></DevicePanel>
    <!-- <div class="device-panel" v-for="device in devicesList">
      <div class="panel-decoration"></div>
      <div class="device-name">{{ device.label }}</div>
      <img class="device-image" :src="device.img" alt="" />
      <div class="device-details">
        <div
          class="details-content"
          v-for="item in device.counts"
          :key="item.name"
        >
          <span class="detail-name">{{ item.name }}</span>
          <span
            class="detail-value"
            :class="{ 'primary-color': item.name === '在线' }"
            >{{ item.value }}</span
          >
        </div>
      </div>
      <div class="device-btn">
        <template v-if="device.swich">
          <NButton
            color="#8596A4"
            style="
              color: white;
              width: 100px;
              height: 40px;
              border: 1px solid rgba(33, 47, 67, 0.3);
            "
            @click="
              swichText = '全关';
              showConfirm = true;
            "
            >全关</NButton
          >
          <NButton
            color="#232D42"
            style="
              color: white;
              width: 100px;
              height: 40px;
              border: 1px solid rgba(33, 47, 67, 0.3);
            "
            >全开</NButton
          >
        </template>
      </div>
    </div>
    <NModal v-model:show="showConfirm">
      <div class="dialog-card">
        <div class="dialog-header">
          <span>确认您的操作</span>
        </div>
        <div class="dialog-content">
          <p>
            本次操作将
            <span class="primary-text">{{ swichText }}</span>
            所有
            <span class="primary-text">{{}}设备</span>
          </p>
        </div>
        <div class="dialog-buttons">
          <NButton
            style="
              --n-width: 120px;
              --n-height: 50px;
              --n-border-radius: 8px;
              --n-font-size: 18px;
              color: white;
            "
            color="#4DC591"
            @click="showConfirm = false"
            >确认</NButton
          >
          <NButton
            style="
              --n-width: 120px;
              --n-height: 50px;
              --n-border-radius: 8px;
              --n-font-size: 18px;
              color: white;
            "
            color="#8596A4"
            @click="showConfirm = false"
            >取消</NButton
          >
        </div>
        <div class="dialog-footer">当前登录身份：林鱼丸</div>
      </div>
    </NModal> -->
  </div>
</template>
<script setup lang="ts">
import { NModal, NButton } from "naive-ui";
import DevicePanel from "./DevicePanel.vue";
import { ref } from "vue";
// import { useDialogManagerStore } from "@/stores/dialogManager";
// import { storeToRefs } from "pinia";
// const dialogManager = useDialogManagerStore();

// const { handleOpenDialog } = dialogManager;
interface DevicesList {
  label: string;
  name: string;
  img: string;
  counts: { name: string; value: number }[];
  swich?: boolean;
  // online: number;
  // total: number;
}
interface Props {
  devicesList: DevicesList[];
}
const props = withDefaults(defineProps<Props>(), {});

const showConfirm = ref(false);
const swichText = ref("全关");
// // 关闭所有设备回调
// const closeAllDevicesCallback = () => {
//   console.log("closeAllDevicesCallback");
// };
// const closeAllDevices = (device: DevicesList) => {
//   // 打开提示窗口
//   handleOpenDialog(
//     `本次操作将<div class='primary-text'>关闭</div>所有<div class='primary-text'>${device.name}</div>设备`,
//     closeAllDevicesCallback
//   );
// };
// 关闭所有设备回调
// const openAllDevicesCallback = () => {
//   console.log("openAllDevicesCallback");
// };
// const openAllDevices = (device: DevicesList) => {
//   // 打开提示窗口
//   handleOpenDialog(
//     `本次操作将<div class='primary-text'>开启</div>所有<div class='primary-text'>${device.name}</div>设备`,
//     openAllDevicesCallback
//   );
// };
</script>

<style lang="scss" scoped>
@import "../../styles/globalStyles.scss";

.device-panel-container {
  position: relative;
  height: 67vh;
  padding: 0 20px;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr; /* 创建四列，每列的大小相等 */
  gap: 0 20px;
  // .device-panel {
  //   display: flex;
  //   flex-direction: column;
  //   align-items: center;
  //   justify-content: space-between;
  //   overflow: hidden;
  //   padding: 0 20px;
  //   padding-bottom: 40px;
  //   border-radius: 40px;
  //   opacity: 1;
  //   background: linear-gradient(
  //     158deg,
  //     rgba(88, 110, 144, 0.6) 0%,
  //     rgba(37, 54, 84, 0.6) 51%,
  //     rgba(75, 101, 133, 0.6) 96%
  //   );
  //   box-sizing: border-box;
  //   border: 2px solid;
  //   border-image: linear-gradient(
  //     340deg,
  //     rgba(64, 96, 131, 0.65) 0%,
  //     rgba(0, 0, 0, 0) 34%
  //   );
  //   backdrop-filter: blur(10px);
  //   .panel-decoration {
  //     position: absolute;
  //     top: -20%;
  //     left: -70%;
  //     width: 200%;
  //     height: 50%;
  //     background-color: #fff;
  //     transform-origin: center;
  //     transform: rotate(-22deg);
  //     opacity: 0.1;
  //     pointer-events: none;
  //   }
  //   .device-name {
  //     font-size: 26px;
  //     font-weight: 250;
  //     line-height: normal;
  //     letter-spacing: 0em;
  //     color: #ffffff;
  //     margin-top: 24px;
  //     text-shadow: 0px 0px 5px #b1c4ff;
  //     z-index: 1;
  //     //   margin-bottom: 10px;
  //   }
  //   .device-image {
  //     height: 35%;
  //     object-fit: contain;
  //     z-index: 1;
  //   }
  //   .device-details {
  //     display: flex;
  //     justify-content: space-between;
  //     align-items: center;
  //     width: 70%;
  //     margin-bottom: 10px;
  //     transform: translateY(-10px);
  //     .details-content {
  //       display: flex;
  //       flex-direction: column;
  //       align-items: center;
  //       padding: 0 6px;
  //       .detail-name {
  //         font-size: 14px;
  //         font-weight: 250;
  //         line-height: normal;
  //         letter-spacing: 0em;
  //         color: #a0aec0;
  //         margin-bottom: 10px;
  //       }
  //       .primary-color {
  //         color: $theme-primary !important;
  //       }
  //       .detail-value {
  //         font-size: 28px;
  //         font-weight: 250;
  //         line-height: normal;
  //         letter-spacing: 0em;
  //         color: #ffffff;
  //       }
  //     }
  //   }
  //   .device-btn {
  //     display: flex;
  //     justify-content: space-between;
  //     font-size: 14px;
  //     width: 100%;
  //     .common-btn {
  //       width: 45%;
  //       line-height: 36px;
  //       cursor: pointer;
  //       text-align: center;
  //       border-radius: 4px;
  //     }
  //     .close-btn {
  //       background-color: $theme-gray;
  //     }
  //     .open-btn {
  //       background-color: $theme-deep-blue;
  //     }
  //   }
  // }
}
</style>
