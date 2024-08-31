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
      v-if="chamberingValue.caliber"
      v-model="bulletValue"
      :caliberValue="chamberingValue.caliber"
      @update:model-value="updateBullet"
    ></bullet-section>

    <v-row v-if="!isAddingPrimer">
      <v-col cols="10">
        <v-autocomplete
          label="Primer"
          :items="primers"
          v-model="editedRecipe.primer.id"
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
          v-model="editedRecipe.primer.manufacturer.name"
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
          v-model="editedRecipe.primer.manufacturer.name"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row v-if="isAddingPrimer">
      <v-col cols="1"></v-col>
      <v-col cols="11">
        <v-text-field
          label="Modèle de primer"
          v-model="editedRecipe.primer.name"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row v-if="isAddingPrimer">
      <v-col cols="1"></v-col>
      <v-col cols="11">
        <v-text-field
          label="taille de primer"
          v-model="editedRecipe.primer.size"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row v-if="!isAddingPowder">
      <v-col cols="10">
        <v-autocomplete
          label="Poudre"
          :items="powders"
          v-model="editedRecipe.powder.id"
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
          v-model="editedRecipe.powder.manufacturer.name"
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
          v-model="editedRecipe.powder.manufacturer.name"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row v-if="isAddingPowder">
      <v-col cols="1"></v-col>
      <v-col cols="11">
        <v-text-field
          label="Nom de poudre"
          v-model="editedRecipe.powder.name"
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
        <v-btn class="save-button" size="x-large" @click="save()">
          <v-icon>mdi-content-save</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { uuid } from 'vue-uuid';
  import { IRecipe } from '@/models/IRecipe';
  import { IChambering } from '@/models/IChambering';
  import { IBrass } from '@/models/IBrass';
import { IBullet } from '@/models/IBullet';

  const emit = defineEmits(['save'])

  const props = defineProps<{
    recipe: IRecipe,
  }>();

  const editedRecipe = ref<IRecipe>();
  const chamberingValue = ref<IChambering>();
  const brassValue = ref<IBrass>();
  const bulletValue = ref<IBullet>();

  const primers = ref<string[]>([]);
  const primerManufacturers = ref<string[]>([]);
  const powders = ref<string[]>([]);
  const powderManufacturers = ref<string[]>([]);

  const isAddingPrimer = ref(false);
  const isAddingPrimerManufacturer = ref(false);
  const isAddingPowder = ref(false);
  const isAddingPowderManufacturer = ref(false);

  onMounted(() => {
    const recipe = JSON.parse(JSON.stringify(props.recipe)) as IRecipe;
    if (!recipe) throw new Error("Recipe undefined");

    editedRecipe.value = recipe;
    chamberingValue.value = getRecipeChambering(recipe);
  });

  function updateBrass() {

  }

  function updateBullet() {

  }

  function getRecipeChambering(recipe: IRecipe): IChambering | undefined {
    if (recipe.brass.chambering) return recipe.brass.chambering;
    return undefined;
  }

  function updateChambering() {
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

  function save() {
    // TODO: validate that all fields are set
    const recipe = editedRecipe.value;
    if (!recipe) return;

    if (!recipe?.id) {
      recipe.id = uuid.v4()
    }

    console.log(JSON.stringify(recipe, undefined, 2));
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
