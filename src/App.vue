<template>
  <v-app>
    <v-main>
      <div class="page-container">
        <router-view/>
      </div>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import { RecipeService } from '@/services/RecipeService'
import { provide } from 'vue';

const recipeService = new RecipeService();
provide('recipeService', recipeService);

</script>

<style lang="scss">
@import "src/styles/theme.scss";

.page-container {
  width: 100%;
  height: 100%;

  background-color: $background;
}
</style>
