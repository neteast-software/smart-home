<template>
  <section class="flex h-full">
    <div class="overflow-y-auto h-full w-full no-scrollbar px-4.5">
      <ListItem
        v-for="item in list"
        :key="item.id"
        :name="item.name || `照明`"
        :value="!!item.state"
        :device-id="item.device_id"
        :online="item.online"
      ></ListItem>
    </div>
    <!-- <div class="w-px h-full bg-[#727992]/50 flex-shrink-0 mx-16"></div> -->
  </section>
</template>

<script setup lang="ts">
import ListItem from "./ListItem.vue";
import { LightingStatus } from "@/api";
interface Props {
  list: LightingStatus[];
}
withDefaults(defineProps<Props>(), {});
</script>

<style scoped></style>
