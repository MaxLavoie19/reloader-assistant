<template>
  <v-form>
    <v-row>
      <v-col cols="12">
        <v-text-field
          label="Nom de la recette"
          v-model="recipe.name"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row  v-if="!isAddingChamber">
      <v-col cols="10">
        <v-autocomplete
          label="Chambre"
          :items="chambers"
          v-model="recipe.brass.chambering.id"
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
          v-model="recipe.brass.chambering.caliber.name"
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
          v-model="recipe.brass.chambering.caliber.name"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row  v-if="isAddingChamber">
      <v-col cols="1"></v-col>
      <v-col cols="11">
        <v-text-field
          label="Nom de la chambre"
          v-model="recipe.brass.chambering.name"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row  v-if="!isAddingBrass">
      <v-col cols="10">
        <v-autocomplete
          label="Brass"
          :items="brasses"
          v-model="recipe.brass.id"
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
          v-model="recipe.brass.manufacturer.name"
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
          v-model="recipe.brass.manufacturer.name"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row v-if="!isAddingBullet">
      <v-col cols="10">
        <v-autocomplete
          label="Balle"
          :items="bullets"
          v-model="recipe.bullet.id"
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
          v-model="recipe.bullet.manufacturer.name"
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
          v-model="recipe.bullet.manufacturer.name"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row v-if="isAddingBullet">
      <v-col cols="1"></v-col>
      <v-col cols="11">
        <v-text-field
          label="Nom du modèle de balle"
          v-model="recipe.bullet.model"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row v-if="isAddingBullet">
      <v-col cols="1"></v-col>
      <v-col cols="11">
        <v-text-field
          label="Poids de la balle"
          suffix="mm"
          v-model="recipe.bullet.weightInGrains"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row v-if="isAddingBullet">
      <v-col cols="1"></v-col>
      <v-col cols="11">
        <v-text-field
          label="Coefficien ballistique G1"
          v-model="recipe.bullet.g1BallisticCoefficient"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row v-if="isAddingBullet">
      <v-col cols="1"></v-col>
      <v-col cols="11">
        <v-text-field
          label="Coefficien ballistique G7"
          v-model="recipe.bullet.g1BallisticCoefficient"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row v-if="isAddingBullet">
      <v-col cols="1"></v-col>
      <v-col cols="11">
        <v-text-field
          label="Densitée de section"
          v-model="recipe.bullet.sectionalDensity"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row v-if="!isAddingPrimer">
      <v-col cols="10">
        <v-autocomplete
          label="Primer"
          :items="primers"
          v-model="recipe.primer.id"
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
          v-model="recipe.primer.manufacturer.name"
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
          v-model="recipe.primer.manufacturer.name"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row v-if="isAddingPrimer">
      <v-col cols="1"></v-col>
      <v-col cols="11">
        <v-text-field
          label="Modèle de primer"
          v-model="recipe.primer.name"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row v-if="isAddingPrimer">
      <v-col cols="1"></v-col>
      <v-col cols="11">
        <v-text-field
          label="taille de primer"
          v-model="recipe.primer.size"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row v-if="!isAddingPowder">
      <v-col cols="10">
        <v-autocomplete
          label="Poudre"
          :items="powders"
          v-model="recipe.powder.id"
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
          v-model="recipe.powder.manufacturer.name"
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
          v-model="recipe.powder.manufacturer.name"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row v-if="isAddingPowder">
      <v-col cols="1"></v-col>
      <v-col cols="11">
        <v-text-field
          label="Nom de poudre"
          v-model="recipe.powder.name"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-text-field
          label="Quantité de poudre"
          v-mode="recipe.powderQuantityGrains"
          suffix="grains"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-text-field
          label="Seating depth"
          v-mode="recipe.bulletSeatingDepth"
          suffix="mm"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-text-field
          label="Cartridge Overall Length (COL)"
          v-mode="recipe.cartridgeOveralLengthMm"
          suffix="mm"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-text-field
          label="Base To Ogive Length (BTOL)"
          v-mode="recipe.cartridgeBaseToOgiveLengthMm"
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
</template>
<script setup lang="ts">
import { IRecipe } from '@/models/IRecipe';
import { ref } from 'vue';

const prop = defineProps<{
  recipe: IRecipe,
}>();

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

<style lang="scss" scoped>
@import "src/styles/theme.scss";
.section-separator {
  border-bottom: solid 1px $background-light;
  margin-bottom: 10px;
}

.save-button {
  width: 100%;
  margin-bottom: 10px;
  background-color: $background-light;
}
</style>
