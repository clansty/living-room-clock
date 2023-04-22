<script setup lang="ts">
const props = defineProps<{
  src: string
}>();
</script>

<template>
  <webview :src="props.src"/>
</template>
