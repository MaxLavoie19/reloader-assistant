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
import { RecipeRepository } from '@/repositories/RecipeRepository'
import { provide } from 'vue';
import { ChamberingRepository } from '@/repositories/ChamberingRepository';
import { IRecipeRepository } from '@/repositories/IRecipeRepository';
import { IChamberingRepository } from '@/repositories/IChamberingRepository';
import { BrassRepository } from '@/repositories/BrassRepository';
import { IBrassRepository } from '@/repositories/IBrassRepository';
import { IBulletRepository } from '@/repositories/IBulletRepository';
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
import { BrassAutocompleteMapper } from '@/mappers/BrassAutocompleteMapper';
import { IBrassAutocompleteMapper } from '@/mappers/IBrassAutocompleteMapper';
import { IManufacturerRepository } from '@/repositories/IManufacturerRepository';
import { ManufacturerRepository } from '@/repositories/ManufacturerRepository';
import { ManufacturerAutocompleteMapper } from '@/mappers/ManufacturerAutocompleteMapper';
import { IManufacturerAutocompleteMapper } from '@/mappers/IManufacturerAutocompleteMapper';
import { BulletRepository } from '@/repositories/BulletRepository';
import { BulletAutocompleteMapper } from '@/mappers/BulletAutocompleteMapper';
import { IBulletAutocompleteMapper } from '@/mappers/IBulletAutocompleteMapper';

const caliberRepository = new CaliberRepository();
provide<ICaliberRepository>('caliberRepository', caliberRepository);
const caliberAutocompleteMapper = new CaliberAutocompleteMapper();
provide<ICaliberAutocompleteMapper>('caliberAutocompleteMapper', caliberAutocompleteMapper);

const chamberingRepository = new ChamberingRepository(caliberRepository);
provide<IChamberingRepository>('chamberingRepository', chamberingRepository);
const chamberingAutocompleteMapper = new ChamberingAutocompleteMapper();
provide<IChamberingAutocompleteMapper>('chamberingAutocompleteMapper', chamberingAutocompleteMapper);

const brassRepository = new BrassRepository();
provide<IBrassRepository>('brassRepository', brassRepository);
const brassAutocompleteMapper = new BrassAutocompleteMapper();
provide<IBrassAutocompleteMapper>('brassAutocompleteMapper', brassAutocompleteMapper);

const manufacturerRepository = new ManufacturerRepository();
provide<IManufacturerRepository>('manufacturerRepository', manufacturerRepository);
const manufacturerAutocompleteMapper = new ManufacturerAutocompleteMapper();
provide<IManufacturerAutocompleteMapper>('manufacturerAutocompleteMapper', manufacturerAutocompleteMapper);

const recipeRepository = new RecipeRepository();
provide<IRecipeRepository>('recipeRepository', recipeRepository);

const bulletRepository = new BulletRepository();
provide<IBulletRepository>('bulletRepository', bulletRepository);
const bulletAutocompleteMapper = new BulletAutocompleteMapper();
provide<IBulletAutocompleteMapper>('bulletAutocompleteMapper', bulletAutocompleteMapper);

// TODO: those services are repositories, refactor them
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
