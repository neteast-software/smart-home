<template>
  <aside>
    <div
      v-for="(tab, idx) in tabs"
      :key="tab[labelField]"
      class="relative pl-6 w-116px flex-col justify-center border-3 border-r-0 border-solid border-transparent rounded-tl-3 rounded-bl-3 transition-all ease-out"
      :class="[activeIndex === idx ? 'active' : '', tabClass]"
      @click="activeIndex != idx && $emit('toggle', idx)"
      :style="{ height: `${(1 / tabs.length) * 100}%` }"
    >
      <label class="text-4.5 text-info leading-38px">{{
        tab[labelField]
      }}</label>
      <span class="text-7">{{ tab[valueField] }}</span>
    </div>
  </aside>
</template>

<script setup lang="ts">
import UseResponsive from "@/components/UseResponsive.vue";
interface Props {
  tabs: Record<string, any>[];
  tabClass?: any;
  reverse?: boolean;
  activeIndex: number;
  labelField?: string;
  valueField?: string;
}
withDefaults(defineProps<Props>(), {
  activeIndex: 0,
  labelField: "name",
  valueField: "value",
});
defineEmits<{
  toggle: [index: number];
}>();
</script>

<style scoped>
.active {
  background: linear-gradient(51deg, #192132 70%, rgba(31, 40, 59, 0) 173%);
  border-color: #0d121b;
}
.reverse {
  @apply rounded-tr-0 rounded-br-0 rounded-tl-0 rounded-bl-0;
}
</style>
