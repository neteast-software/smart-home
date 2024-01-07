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
