<template>
  <header class="flex-y-center py-2 px-2 mb-2">
    <section class="w-12 z-9999 relative">
      <CirCleButton>
        <i class="i-custom:back text-white text-6" @click="$router.back()"></i>
      </CirCleButton>
    </section>
    <section class="flex-w-rest text-center text-6">{{ name }}</section>
    <section class="w-12 text-info text-5.5">设置</section>
  </header>
</template>

<script setup lang="ts">
import CirCleButton from "@/components/CircleButton.vue";
import { inject, onMounted, ref, onBeforeUnmount } from "vue";
interface Props {
  name: string;
}
withDefaults(defineProps<Props>(), {});
const showExit = inject("showExit", ref(true));
onMounted(() => {
  showExit.value = false;
});
onBeforeUnmount(() => {
  showExit.value = true;
});

// import { useFullscreen } from '@vueuse/core';
// const { toggle } = useFullscreen();
</script>

<style scoped></style>
