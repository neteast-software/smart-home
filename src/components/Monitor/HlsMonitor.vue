<template>
  <div class="player-wrapper">
    <VideoPlayer
      style="width: 100%; height: 100%"
      ref="player"
      class="my-player"
      :sources="sources"
      :controls="false"
      muted
      autoplay
    ></VideoPlayer>
  </div>
</template>

<script setup lang="ts">
import { VideoPlayer } from "@videojs-player/vue";
import "video.js/dist/video-js.css";
import "./HlsMonitor.css";
import { computed, onMounted, ref } from "vue";
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
onMounted(() => {
  if (!player.value) return;
  // const video = document.querySelector(".my-player video");
});
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
</style>
