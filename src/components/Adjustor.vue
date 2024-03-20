<template>
  <div class="flex gap-x-4">
    <Measurer v-bind="props" :value="modelValue">
      <template
        #[slotName]="props"
        v-for="(_, slotName) in $slots"
        :key="slotName"
      >
        <slot :name="slotName" v-bind="props"></slot>
      </template>
    </Measurer>
    <div class="flex-col justify-between" :class="buttonWrapperClass">
      <Button
        :width="buttonWidth"
        :height="buttonHeight"
        @click="
          modelValue < upperLimit &&
            $emit(
              'update:modelValue',
              modelValue + step > upperLimit ? upperLimit : modelValue + step
            )
        "
        ><i class="i-custom:plus text-10"></i
      ></Button>
      <Button
        :width="buttonWidth"
        :height="buttonHeight"
        @click="
          modelValue > lowerLimit &&
            $emit(
              'update:modelValue',
              modelValue - step < lowerLimit ? lowerLimit : modelValue - step
            )
        "
        ><i class="i-custom:minus text-10"></i
      ></Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import Measurer, { Props as MeasurerProps } from "@/components/Measurer.vue";
import Button from "@/components/Button.vue";
interface Props extends Omit<MeasurerProps, "value"> {
  buttonWidth?: number;
  buttonHeight?: number;
  modelValue: number;
  step?: number;
  buttonWrapperClass?: any;
}
const props = withDefaults(defineProps<Props>(), {
  height: 292,
  value: 50,
  lowerLimit: 0,
  upperLimit: 100,
  minCozy: 20,
  maxCozy: 80,
  ratio: 0.225,
  buttonWidth: 68,
  buttonHeight: 68,
  step: 1,
});
defineEmits<{
  "update:modelValue": [value: number];
}>();
</script>

<style scoped></style>
