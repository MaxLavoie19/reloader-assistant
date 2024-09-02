<template>
  <div class="page">
    <v-sheet class="mx-auto">
      <div class="recipes-container">
        <recipeVue class="recipe" v-for="recipe in recipes" :key="recipe.id" :recipe="recipe"></recipeVue>
      </div>
      <div class="add-button-container">
        <v-btn
          v-if="!isEditingRecipe"
          class="add-recipe-button"
          elevation="4"
          size="x-large"
          variant="tonal"
          @click="addRecipe()"
        >
          <v-icon >mdi-plus</v-icon>
        </v-btn>
        <div v-if="isEditingRecipe && editedRecipe" class="form-container">
          <recipeForm :recipe="editedRecipe" @save="saveRecipe"></recipeForm>
        </div>
      </div>
    </v-sheet>
  </div>
</template>

<script setup lang="ts">

import { inject, ref } from "vue";

import recipeVue from "@/components/Recipe.vue";
import recipeForm from "@/components/RecipeForm.vue";
import { IRecipeRepository } from "@/repositories/IRecipeRepository";
import { IRecipe } from "@/models/IRecipe";

const recipeRepository = inject<IRecipeRepository>('recipeRepository') as IRecipeRepository;

const recipes = ref<IRecipe[]>();
const isEditingRecipe = ref(false);
const editedRecipe = ref<IRecipe>();

recipes.value = recipeRepository.getRecipes();

function addRecipe() {
  isEditingRecipe.value = true;
  editedRecipe.value = recipeRepository.getBlankRecipe();
}

function editRecipe(recipe: IRecipe) {
  isEditingRecipe.value = true;
  editedRecipe.value = recipe;
}

function saveRecipe(recipe: IRecipe) {
  recipeRepository.saveRecipe(recipe)
}

</script>

<style scoped lang="scss">
@import "src/styles/theme.scss";

  .page {
    height: 100%;
    width: 100%;

    .recipes-container,
    .add-button-container {
      display: flex;
      padding: 10px;
      max-width: 100%;
      justify-content: center;
      flex-wrap: wrap;

      .recipe {
        margin: 10px;
      }
    }

    .v-col {
      padding: 5px 10px;
    }

    .add-recipe-button {
      font-size: 40px;
      width: 300px;
      height: 180px;
    }

    .form-container {
      min-width: 300px;
      width: 100%;
      max-width: 600px;
    }
  }
</style>
