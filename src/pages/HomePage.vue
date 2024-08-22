<template>
  <div class="page">
    <div class="options">
      <div class="option">
        <v-btn elevation="4" size="x-large" variant="tonal" @click="navigateTo('reload')">
          Recharger
        </v-btn>
      </div>
      <div class="option">
        <v-btn elevation="4" size="x-large" variant="tonal" @click="navigateTo('shoot')">
          Tirer
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from "@/router";

function navigateTo(name: string): void {
  router.push({name});
}
</script>

<style scoped lang="scss">
@import "src/styles/theme.scss";

  .page {
    height: 100%;
    width: 100%;

    .options {
      display: flex;
      flex-flow: column wrap;
      justify-content: center;
      align-items: center;
      height: 100%;

      .option {
        padding: 30px;
        text-align: center;

        button {
          color: $highlight-light;
          background-color: $background;

          &:hover {
            color: $primary;
          }
        }
      }
    }
  }
</style>
