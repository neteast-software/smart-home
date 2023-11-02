<script setup lang="ts">
import MonitorGallery from "@/components/Monitor/MonitorGallery.vue";
import { ref } from "vue";
const panelShow = ref(false);
const toggleOptionsPanel = () => {
  panelShow.value = !panelShow.value;
};

const hideOptionsPanel = () => {
  panelShow.value = false;
};
defineExpose({ toggleOptionsPanel, hideOptionsPanel });
const areaOption = [
  {
    id: 2,
    name: "南楼",
    children: [
      {
        id: 26,
        name: "4楼",
      },
      {
        id: 27,
        name: "5楼",
      },
      {
        id: 64,
        name: "6楼",
      },
      {
        id: 65,
        name: "7楼",
      },
    ],
  },
  {
    id: 3,
    name: "北楼",
    children: [
      {
        id: 66,
        name: "4楼",
      },
      {
        id: 67,
        name: "5楼",
      },
      {
        id: 68,
        name: "6楼",
      },
      {
        id: 69,
        name: "7楼",
      },
      {
        id: 70,
        name: "8楼",
      },
      {
        id: 71,
        name: "9楼",
      },
    ],
  },
  {
    id: 4,
    name: "综合楼",
    children: [
      {
        id: 63,
        name: "1楼",
      },
      {
        id: 72,
        name: "2楼",
      },
      {
        id: 73,
        name: "3楼",
      },
    ],
  },
];
</script>
<template>
  <div
    class="area-options-bg"
    :class="{ 'area-options-bg-show': panelShow }"
    @click="hideOptionsPanel"
  ></div>

  <div
    class="area-options-panel"
    :class="{ 'area-options-panel-show': panelShow }"
  >
    <div class="area-options-contaienr">
      <div class="area-group" v-for="group in areaOption">
        <div class="group-name">
          {{ group.name }}
        </div>
        <!-- @touchend="hideOptionsPanel" -->
        <div class="group-options-container">
          <div class="group-option" v-for="option in group.children">
            F{{ option.name.slice(0, 1) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import "@/styles/globalStyles.scss";
.area-options-bg {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 1;

  pointer-events: none;
}
.area-options-bg-show {
  pointer-events: auto !important;
}
.area-options-panel {
  position: absolute;
  top: 130%;
  left: 0;
  padding: 15px 30px 40px;
  border-radius: 8px;
  background-color: $theme-card;
  background: linear-gradient(
    180deg,
    #1b273c -10%,
    rgba(27, 39, 60, 1) 55%,
    #1b273c 125%
  );
  border-image: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #0d1c37 100%) 2;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
  z-index: 2;
  pointer-events: none;
  opacity: 0;
  transform-origin: 0 top;
  transform: scale(0.8);
  transition: all 0.15s;
}

.area-options-panel-show {
  pointer-events: auto !important;
  opacity: 1;
  transform: scale(1);
}
.area-options-panel::after {
  content: "";
  background-color: #1b273c;
  width: 10px;
  height: 10px;
  position: absolute;
  top: -5px;
  left: 6%;
  transform: translateX(-50%) rotate(45deg);
}
.area-options-contaienr
  .area-group:nth-child(3)
  .group-options-container::after {
  content: none;
}

.area-options-contaienr {
  position: relative;
  display: flex;
  justify-content: space-between;
  gap: 0 40px;
  z-index: 9;
  .area-group {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    .group-name {
      font-size: 14px;
      color: #8a92a6;
      opacity: 0.5;
      margin-bottom: 15px;
    }

    .group-options-container::after {
      content: "";
      position: absolute;
      right: -20px;
      height: 92%;
      width: 1px;
      background-color: #29334a;
    }
    .group-options-container {
      display: flex;
      flex-direction: column;
      gap: 12px 0;
      .group-option {
        font-size: 18px;
        border-radius: 4px;
        width: 120px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        background-color: #232d42;
      }
      .group-option:hover {
        background-color: $theme-primary;
      }
    }
  }
}
</style>
