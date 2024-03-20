<template>
  <main class="flex">
    <TabBar
      class="h-full"
      :class="asideClass"
      :tabClass="tabClass"
      :tabs="tabs"
      :active-index="activeTab"
      @toggle="activeTab = $event"
    ></TabBar>
    <section
      class="h-full flex-w-rest overflow-hidden flex justify-center"
      :class="mainClass"
      v-if="info"
    >
      <Mode
        v-show="activeTab === 0"
        :model-value="info.mode"
        :options="modeOptions"
        :map="modeMap"
        @update:model-value="(value, name) => changeMode(value, name)"
      ></Mode>
      <Temperature
        :model-value="info.temperature"
        v-show="activeTab === 1"
        :feature="(airConditionerFeature['温度控制'] as DeviceLinearFeature)"
        @update:model-value="changeTemperature"
      ></Temperature>
      <!-- <Humidity v-show="activeTab === 2"></Humidity> -->
      <WindSpeed
        v-show="activeTab === 2"
        :model-value="info.wind_speed"
        :feature="(airConditionerFeature['风速控制'] as DeviceStepFeature)"
        @update:model-value="changeWindSpeed"
      ></WindSpeed>
    </section>
  </main>
</template>

<script setup lang="ts">
import TabBar from "../component/TabBar.vue";
import Mode from "./Mode.vue";
import Temperature from "./Temperature.vue";
import WindSpeed from "./WindSpeed.vue";
import { computed, onMounted, reactive, ref } from "vue";
import {
  getDeviceParam,
  DeviceLinearFeature,
  controlDevice,
  DeviceStepFeature,
} from "@/api";
import { useFeatureStore } from "@/stores/feature";
interface Props {
  id: number;
  asideClass?: any;
  mainClass?: any;
  tabClass?: any;
}
const props = withDefaults(defineProps<Props>(), {});
const featureStore = useFeatureStore();
console.log("props", featureStore.features);
const airConditionerFeature = computed(() =>
  Object.fromEntries(
    featureStore.features.AirConditioner?.map((item) => [item.name, item]) || []
  )
);
const modeOptions = computed<{ index: number; name: string; value: number }[]>(
  () => airConditionerFeature.value["运行模式"]?.param || []
);
const modeMap = computed(() =>
  Object.fromEntries(modeOptions.value.map((item) => [item.value, item.name]))
);
const info = reactive({
  mode: 0,
  temperature: 0,
  wind_speed: 0,
});
async function initParam() {
  const { data } = await getDeviceParam(props.id);
  info.mode = data.mode;
  info.temperature = data.temperature;
  info.wind_speed = data.wind_speed;
}
function init() {
  initParam();
}
onMounted(init);
const tabs = computed(() => [
  { name: "运行模式", value: modeMap.value[info.mode.toString()] || "无" },
  { name: "温度", value: `${info.temperature}℃` },
  { name: "风速", value: `档位${info.wind_speed}` },
]);
async function changeMode(value: number, name: string) {
  await sendControl("运行模式", name);
  info.mode = value;
}

async function changeTemperature(value: number) {
  if (value < (airConditionerFeature.value["温度控制"]?.param?.min || 16)) {
    info.temperature = value;
    return;
  }
  await sendControl("温度控制", value);
  info.temperature = value;
}

async function changeWindSpeed(value: number) {
  await sendControl("风速控制", value);
  info.wind_speed = value;
}

async function sendControl(feature_name: string, value: any) {
  await controlDevice(props.id, feature_name, value);
  // initParam();
}
const activeTab = ref(0);
</script>

<style scoped></style>
