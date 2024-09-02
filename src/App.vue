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
import { ChamberingRepository } from '@/repositories/ChamberingRepository';
import { IRecipeService } from '@/services/IRecipeService';
import { IChamberingRepository } from '@/repositories/IChamberingRepository';
import { BrassService } from '@/services/BrassService';
import { IBrassService } from '@/services/IBrassService';
import { BulletService } from '@/services/BulletService';
import { IBulletService } from '@/services/IBulletService';
import { PrimerService } from '@/services/PrimerService';
import { IPrimerService } from '@/services/IPrimerService';
import { IPowderService } from '@/services/IPowderService';
import { PowderService } from '@/services/PowderService';
import { CaliberRepository } from '@/repositories/CaliberRepository';
import { ICaliberRepository } from '@/repositories/ICaliberRepository';
import { CaliberAutocompleteMapper } from '@/mappers/caliberAutocompleteMapper';
import { ICaliberAutocompleteMapper } from '@/mappers/ICaliberAutocompleteMapper';
import { ChamberingAutocompleteMapper } from '@/mappers/ChamberingAutocompleteMapper';
import { IChamberingAutocompleteMapper } from '@/mappers/IChamberingAutocompleteMapper';

const caliberRepository = new CaliberRepository();
provide<ICaliberRepository>('caliberRepository', caliberRepository);
const caliberAutocompleteMapper = new CaliberAutocompleteMapper();
provide<ICaliberAutocompleteMapper>('caliberAutocompleteMapper', caliberAutocompleteMapper);

const chamberingRepository = new ChamberingRepository(caliberRepository);
provide<IChamberingRepository>('chamberingRepository', chamberingRepository);
const chamberingAutocompleteMapper = new ChamberingAutocompleteMapper();
provide<IChamberingAutocompleteMapper>('chamberingAutocompleteMapper', chamberingAutocompleteMapper);

// TODO: those services are repositories, refactor them
const brassService = new BrassService();
provide<IBrassService>('brassService', brassService);

const recipeService = new RecipeService();
provide<IRecipeService>('recipeService', recipeService);

const bulletService = new BulletService();
provide<IBulletService>('bulletService', bulletService);

const primerService = new PrimerService();
provide<IPrimerService>('primerService', primerService);

const powderService = new PowderService();
provide<IPowderService>('powderService', powderService);

</script>

<style lang="scss">
@import "src/styles/theme.scss";

.page-container {
  width: 100%;
  height: 100%;

  background-color: $background;
}
</style>
