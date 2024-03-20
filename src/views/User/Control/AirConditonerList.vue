<template>
  <section class="flex h-full">
    <div class="overflow-y-auto h-full no-scrollbar w-1/2 pl-10">
      <ListItem
        v-for="item in list"
        :key="item.id"
        :name="item.name || `空调`"
        :value="!!item.state"
        :device-id="item.device_id"
        :online="item.online"
        :class="{ active: item.device_id === activeId }"
        @click="activeId = item.device_id"
      >
        <template #icons>
          <i v-if="item.mode === 0" class="i-device:snow"></i>
          <i
            v-else-if="item.mode === 1"
            class="i-device:sun text-complement"
          ></i>
          <i v-else-if="item.mode === 2" class="i-device:droplet"></i>
        </template>
        <template #middle>
          <div>
            <span class="mr-3.5">{{ item.temperature }}℃</span>
            <label>风速{{ item.wind_speed }}</label>
          </div>
        </template>
      </ListItem>
    </div>
    <div class="w-px h-full bg-[#727992]/50 flex-shrink-0 mx-16"></div>
    <div class="flex-col w-1/2">
      <header class="text-(5 primary)">{{ activeItem?.name }}</header>
      <AirConditionerControl
        class="flex-row-reverse flex-h-rest"
        main-class="justify-between"
        :id="activeId"
        :key="activeId"
      ></AirConditionerControl>
    </div>
  </section>
</template>

<script setup lang="ts">
import { AirConditionerStatus } from "@/api";
import ListItem from "./ListItem.vue";
import AirConditionerControl from "./conditioner/Main.vue";
import { computed, ref } from "vue";
interface Props {
  list: AirConditionerStatus[];
}
const props = withDefaults(defineProps<Props>(), {});
const activeId = ref(props.list[0].device_id);
const activeItem = computed(() =>
  props.list.find((item) => item.device_id === activeId.value)
);
</script>

<style scoped>
.active {
  @apply bg-[#232D42];
}
</style>
