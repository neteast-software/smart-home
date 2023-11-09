<script lang="ts" setup>
import LeftPart from "./LeftPart.vue";
import RightPart from "./RightPart.vue";
</script>
<template>
    <div class="header-container">
        <LeftPart />
        <div class="middle">|</div>
        <RightPart />
    </div>
</template>
<style lang="scss" scoped>
.header-container {
    padding: 15px 20px 0;
    width: 100vw !important;
    box-sizing: border-box;
    display: flex;
    //   align-items: center;
    justify-content: space-between;
}

.middle {
    display: flex;
    align-items: center;
    //   margin: 0 10px;
    color: #727992;
    opacity: 0.7;
}
</style>
