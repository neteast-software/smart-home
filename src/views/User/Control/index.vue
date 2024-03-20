<template>
  <IonPage>
    <Teleport v-if="mounted" to="#logo">
      <div class="back i-custom:back text-white text-10"></div>
    </Teleport>
    <AirConditonerList
      v-if="airConditionerList.length"
      :list="airConditionerList"
    ></AirConditonerList>
  </IonPage>
</template>

<script setup lang="ts">
import { IonPage, onIonViewDidEnter, onIonViewDidLeave } from "@ionic/vue";
import AirConditonerList from "./AirConditonerList.vue";
import { AirConditionerStatus, getDeviceDetail } from "@/api";
import { ref } from "vue";
import { useFeatureStore } from "@/stores/feature";
import { useMounted, useTimeoutPoll } from "@vueuse/core";
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

const airConditionerList = ref<AirConditionerStatus[]>([]);

async function init() {
  const { data } = await getDeviceDetail(props.id);
  airConditionerList.value = data.AirConditioner.list;
  featureStore.features["AirConditioner"] = data.AirConditioner.feature;
}
const { pause, resume } = useTimeoutPoll(init, 5000);
onIonViewDidEnter(resume);
onIonViewDidLeave(pause);
</script>

<style></style>
