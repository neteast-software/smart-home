<script setup lang="ts">
const windowTest = window;
</script>

<template>
  <div class="test">
    <!-- {{ windowTest.screen.width }}
    X
    {{ windowTest.screen.height }} -->
    <router-view></router-view>
  </div>
</template>

<style scoped></style>
