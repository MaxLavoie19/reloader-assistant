<template>
  <v-form v-if="editedRecipe !== undefined">
    <v-row>
      <v-col cols="12">
        <v-text-field
          label="Nom de la recette"
          v-model="editedRecipe.name"
        ></v-text-field>
      </v-col>
    </v-row>

    <chamber-section
      v-model="chamberingValue"
      @update:model-value="updateChambering"
    ></chamber-section>

    <brass-section
      v-if="chamberingValue?.id"
      v-model="brassValue"
      :chamberingValue="chamberingValue"
      @update:model-value="updateBrass"
    ></brass-section>

    <bullet-section
      v-if="chamberingValue && chamberingValue.caliber.name"
      v-model="bulletValue"
      :caliberValue="chamberingValue.caliber"
      @update:model-value="updateBullet"
    ></bullet-section>

    <primer-section
      v-model="primerValue"
      @update:model-value="updatePrimer"
    ></primer-section>

    <powder-section
      v-model="powderValue"
      @update:model-value="updatePowder"
    ></powder-section>

    <v-row>
      <v-col cols="12">
        <v-number-input
          label="Quantité de poudre minimale"
          v-model="editedRecipe.minPowderQuantityGrains"
          suffix="grains"
        ></v-number-input>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-number-input
          label="Quantité de poudre maximale"
          v-model="editedRecipe.maxPowderQuantityGrains"
          suffix="grains"
        ></v-number-input>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-number-input
          label="Seating depth"
          v-model="editedRecipe.bulletSeatingDepth"
          suffix="mm"
        ></v-number-input>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-number-input
          label="Cartridge Overall Length (COL)"
          v-model="editedRecipe.cartridgeOveralLengthMm"
          suffix="mm"
        ></v-number-input>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-number-input
          label="Base To Ogive Length (BTOL)"
          v-model="editedRecipe.cartridgeBaseToOgiveLengthMm"
          suffix="mm"
        ></v-number-input>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-textarea label="Notes" v-model="editedRecipe.notes"></v-textarea>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-btn class="save-button" size="x-large" @click="save()">
          <v-icon>mdi-content-save</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { VNumberInput } from 'vuetify/labs/VNumberInput'

  import { IRecipe } from '@/models/IRecipe';
  import { IChambering } from '@/models/IChambering';
  import { IBrass } from '@/models/IBrass';
  import { IBullet } from '@/models/IBullet';
  import { IPrimer } from '@/models/IPrimer';
  import { IPowder } from '@/models/IPowder';

  const emit = defineEmits(['save'])

  const props = defineProps<{
    recipe: IRecipe,
  }>();

  const editedRecipe = ref<IRecipe>();
  const chamberingValue = ref<IChambering>();
  const brassValue = ref<IBrass>();
  const bulletValue = ref<IBullet>();
  const primerValue = ref<IPrimer>();
  const powderValue = ref<IPowder>();

  onMounted(() => {
    const recipe = JSON.parse(JSON.stringify(props.recipe)) as IRecipe;
    if (!recipe) throw new Error("Recipe undefined");

    editedRecipe.value = recipe;
    chamberingValue.value = getRecipeChambering(recipe);
  });

  function updateChambering() {
  }

  function updateBrass() {

  }

  function updateBullet() {

  }

  function updatePrimer() {

  }

  function updatePowder() {

  }

  function getRecipeChambering(recipe: IRecipe): IChambering | undefined {
    if (recipe.brass.chambering) return recipe.brass.chambering;
    return undefined;
  }

  function save() {
    // TODO: validate that all fields are set
    const recipe = editedRecipe.value;
    const brass = brassValue.value;
    const bullet = bulletValue.value;
    const primer = primerValue.value;
    const powder = powderValue.value;

    /* if (!recipe || !brass || !bullet || !primer || !powder) return;

    recipe.id = uuid.v4()
    recipe.brass = brass;
    recipe.bullet = bullet;
    recipe.primer = primer;
    recipe.powder = powder;
    */

    emit('save', recipe);
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
