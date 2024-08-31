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
import { ChamberingService } from '@/services/ChamberingService';
import { IRecipeService } from '@/services/IRecipeService';
import { IChamberingService } from '@/services/IChamberingService';
import { BrassService } from '@/services/BrassService';
import { IBrassService } from '@/services/IBrassService';

const chamberingService = new ChamberingService();
provide<IChamberingService>('chamberingService', chamberingService);

const brassService = new BrassService();
provide<IBrassService>('brassService', brassService);

const recipeService = new RecipeService();
provide<IRecipeService>('recipeService', recipeService);

</script>

<style lang="scss">
@import "src/styles/theme.scss";

.page-container {
  width: 100%;
  height: 100%;

  background-color: $background;
}
</style>
