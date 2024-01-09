<template>
  <div class="player-wrapper" ref="playerWrapper">
    <template v-if="!isVisible">
      <div
        style="
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        "
      >
        <NSpin></NSpin>
      </div>
    </template>
    <template v-else>
      <VideoPlayer
        :class="{ 'can-play': canPlay }"
        style="width: 100%; height: 100%"
        ref="player"
        class="my-player"
        :sources="sources"
        :controls="false"
        muted
        autoplay
        @canplay="canPlay = true"
      ></VideoPlayer>
    </template>
  </div>
</template>

<script setup lang="ts">
import { VideoPlayer } from "@videojs-player/vue";
import "video.js/dist/video-js.css";
import "./HlsMonitor.css";
import { computed, onMounted, ref } from "vue";
import { useIntersectionObserver } from "@vueuse/core";
import { NSpin } from "naive-ui";

interface Props {
  src: string;
}
const props = withDefaults(defineProps<Props>(), {});
const sources = computed(() => [
  {
    src: props.src,
    type: "application/x-mpegURL",
  },
]);
const player = ref<InstanceType<typeof VideoPlayer>>();
const playerWrapper = ref<HTMLDivElement>();
const isVisible = ref(false);
const { stop } = useIntersectionObserver(
  playerWrapper,
  ([{ isIntersecting }], observerElement) => {
    isVisible.value = isIntersecting;
  }
);
// onMounted(() => {
//   const { value: wrapper } = playerWrapper;
//   if (!wrapper) return;
//   const intersectionObserver = new IntersectionObserver((entries) => {
//     console.log("entries", entries);
//     if (entries[0].intersectionRatio <= 0) {
//       isStop.value = true;
//     } else {
//       isStop.value = false;
//     }
//   });
//   intersectionObserver.observe(wrapper);
// });
const canPlay = ref(false);
</script>

<style scoped lang="scss">
.player-wrapper {
  position: relative;
  &::after {
    content: "";
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 999;
  }
}
:deep(.can-play .vjs-loading-spinner) {
  display: none !important;
}
</style>
