<template>
  <div class="h-full py-6 flex-col justify-between">
    <section class="flex gap-x-6">
      <div
        v-for="item in normalModeList"
        class="border-2 border-solid w-172px h-278px cold rounded flex-col items-center justify-around bg-origin-border transition"
        :class="{
          active: modelValue === item.value,
          cold: item.name === '制冷',
          warm: item.name === '制热',
        }"
        @click="$emit('update:modelValue', item.value, item.name)"
      >
        <i
          class="text-primary text-8 w-11 h-11"
          :class="[
            item.name === '制冷'
              ? 'i-device:snow'
              : 'i-device:sun !text-complement',
          ]"
        ></i>
        <h2 class="text-28px leading-38px">{{ item.name }}</h2>
      </div>
    </section>
    <section class="text-info">
      <h2 class="text-18px mb-4">其他</h2>
      <main class="flex gap-x-3">
        <Button
          v-for="item in abnormalModeList"
          :width="110"
          :height="110"
          :class="{ 'text-primary': modelValue === item.value }"
          @click="$emit('update:modelValue', item.value, item.name)"
        >
          <i
            class="text-8 mb-2 w-11 h-11"
            :class="{ [iconMap[item.name]]: true }"
          ></i>
          <label class="">{{ item.name }}</label>
        </Button>
      </main>
    </section>
  </div>
</template>

<script setup lang="ts">
import { DeviceOptionFeature } from "@/api";
import Button from "@/components/Button.vue";
import { mode } from "crypto-js";
import { ref, computed } from "vue";
interface Props {
  options: { name: string; value: number }[];
  map: Record<string | number, string>;
  modelValue: number;
}
const props = withDefaults(defineProps<Props>(), {});
defineEmits<{
  "update:modelValue": [value: number, name: string];
}>();
const normalModeList = computed(() =>
  props.options.filter((item) => ["制热", "制冷"].includes(item.name))
);
const abnormalModeList = computed(() =>
  props.options.filter((item) => !["制热", "制冷"].includes(item.name))
);
const iconMap: Record<string, string> = {
  抽湿: "i-device:droplet",
  送风: "i-device:fresh",
};
const coldOrWarm = ref<"" | "cold" | "warm">("");
const moisturizing = ref(false);
</script>

<style scoped>
.cold {
  background-image: linear-gradient(180deg, rgba(0, 0, 0, 0) 24%, #062a72 123%),
    linear-gradient(180deg, #232e44 0%, rgba(35, 45, 66, 0) 100%);
  border: 2px solid rgba(13, 18, 27, 0.3);
  opacity: 0.6;
}
.cold.active {
  background-image: linear-gradient(181deg, rgba(0, 0, 0, 0) 40%, #4dc591 124%),
    linear-gradient(180deg, #1c2029 0%, rgba(35, 45, 66, 0) 100%);
  border: 2px solid rgba(255, 255, 255, 0.3);
  opacity: 1;
}
.warm {
  background-image: linear-gradient(
      181deg,
      rgba(167, 51, 51, 0) 67%,
      rgba(118, 58, 56, 0.77) 124%
    ),
    linear-gradient(180deg, #232e44 0%, rgba(35, 45, 66, 0) 100%);
  border: 2px solid #0d121b;
  opacity: 0.6;
}
.warm.active {
  background-image: linear-gradient(
      180deg,
      rgba(167, 51, 51, 0) 67%,
      #ff7648 116%
    ),
    linear-gradient(180deg, #1c2029 0%, rgba(35, 45, 66, 0) 100%);
  border: 2px solid rgba(255, 255, 255, 0.3);
  opacity: 1;
}
</style>
