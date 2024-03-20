<template>
  <ion-app>
    <NaiveProvider>
      <ion-router-outlet />
    </NaiveProvider>
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet, IonContent, createGesture } from "@ionic/vue";
import NaiveProvider from "./components/Provider/NaiveProvider.vue";
</script>
<style>
:root {
  /* #000108 */
  --dark-color: 0 1 8;
  /* #4DC591 */
  --primary-color: 77 197 145;
  /* #3FB682 */
  --primary-color-pressed: 63 182 130;
  /* #FF7648 */
  --complement-color: 255 118 72;
  /* #8A92A6 */
  --info-color: 138 146 166;
  /* #5E6A83 */
  --info-color-pressed: 94 106 131;
  /* #232D42 */
  --gray-color: 35 45 66;
  --background: #000108;
}
</style>
