<template>
  <v-card min-width="500">
    <v-card-item>
      <v-card-title>Authentification</v-card-title>
    <v-card-subtitle>Entrez votre nom d'utilisateur et votre mot de passe</v-card-subtitle>
    </v-card-item>
    <v-card-text>
      <v-form>
        <v-text-field
          label="Nom d'utilisateur"
          v-model="username"
        ></v-text-field>
        <v-text-field
          label="Mot de passe"
          v-model="password"
          type="password"
        ></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn class="login-button" size="x-large" @click="login()">
        <v-icon>mdi-login</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts" setup>
  import { ICredentials } from '@/services/ApiService/ICredentials';
  import { ref } from 'vue';

  const model = defineModel<ICredentials>();

  const username = ref<string>();
  const password = ref<string>();

  function login() {
    if (!username.value || !password.value) return;
    model.value = {username: username.value, password: password.value};
  }
</script>

<style scoped lang="scss">
  @import "src/styles/theme.scss";
  .login-button {
    width: 100%;
    background-color: $background-light;
  }
</style>
