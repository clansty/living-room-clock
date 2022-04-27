<script setup lang="ts">
const props = defineProps<{
  text: string
}>();
</script>

<template>
  <div v-if="text && text == '未来两小时无降水'">
    {{ text }}
  </div>
</template>

<style scoped>
div {
  margin-top: 0.3em;
  padding-left: 0.3em;
}
</style>
