<template>
  <v-dialog max-width="500" v-model="isVisible">
    <slot></slot>
  </v-dialog>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  const isVisible = ref(true);
</script>
