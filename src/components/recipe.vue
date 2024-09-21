<template>
  <div class="recipe-container">
    <span>
      <div class="title">
        <h1>{{ recipe.name }} : </h1>
        <h2>{{ recipe.brass.chambering.name }}</h2>
      </div>
      <div class="details">
        <span class="detail-title">Brass: </span>
        <span class="detail-info">{{ recipe.brass.manufacturer.name }}</span>
      </div>
      <div class="details">
        <span class="detail-title">Bullet: </span>
        <span class="detail-info">{{ `${recipe.bullet.manufacturer.name} ${recipe.bullet.model} ${recipe.bullet.weightInGrains}Gn` }}</span>
      </div>
      <div class="details">
        <span class="detail-title">Powder: </span>
        <span class="detail-info">{{ `${recipe.maxPowderQuantityGrains}Gn ${recipe.powder.manufacturer.name} ${recipe.powder.name}` }}</span>
      </div>
      <div class="details">
        <span class="detail-title">Primer: </span>
        <span class="detail-info">{{ `${recipe.primer.manufacturer.name} ${recipe.primer.size} ${recipe.primer.name}` }}</span>
      </div>

      <div v-if="recipe.bulletSeatingDepth !== undefined">
        <span class="detail-title">bulletSeatingDepth: </span>
        <span class="detail-info">{{ recipe.bulletSeatingDepth }}</span>
      </div>
      <div v-if="recipe.cartridgeBaseToOgiveLengthMm !== undefined">
        <span class="detail-title">cartridgeBaseToOgiveLengthMm: </span>
        <span class="detail-info">{{ recipe.cartridgeBaseToOgiveLengthMm }}</span>
      </div>
      <div v-if="recipe.cartridgeOveralLengthMm !== undefined">
        <span class="detail-title">cartridgeOveralLengthMm: </span>
        <span class="detail-info">{{ recipe.cartridgeOveralLengthMm }}</span>
      </div>
    </span>
    <span class="buttons-container">
      <span class="buttons-column">
        <v-btn class="action-button" icon="mdi-content-copy" density="comfortable" elevation="4"></v-btn>
        <v-btn class="action-button" icon="mdi-qrcode" density="comfortable" elevation="4" @click="generateQr(recipe)"></v-btn>
        <v-btn class="action-button" icon="mdi-printer" density="comfortable" elevation="4"></v-btn>
      </span>
    </span>
  </div>
</template>

<script setup lang="ts">
  import { IRecipe } from "@/models/IRecipe";
import { IApiService } from "@/services/ApiService/IApiService";
import { inject } from "vue";

  const apiService = inject('apiService') as IApiService;

  defineProps<{
    recipe: IRecipe,
  }>();

  function generateQr(recipe: IRecipe) {
    apiService.post<IRecipe, string>('recipe-qr-data', recipe)
      .subscribe((qrData: string) => {
        console.log('qrData', qrData);
      });
  }
</script>

<style scoped lang="scss">
@import "src/styles/theme.scss";

  .recipe-container {
    background: $background-light;
    padding: 15px;
    display: inline-block;
    border-radius: 5px;
    min-width: 370px;

    -webkit-user-select: none; /* Safari */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* IE10+/Edge */
    user-select: none; /* Standard */

    &:hover {
      box-shadow: -5px 3px 15px #000;
    }

    span {
      display: inline-block;
      vertical-align: top;
    }
  }

  h1,
  h2 {
    text-transform: capitalize;
    display: inline-block;
  }

  h2 {
    padding-left: 10px;
  }

  .buttons-container {
    margin: 0 20px;

    .buttons-column {
      display:  flex;
      flex-direction: column;
      justify-content: center;

      .action-button {
        vertical-align: baseline;
        margin: 5px;
      }
    }
  }

  .details {
    padding-left: 10px;

    .detail-title {
      font-size: medium;
      font-weight: 600;
      padding-right: 5px;
    }

    .detail-info {
      font-size: small;
      vertical-align: text-bottom;
    }
  }
</style>
