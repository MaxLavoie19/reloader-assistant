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
  import { IPrimerRepository } from '@/repositories/IPrimerRepository';
  import { IPowderRepository } from '@/repositories/IPowderRepository';
  import { PowderRepository } from '@/repositories/PowderRepository';
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
  import { PrimerAutocompleteMapper } from '@/mappers/PrimerAutocompleteMapper';
  import { IPrimerAutocompleteMapper } from '@/mappers/IPrimerAutocompleteMapper';
  import { PrimerRepository } from '@/repositories/PrimerRepository';
import { PowderAutocompleteMapper } from '@/mappers/PowderAutocompleteMapper';
import { IPowderAutocompleteMapper } from '@/mappers/IPowderAutocompleteMapper';

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

  const primerRepository = new PrimerRepository();
  provide<IPrimerRepository>('primerRepository', primerRepository);
  const primerAutocompleteMapper = new PrimerAutocompleteMapper();
  provide<IPrimerAutocompleteMapper>('primerAutocompleteMapper', primerAutocompleteMapper);

  const powderRepository = new PowderRepository();
  provide<IPowderRepository>('powderRepository', powderRepository);
  const powderAutocompleteMapper = new PowderAutocompleteMapper();
  provide<IPowderAutocompleteMapper>('powderAutocompleteMapper', powderAutocompleteMapper);
</script>

<style lang="scss">
@import "src/styles/theme.scss";

.page-container {
  width: 100%;
  height: 100%;

  background-color: $background;
}
</style>
