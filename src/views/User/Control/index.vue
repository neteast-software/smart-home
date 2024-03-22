<template>
  <IonPage>
    <Teleport v-if="mounted" to="#logo">
      <div
        class="back i-custom:back text-white text-10"
        @click="$router.back"
      ></div>
    </Teleport>
    <template v-if="type === 'AirConditioner'">
      <AirConditonerList
        v-if="airConditionerList.length"
        :list="airConditionerList"
      ></AirConditonerList>
    </template>
    <template v-else-if="type === 'Lighting'">
      <LightingList
        v-if="lightingList.length"
        :list="lightingList"
      ></LightingList>
    </template>
  </IonPage>
</template>

<script setup lang="ts">
import { IonPage, onIonViewDidEnter, onIonViewDidLeave } from "@ionic/vue";
import AirConditonerList from "./AirConditonerList.vue";
import LightingList from "./LightingList.vue";
import {
  AirConditionerStatus,
  LightingStatus,
  getDeviceDetail,
  getAreaDeviceList,
} from "@/api";
import { ref, watch } from "vue";
import { useFeatureStore } from "@/stores/feature";
import { useMounted, useTimeoutPoll } from "@vueuse/core";
import { useSettingStore } from "@/stores/setting";
interface Props {
  type: string;
  id: number;
}
const props = withDefaults(defineProps<Props>(), {
  id: 3607,
  type: "AirConditioner",
});
const mounted = useMounted();
const featureStore = useFeatureStore();
const setting = useSettingStore();

const airConditionerList = ref<AirConditionerStatus[]>([]);
const lightingList = ref<LightingStatus[]>([]);
async function init() {
  const { data } = await getAreaDeviceList(Number(setting.activeFloorId));
  airConditionerList.value = data.AirConditioner.list;
  featureStore.features["AirConditioner"] = data.AirConditioner.feature;
  lightingList.value = data.Lighting.list;
  featureStore.features["Lighting"] = data.Lighting.feature;
}
watch(() => setting.activeFloorId, init);
const { pause, resume } = useTimeoutPoll(init, 5000);
onIonViewDidEnter(resume);
onIonViewDidLeave(pause);
</script>

<style></style>
