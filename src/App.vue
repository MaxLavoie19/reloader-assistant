<template>
  <v-app>
    <v-main>
      <div class="page-container">
        <div class="user-menu">
          <v-btn v-if="isLogingInRef" @click="logout()" icon="mdi-logout"></v-btn>
        </div>
        <router-view/>
      </div>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
  import { RouterView } from 'vue-router';
  import { RecipeRepository } from '@/repositories/RecipeRepository/RecipeRepository'
  import { getCurrentInstance, provide, ref } from 'vue';
  import { ChamberingRepository } from '@/repositories/ChamberRepository/ChamberingRepository';
  import { IRecipeRepository } from '@/repositories/RecipeRepository/IRecipeRepository';
  import { IChamberingRepository } from '@/repositories/ChamberRepository/IChamberingRepository';
  import { BrassRepository } from '@/repositories/BrassRepository/BrassRepository';
  import { IBrassRepository } from '@/repositories/BrassRepository/IBrassRepository';
  import { IBulletRepository } from '@/repositories/BulletRepository/IBulletRepository';
  import { IPrimerRepository } from '@/repositories/PrimerRepository/IPrimerRepository';
  import { IPowderRepository } from '@/repositories/PowderRepository/IPowderRepository';
  import { PowderRepository } from '@/repositories/PowderRepository/PowderRepository';
  import { CaliberRepository } from '@/repositories/CaliberRepository/CaliberRepository';
  import { ICaliberRepository } from '@/repositories/CaliberRepository/ICaliberRepository';
  import { CaliberAutocompleteMapper } from '@/mappers/CaliberAutocompleteMapper';
  import { ICaliberAutocompleteMapper } from '@/mappers/ICaliberAutocompleteMapper';
  import { ChamberingAutocompleteMapper } from '@/mappers/ChamberingAutocompleteMapper';
  import { IChamberingAutocompleteMapper } from '@/mappers/IChamberingAutocompleteMapper';
  import { BrassAutocompleteMapper } from '@/mappers/BrassAutocompleteMapper';
  import { IBrassAutocompleteMapper } from '@/mappers/IBrassAutocompleteMapper';
  import { IManufacturerRepository } from '@/repositories/ManufacturerRepository/IManufacturerRepository';
  import { ManufacturerRepository } from '@/repositories/ManufacturerRepository/ManufacturerRepository';
  import { ManufacturerAutocompleteMapper } from '@/mappers/ManufacturerAutocompleteMapper';
  import { IManufacturerAutocompleteMapper } from '@/mappers/IManufacturerAutocompleteMapper';
  import { BulletRepository } from '@/repositories/BulletRepository/BulletRepository';
  import { BulletAutocompleteMapper } from '@/mappers/BulletAutocompleteMapper';
  import { IBulletAutocompleteMapper } from '@/mappers/IBulletAutocompleteMapper';
  import { PrimerAutocompleteMapper } from '@/mappers/PrimerAutocompleteMapper';
  import { IPrimerAutocompleteMapper } from '@/mappers/IPrimerAutocompleteMapper';
  import { PrimerRepository } from '@/repositories/PrimerRepository/PrimerRepository';
  import { PowderAutocompleteMapper } from '@/mappers/PowderAutocompleteMapper';
  import { IPowderAutocompleteMapper } from '@/mappers/IPowderAutocompleteMapper';
  import { ApiService } from '@/services/ApiService/ApiService';
  import { SessionsRespository } from '@/repositories/SessionRepository/SessionRepository';
  import { GlobalErrorHandlerService } from '@/services/GlobalErrorHandlerService/GlobalErrorHandlerService';
  import { NotAuthenticatedError } from '@/errors/NotAuthenticatedError';
  import { ModalService } from '@/services/ModalService/ModalService';
  import Login from '@/components/Login.vue';
  import { IApiService } from '@/services/ApiService/IApiService';
  import { ICredentials } from '@/services/ApiService/ICredentials';
  import { first } from 'rxjs';

  const isLogingInRef = ref(true);

  const globalErrorHandlerService = new GlobalErrorHandlerService();

  window.addEventListener('unhandledrejection', (promiseRejectionEvent: PromiseRejectionEvent) => {
    const error = (promiseRejectionEvent.reason);
    const isErrorHandled = globalErrorHandlerService.handleError(error, error.message);
    if (isErrorHandled) promiseRejectionEvent.preventDefault();
  });

  window.onerror = (
    message: string | Event, url?: string, line?: number, column?: number, error?: Error
  ) => {
    if (!error) return;
    globalErrorHandlerService.handleError(error, message, url, line, column);
  };

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

  const modalService = new ModalService();
  const sessionRepository = new SessionsRespository();
  const apiService = new ApiService(sessionRepository);
  provide<IApiService>('apiService', apiService);

  sessionRepository.isLoggedIn().subscribe((isLogingIn) => {
    isLogingInRef.value = isLogingIn;
  });

  const app = getCurrentInstance();
  const appContext = app?.appContext;
  globalErrorHandlerService.registerErrorHandler(NotAuthenticatedError, () => {
    if (!appContext) return;
    modalService.show<ICredentials>(Login, document.documentElement, appContext, (credentials) => {
      return new Promise((resolve) => {
        apiService.login(credentials.username, credentials.password)
          .pipe(first())
          .subscribe(succeeded => resolve(succeeded));
      });
    });
  });
  const recipeRepository = new RecipeRepository(apiService);
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

  function logout() {
    apiService.logout()
  }
</script>

<style lang="scss">
@import "src/styles/theme.scss";

.page-container {
  width: 100%;
  height: 100%;

  background-color: $background;

  .user-menu {
    position: absolute;
    top: 10px;
    right: 10px;
  }
}
</style>
