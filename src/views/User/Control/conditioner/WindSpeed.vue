<template>
  <div class="h-full pt-6 pb-18px flex-col gap-y-2">
    <section class="flex-col gap-y-7.5 flex-h-rest">
      <div class="flex-col items-start shrink">
        <div class="text-info text-18px leading-14px mb-3 ml-1">风速</div>
        <div
          class="rounded-3 overflow-hidden relative border-3 border-solid border-[#0D121B]"
        >
          <Slider
            v-model="windSpeed"
            :width="400"
            :height="72"
            :min="feature.param.min"
            :max="feature.param.max"
          ></Slider>
          <span
            class="absolute left-5 top-1/2 text-7 -translate-y-1/2 pointer-events-none"
            >{{ windSpeed ? windSpeed : "自动" }}</span
          >
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import Slider from "@/components/Slider.vue";
import Button from "@/components/Button.vue";
import { computed, ref } from "vue";
import { DeviceStepFeature } from "@/api";
interface Props {
  feature: DeviceStepFeature;
  modelValue: number;
}
const props = withDefaults(defineProps<Props>(), {});
const emit = defineEmits<{
  "update:modelValue": [value: number];
}>();
const windSpeed = computed({
  get: () => props.modelValue,
  set: (val) => {
    emit("update:modelValue", val);
  },
});
const windDirection = ref(0);
</script>

<style scoped></style>
