<template>
  <div class="panel-card">
    <header class="panel-hd">{{ energyList.title }}</header>
    <main class="panel-main">
      <div class="small-card">
        <span class="total">{{ energyList.total }}</span>
        <div class="unit">{{ energyList.unit }}</div>
      </div>
      <div class="panel-data">
        <div>
          同比<span :style="{ color: YOY > 0 ? '#FF7648' : '#4DC591' }">{{
            YOY > 0 ? `+${YOY}%` : `-${Math.abs(YOY)}%`
          }}</span>
          <img v-if="YOY < 0" src="/images/Energy/negative.svg" />
          <img v-else src="/images/Energy/positive.svg" />
        </div>
        <div>
          环比<span :style="{ color: QOQ > 0 ? '#FF7648' : '#4DC591' }">{{
            QOQ > 0 ? `+${QOQ}%` : `-${Math.abs(QOQ)}%`
          }}</span>
          <img v-if="QOQ < 0" src="/images/Energy/negative.svg" />
          <img v-else src="/images/Energy/positive.svg" />
        </div>
        <slot></slot>
      </div>
    </main>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from "vue";
interface energyLinst {
  title: string;
  total: number;
  unit: string;
  YOY: number;
  QOQ: number;
}
interface Props {
  energyList: energyLinst;
}
const props = withDefaults(defineProps<Props>(), {});
const YOY = computed(() => parseFloat((props.energyList.YOY * 100).toFixed(1)));
const QOQ = computed(() => parseFloat((props.energyList.QOQ * 100).toFixed(1)));
</script>
<style lang="scss" scoped>
@import "@/styles/globalStyles.scss";
.panel-card {
  width: 100%;
  height: 34%;
  background: linear-gradient(
    124deg,
    rgba(88, 110, 144, 0.6) 3%,
    rgba(37, 54, 84, 0.6) 48%,
    rgba(75, 101, 133, 0.6) 87%
  );
  border-radius: 20px;
  border: 2px solid;
  border-image: linear-gradient(
    308deg,
    rgba(64, 96, 131, 0.65) 2%,
    rgba(0, 0, 0, 0) 29%
  );
  padding-top: 8px;
  padding-left: 28px;
  padding-right: 28px;
  padding-bottom: 8px;
  font-weight: 300;
  .panel-hd {
    font-size: 18px;
    text-shadow: 0px 0px 5px #b1c4ff;
    margin-bottom: 8px;
  }
  .panel-main {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 68%;
    .small-card {
      box-sizing: border-box;
      position: relative;
      width: 30%;
      height: 100%;
      border-radius: 12px;
      padding-top: 14px;
      background: rgba($theme-primary, 0.3);
      border: 2px solid rgba(#8a92a6, 0.3);
      display: flex;
      flex-direction: column;
      align-items: center;
      .total {
        font-size: 20px;
      }
      .unit {
        position: absolute;
        bottom: 0;
        width: 100%;
        font-size: 12px;
        height: 25px;
        background: rgba($theme-primary, 0.3);
        border-radius: 0px 0px 12px 12px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
  .panel-data {
    font-size: 14px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    gap: 12px;
    text-shadow: 0px 0px 5px #b1c4ff;

    span {
      text-shadow: none;
      // color: $theme-primary;
      margin-left: 16px;
      margin-right: 6px;
    }
  }
}
</style>
