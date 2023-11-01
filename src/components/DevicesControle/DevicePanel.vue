<script setup lang="ts">
interface DevicesList {
  name: string;
  img: string;
  online: number;
  total: number;
}
interface Props {
  devicesList: DevicesList[];
}
const props = withDefaults(defineProps<Props>(), {});
</script>
<template>
  <div class="device-panel-container">
    <div class="device-panel" v-for="device in devicesList">
      <div class="panel-decoration"></div>
      <div class="device-name">{{ device.name }}</div>
      <img class="device-image" :src="device.img" alt="" />
      <div class="device-details">
        <div class="details-content">
          <span class="detail-name">开启</span>
          <span class="detail-value primary-color">{{ device.online }}</span>
        </div>
        <div class="details-content">
          <span class="detail-name">全部</span>
          <span class="detail-value">{{ device.total }}</span>
        </div>
      </div>
      <div class="device-btn">
        <div class="common-btn close-btn">全关</div>
        <div class="common-btn open-btn">全开</div>
      </div>
    </div>
  </div>
</template>
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
  .device-panel {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    overflow: hidden;
    padding: 0 20px;
    padding-bottom: 40px;
    border-radius: 40px;
    opacity: 1;
    background: linear-gradient(
      158deg,
      rgba(88, 110, 144, 0.6) 0%,
      rgba(37, 54, 84, 0.6) 51%,
      rgba(75, 101, 133, 0.6) 96%
    );
    box-sizing: border-box;
    border: 2px solid;
    border-image: linear-gradient(
      340deg,
      rgba(64, 96, 131, 0.65) 0%,
      rgba(0, 0, 0, 0) 34%
    );
    backdrop-filter: blur(10px);
    .panel-decoration {
      position: absolute;
      top: -20%;
      left: -70%;
      width: 200%;
      height: 50%;
      background-color: #fff;
      transform-origin: center;
      transform: rotate(-22deg);
      opacity: 0.1;
      pointer-events: none;
    }
    .device-name {
      font-size: 26px;
      font-weight: 250;
      line-height: normal;
      letter-spacing: 0em;
      color: #ffffff;
      margin-top: 24px;
      text-shadow: 0px 0px 5px #b1c4ff;
      z-index: 1;
      //   margin-bottom: 10px;
    }
    .device-image {
      height: 35%;
      object-fit: contain;
      z-index: 1;
    }
    .device-details {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 70%;
      margin-bottom: 10px;
      transform: translateY(-10px);
      .details-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0 6px;
        .detail-name {
          font-size: 14px;
          font-weight: 250;
          line-height: normal;
          letter-spacing: 0em;
          color: #a0aec0;
          margin-bottom: 10px;
        }
        .primary-color {
          color: $theme-primary !important;
        }
        .detail-value {
          font-size: 28px;
          font-weight: 250;
          line-height: normal;
          letter-spacing: 0em;
          color: #ffffff;
        }
      }
    }
    .device-btn {
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      width: 100%;
      .common-btn {
        width: 45%;
        line-height: 36px;
        cursor: pointer;
        text-align: center;
        border-radius: 4px;
      }
      .close-btn {
        background-color: #8596a4;
      }
      .open-btn {
        background-color: #232d42;
      }
    }
  }
}
</style>
