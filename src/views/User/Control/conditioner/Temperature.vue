<template>
  <div class="pt-10">
    <Adjustor
      class="pt-10 !gap-x-12"
      :height="380"
      :width="270"
      :button-width="68"
      :button-height="68"
      button-wrapper-class="py-8"
      v-model="actualValue"
      :step="feature.param.unit || 0.5"
      :lower-limit="feature.param.min"
      :upper-limit="feature.param.max"
      :min-cozy="feature.param.recommend_min"
      :max-cozy="feature.param.recommend_max"
      :ratio="0.172"
      unit="℃"
    >
      <div
        class="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex-y-center text-42px"
      >
        <i class="text-primary i-device:temp"></i>
        {{
          Number.isInteger(actualValue) ? actualValue : actualValue.toFixed(1)
        }}℃
      </div>
    </Adjustor>
  </div>
</template>

<script setup lang="ts">
import { DeviceLinearFeature } from "@/api";
import Adjustor from "@/components/Adjustor.vue";
import { computed, ref, watch } from "vue";
interface Props {
  feature: DeviceLinearFeature;
  modelValue: number;
}
const props = withDefaults(defineProps<Props>(), {});
const emit = defineEmits<{
  "update:modelValue": [value: number];
}>();
const actualValue = computed({
  get: () => props.modelValue,
  set: (val) => {
    emit("update:modelValue", val);
  },
});
watch(
  () => props.modelValue,
  (val) => {
    console.log("val", val);
  }
);
// const temperature = ref(26);
</script>

<style scoped></style>
