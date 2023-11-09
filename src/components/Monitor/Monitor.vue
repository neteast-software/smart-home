<template>
  <div class="w-full pt-[65%] relative">
    <div class="absolute-full">
      <!-- <LivePlayer :sources="sources" class="rounded overflow-hidden"></LivePlayer> -->
      <!-- @command="controlMonitor(indexCode, $event)"
        @add-preset="addPreset" -->
      <WebRTCPlayer
        v-if="src"
        :controls="controls"
        class="rounded overflow-hidden"
        :src="src"
        :id="indexCode"
      ></WebRTCPlayer>
      <div
        v-else
        class="relative w-full h-full bg-black rounded overflow-hidden"
      ></div>
      <button
        class="absolute left-4 top-4 text-white z-50 bg-black/50 h-10 px-4 rounded-full"
      >
        {{ name }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import WebRTCPlayer from "./WebRTCPlayer.vue";
// import { controlMonitor, setPresetPoint } from "@/api/monitor";
interface Props {
  indexCode: string;
  src: string;
  name: string;
  type?: string;
  controls?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  type: "application/x-mpegURL",
});
// defineEmits(["showHistory"]);
// const sources = computed(() => [
//     {
//         src: props.src,
//         type: props.type
//     }
// ]);
// async function addPreset() {
//   try {
//     await setPresetPoint(props.indexCode);
//     window.$message?.success("添加预置点成功");
//   } catch (error) {
//     window.$message?.error("添加预置点失败");
//   }
// }
</script>

<style scoped></style>
