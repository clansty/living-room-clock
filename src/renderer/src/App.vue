<script setup lang="ts">
import { dateZhCN, NConfigProvider, zhCN } from 'naive-ui';
import { RouterView } from 'vue-router';

</script>

<template>
  <NConfigProvider :locale="zhCN" :dateLocale="dateZhCN">
    <RouterView/>
  </NConfigProvider>
</template>

<style>
html, body {
  height: 100vh;
  margin: 0;
  /*cursor: none;*/
  overflow: hidden;
}

body {
  background-color: #fff;
}

iframe, webview {
  border: none;
  height: 100%;
  width: 100%;
}
</style>
