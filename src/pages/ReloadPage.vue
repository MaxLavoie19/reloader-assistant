<template>
  <div class="page">
    <v-sheet class="mx-auto">
      <div class="recipes-container">
        <recipeVue class="recipe" v-for="recipe in recipes" :key="recipe.id" :recipe="recipe"></recipeVue>
      </div>
      <div class="add-button-container">
        <v-btn
          v-if="!isAddingRecipe"
          class="add-recipe-button"
          elevation="4"
          size="x-large"
          variant="tonal"
          @click="addRecipe()"
        >
          <v-icon >mdi-plus</v-icon>
        </v-btn>
        <div v-if="isAddingRecipe && newRecipe" class="form-container">
          <v-form>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Nom de la recette"
                  v-model="newRecipe.name"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row  v-if="!isAddingChamber">
              <v-col cols="10">
                <v-autocomplete
                  label="Chambre"
                  :items="chambers"
                  v-model="newRecipe.brass.chambering.id"
                ></v-autocomplete>
              </v-col>
              <v-col cols="2">
                <v-btn
                  class="create-button"
                  icon="mdi-plus"
                  @click="addChamber()"
                ></v-btn>
              </v-col>
            </v-row>
            <v-row  v-if="isAddingChamber">
              <v-col cols="12" class="section-separator">Chambre</v-col>
            </v-row>
            <v-row  v-if="isAddingChamber && !isAddingCaliber">
              <v-col cols="1"></v-col>
              <v-col cols="9">
                <v-autocomplete
                  label="Calibre"
                  :items="calibers"
                  v-model="newRecipe.brass.chambering.caliber.name"
                ></v-autocomplete>
              </v-col>
              <v-col cols="2">
                <v-btn
                  class="create-button"
                  icon="mdi-plus"
                  @click="addCaliber()"
                ></v-btn>
              </v-col>
            </v-row>
            <v-row  v-if="isAddingChamber && isAddingCaliber">
              <v-col cols="1"></v-col>
              <v-col cols="11">
                <v-text-field
                  label="Nom du calibre"
                  v-model="newRecipe.brass.chambering.caliber.name"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row  v-if="isAddingChamber">
              <v-col cols="1"></v-col>
              <v-col cols="11">
                <v-text-field
                  label="Nom de la chambre"
                  v-model="newRecipe.brass.chambering.name"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row  v-if="!isAddingBrass">
              <v-col cols="10">
                <v-autocomplete
                  label="Brass"
                  :items="brasses"
                  v-model="newRecipe.brass.id"
                ></v-autocomplete>
              </v-col>
              <v-col cols="2">
                <v-btn
                  class="create-button"
                  icon="mdi-plus"
                  @click="addBrass()"
                ></v-btn>
              </v-col>
            </v-row>
            <v-row  v-if="isAddingBrass">
              <v-col cols="12" class="section-separator">Brass</v-col>
            </v-row>
            <v-row  v-if="isAddingBrass && !isAddingBrassManufacturer">
              <v-col cols="1"></v-col>
              <v-col cols="9">
                <v-autocomplete
                  label="Fabriquant de Brass"
                  :items="brassManufacturers"
                  v-model="newRecipe.brass.manufacturer.name"
                ></v-autocomplete>
              </v-col>
              <v-col cols="2">
                <v-btn
                  class="create-button"
                  icon="mdi-plus"
                  @click="addBrassManufacturer()"
                ></v-btn>
              </v-col>
            </v-row>
            <v-row  v-if="isAddingBrass && isAddingBrassManufacturer">
              <v-col cols="1"></v-col>
              <v-col cols="11">
                <v-text-field
                  label="Nom du fabriquant de brass"
                  v-model="newRecipe.brass.manufacturer.name"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row v-if="!isAddingBullet">
              <v-col cols="10">
                <v-autocomplete
                  label="Balle"
                  :items="bullets"
                  v-model="newRecipe.bullet.id"
                ></v-autocomplete>
              </v-col>
              <v-col cols="2">
                <v-btn
                  class="create-button"
                  icon="mdi-plus"
                  @click="addBullet()"
                ></v-btn>
              </v-col>
            </v-row>
            <v-row v-if="isAddingBullet">
              <v-col cols="12" class="section-separator">Balle</v-col>
            </v-row>
            <v-row v-if="isAddingBullet && !isAddingBulletManufacturer">
              <v-col cols="1"></v-col>
              <v-col cols="9">
                <v-autocomplete
                  label="Fabriquant de balle"
                  :items="bulletManufacturers"
                  v-model="newRecipe.bullet.manufacturer.name"
                ></v-autocomplete>
              </v-col>
              <v-col cols="2">
                <v-btn
                  class="create-button"
                  icon="mdi-plus"
                  @click="addBulletManufacturer()"
                ></v-btn>
              </v-col>
            </v-row>
            <v-row v-if="isAddingBullet && isAddingBulletManufacturer">
              <v-col cols="1"></v-col>
              <v-col cols="11">
                <v-text-field
                  label="Nom du fabriquant de balles"
                  v-model="newRecipe.bullet.manufacturer.name"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row v-if="isAddingBullet">
              <v-col cols="1"></v-col>
              <v-col cols="11">
                <v-text-field
                  label="Nom du modèle de balle"
                  v-model="newRecipe.bullet.model"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row v-if="isAddingBullet">
              <v-col cols="1"></v-col>
              <v-col cols="11">
                <v-text-field
                  label="Poids de la balle"
                  suffix="mm"
                  v-model="newRecipe.bullet.weightInGrains"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row v-if="isAddingBullet">
              <v-col cols="1"></v-col>
              <v-col cols="11">
                <v-text-field
                  label="Coefficien ballistique G1"
                  v-model="newRecipe.bullet.g1BallisticCoefficient"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row v-if="isAddingBullet">
              <v-col cols="1"></v-col>
              <v-col cols="11">
                <v-text-field
                  label="Coefficien ballistique G7"
                  v-model="newRecipe.bullet.g1BallisticCoefficient"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row v-if="isAddingBullet">
              <v-col cols="1"></v-col>
              <v-col cols="11">
                <v-text-field
                  label="Densitée de section"
                  v-model="newRecipe.bullet.sectionalDensity"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row v-if="!isAddingPrimer">
              <v-col cols="10">
                <v-autocomplete
                  label="Primer"
                  :items="primers"
                  v-model="newRecipe.primer.id"
                ></v-autocomplete>
              </v-col>
              <v-col cols="2">
                <v-btn
                  class="create-button"
                  icon="mdi-plus"
                  @click="addPrimer()"
                ></v-btn>
              </v-col>
            </v-row>
            <v-row v-if="isAddingPrimer">
              <v-col cols="12" class="section-separator">Primer</v-col>
            </v-row>
            <v-row v-if="isAddingPrimer && !isAddingPrimerManufacturer">
              <v-col cols="1"></v-col>
              <v-col cols="9">
                <v-autocomplete
                  label="Fabriquant de primer"
                  :items="primerManufacturers"
                  v-model="newRecipe.primer.manufacturer.name"
                ></v-autocomplete>
              </v-col>
              <v-col cols="2">
                <v-btn
                  class="create-button"
                  icon="mdi-plus"
                  @click="addPrimerManufacturer()"
                ></v-btn>
              </v-col>
            </v-row>
            <v-row v-if="isAddingPrimer && isAddingPrimerManufacturer">
              <v-col cols="1"></v-col>
              <v-col cols="11">
                <v-text-field
                  label="Fabriquant de primer"
                  v-model="newRecipe.primer.manufacturer.name"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row v-if="isAddingPrimer">
              <v-col cols="1"></v-col>
              <v-col cols="11">
                <v-text-field
                  label="Modèle de primer"
                  v-model="newRecipe.primer.name"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row v-if="isAddingPrimer">
              <v-col cols="1"></v-col>
              <v-col cols="11">
                <v-text-field
                  label="taille de primer"
                  v-model="newRecipe.primer.size"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row v-if="!isAddingPowder">
              <v-col cols="10">
                <v-autocomplete
                  label="Poudre"
                  :items="powders"
                  v-model="newRecipe.powder.id"
                ></v-autocomplete>
              </v-col>
              <v-col cols="2">
                <v-btn
                  class="create-button"
                  icon="mdi-plus"
                  @click="addPowder()"
                ></v-btn>
              </v-col>
            </v-row>
            <v-row v-if="isAddingPowder">
              <v-col cols="12" class="section-separator">Poudre</v-col>
            </v-row>
            <v-row v-if="isAddingPowder && !isAddingPowderManufacturer">
              <v-col cols="1"></v-col>
              <v-col cols="9">
                <v-autocomplete
                  label="Fabriquant de poudre"
                  v-model="newRecipe.powder.manufacturer.name"
                  :items="powderManufacturers"
                ></v-autocomplete>
              </v-col>
              <v-col cols="2">
                <v-btn
                  class="create-button"
                  icon="mdi-plus"
                  @click="addPowderManufacturer()"
                ></v-btn>
              </v-col>
            </v-row>
            <v-row v-if="isAddingPowder && isAddingPowderManufacturer">
              <v-col cols="1"></v-col>
              <v-col cols="11">
                <v-text-field
                  label="Fabriquant de poudre"
                  v-model="newRecipe.powder.manufacturer.name"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row v-if="isAddingPowder">
              <v-col cols="1"></v-col>
              <v-col cols="11">
                <v-text-field
                  label="Nom de poudre"
                  v-model="newRecipe.powder.name"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Quantité de poudre"
                  v-mode="newRecipe.powderQuantityGrains"
                  suffix="grains"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Seating depth"
                  v-mode="newRecipe.bulletSeatingDepth"
                  suffix="mm"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Cartridge Overall Length (COL)"
                  v-mode="newRecipe.cartridgeOveralLengthMm"
                  suffix="mm"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Base To Ogive Length (BTOL)"
                  v-mode="newRecipe.cartridgeBaseToOgiveLengthMm"
                  suffix="mm"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12">
                <v-textarea label="Notes"></v-textarea>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-btn class="save-button" size="x-large">
                  <v-icon>mdi-content-save</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </div>
      </div>
    </v-sheet>
  </div>
