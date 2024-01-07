<script setup lang="ts">
import MonitorGallery from "@/components/Monitor/MonitorGallery.vue";
import { getAreaTree } from "@/api";
import type { AreaTreeNode } from "@/api/type";
import { onMounted, ref } from "vue";
import { useSettingStore } from "@/stores/setting";
const panelShow = ref(false);
const toggleOptionsPanel = () => {
  panelShow.value = !panelShow.value;
};

const hideOptionsPanel = () => {
  panelShow.value = false;
};
defineExpose({ toggleOptionsPanel, hideOptionsPanel });
const emit = defineEmits<{
  pick: [id: string, name: string];
}>();
const setting = useSettingStore();
const areaTree = ref<AreaTreeNode[]>([]);
async function initData() {
  const { data } = await getAreaTree();
  if (data && data.length == 1 && data[0].childrenList?.length) {
    areaTree.value = data[0].childrenList;
    // const firstArea = data[0].childrenList[0];
    // if (!firstArea) return;
    // const firstFloor = firstArea.childrenList?.[0];
    // if (firstFloor)
    //   pickFloor(
    //     firstFloor.regionIndexCode,
    //     firstFloor.regionName,
    //     firstArea.regionName
    //   );
    const pickArea = data[0].childrenList[1];
    if (pickArea) {
      const pickerFloor = pickArea.childrenList?.find(
        (item) => item.regionIndexCode == "71"
      );
      if (pickerFloor)
        pickFloor(
          pickerFloor.regionIndexCode,
          pickerFloor.regionName,
          pickArea.regionName
        );
    }
    // const pickerFoor =
  }
}
onMounted(initData);
const activeFloor = ref<string>();
function pickFloor(id: string, floorName: string, areaName: string) {
  activeFloor.value = id;
  emit("pick", id, `${areaName}${floorName}`);
  setting.setActiveFloorId(id);
  setTimeout(hideOptionsPanel, 250);
}
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
      <template v-for="area in areaTree" :key="area.id">
        <div class="area-group" v-if="area.childrenList?.length">
          <div class="group-name">
            {{ area.regionName }}
          </div>
          <!-- @touchend="hideOptionsPanel" -->
          <div class="group-options-container">
            <div
              class="group-option"
              v-for="floor in area.childrenList"
              :key="floor.regionIndexCode"
              @click="
                pickFloor(
                  floor.regionIndexCode,
                  floor.regionName,
                  area.regionName
                )
              "
            >
              {{ floor.regionName }}
            </div>
          </div>
        </div>
      </template>
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
.area-options-contaienr .area-group:last-child .group-options-container::after {
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