</template>

<script setup lang="ts">

import { inject, ref } from "vue";

import recipeVue from "@/components/recipe.vue";
import { IRecipeService } from "@/services/IRecipeService";
import { IRecipe } from "@/models/IRecipe";

const recipeService = inject<IRecipeService>('recipeService') as IRecipeService;

const recipes = ref<IRecipe[]>();
const newRecipe = ref<IRecipe>();
const chambers = ref<string[]>([]);
const calibers = ref<string[]>([]);
const brasses = ref<string[]>([]);
const brassManufacturers = ref<string[]>([]);
const bullets = ref<string[]>([]);
const bulletManufacturers = ref<string[]>([]);
const primers = ref<string[]>([]);
const primerManufacturers = ref<string[]>([]);
const powders = ref<string[]>([]);
const powderManufacturers = ref<string[]>([]);
const isAddingRecipe = ref(false);
const isAddingChamber = ref(false);
const isAddingCaliber = ref(false);
const isAddingBrass = ref(false);
const isAddingBrassManufacturer = ref(false);
const isAddingBullet = ref(false);
const isAddingBulletManufacturer = ref(false);
const isAddingPrimer = ref(false);
const isAddingPrimerManufacturer = ref(false);
const isAddingPowder = ref(false);
const isAddingPowderManufacturer = ref(false);

recipes.value = recipeService.getRecipes();

function addRecipe() {
  isAddingRecipe.value = true;
  newRecipe.value = recipeService.getEmptyRecipe();
}

function addChamber() {
  isAddingChamber.value = true;
}

function addCaliber() {
  isAddingCaliber.value = true;
}

function addBrass() {
  isAddingBrass.value = true;
}

function addBrassManufacturer() {
  isAddingBrassManufacturer.value = true;
}

function addBullet() {
  isAddingBullet.value = true;
}

function addBulletManufacturer() {
  isAddingBulletManufacturer.value = true;
}

function addPrimer() {
  isAddingPrimer.value = true;
}

function addPrimerManufacturer() {
  isAddingPrimerManufacturer.value = true;
}

function addPowder() {
  isAddingPowder.value = true;
}

function addPowderManufacturer() {
  isAddingPowderManufacturer.value = true;
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

    .section-separator {
      border-bottom: solid 1px $background-light;
      margin-bottom: 10px;
    }

    .save-button {
      width: 100%;
      margin-bottom: 10px;
      background-color: $background-light;
    }
  }
</style>
