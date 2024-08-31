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

    <v-row  v-if="!isAddingChamber">
      <v-col cols="10">
        <v-autocomplete
          label="Chambre"
          :items="chamberingItems"
          @update:model-value="updateChambering"
          v-model="chamberingValue"
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
          v-model="editedRecipe.brass.chambering.caliber.name"
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
          v-model="editedRecipe.brass.chambering.caliber.name"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row  v-if="isAddingChamber">
      <v-col cols="1"></v-col>
      <v-col cols="11">
        <v-text-field
          label="Nom de la chambre"
          v-model="chamberingValue"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row  v-if="!isAddingBrass">
      <v-col cols="10">
        <v-autocomplete
          label="Brass"
          :items="filteredBrassItems"
          v-model="brassItem"
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
          v-model="editedRecipe.brass.manufacturer.name"
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
          v-model="editedRecipe.brass.manufacturer.name"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row v-if="!isAddingBullet">
      <v-col cols="10">
        <v-autocomplete
          label="Balle"
          :items="bullets"
          v-model="editedRecipe.bullet.id"
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
          v-model="editedRecipe.bullet.manufacturer.name"
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
          v-model="editedRecipe.bullet.manufacturer.name"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row v-if="isAddingBullet">
      <v-col cols="1"></v-col>
      <v-col cols="11">
        <v-text-field
          label="Nom du modèle de balle"
          v-model="editedRecipe.bullet.model"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row v-if="isAddingBullet">
      <v-col cols="1"></v-col>
      <v-col cols="11">
        <v-text-field
          label="Poids de la balle"
          suffix="mm"
          v-model="editedRecipe.bullet.weightInGrains"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row v-if="isAddingBullet">
      <v-col cols="1"></v-col>
      <v-col cols="11">
        <v-text-field
          label="Coefficien ballistique G1"
          v-model="editedRecipe.bullet.g1BallisticCoefficient"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row v-if="isAddingBullet">
      <v-col cols="1"></v-col>
      <v-col cols="11">
        <v-text-field
          label="Coefficien ballistique G7"
          v-model="editedRecipe.bullet.g1BallisticCoefficient"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row v-if="isAddingBullet">
      <v-col cols="1"></v-col>
      <v-col cols="11">
        <v-text-field
          label="Densitée de section"
          v-model="editedRecipe.bullet.sectionalDensity"
        ></v-text-field>
      </v-col>
    </v-row>

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
  import { ref, onMounted, inject } from 'vue';
  import { uuid } from 'vue-uuid';
  import { IRecipe } from '@/models/IRecipe';
  import { IChambering } from '@/models/IChambering';
  import { IChamberingService } from '@/services/IChamberingService';
  import { IAutocompleteItem } from '@/models/IAutocompleteItem';
  import { IBrass } from '@/models/IBrass';
import { IBrassService } from '@/services/IBrassService';

  const emit = defineEmits(['save'])
  const chamberingService = inject<IChamberingService>('chamberingService') as IChamberingService;
  const brassService = inject<IBrassService>('brassService') as IBrassService;

  const props = defineProps<{
    recipe: IRecipe,
  }>();

  const editedRecipe = ref<IRecipe>();
  const chamberingValue = ref<IChambering>();
  const chamberingItems = ref<IAutocompleteItem<IChambering>[]>([]);
  const brassItem = ref<IAutocompleteItem<IBrass>>();
  const brassItems = ref<IAutocompleteItem<IBrass>[]>([]);
  const filteredBrassItems = ref<IAutocompleteItem<IBrass>[]>([]);

  const calibers = ref<string[]>([]);
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

  onMounted(() => {
    const recipe = JSON.parse(JSON.stringify(props.recipe)) as IRecipe;
    if (!recipe) throw new Error("Recipe undefined");

    editedRecipe.value = recipe;
    const chambering = getRecipeChambering(recipe);
    setChamberingItems(chambering);
    setBrassItems(recipe.brass);
  });

  async function setChamberingItems(chambering?: IChambering) {
    chamberingItems.value = await chamberingService.getChamberings().then((chamberings) => {
      const chamberingItems = chamberings.map((chambering): IAutocompleteItem<IChambering> => {
        return {title: chambering.name, value: chambering}
      });

      if (chambering) {
        chamberingValue.value = chamberingItems.find(item => {
          return item.value.id === chambering.id;
        })?.value;
      }

      return chamberingItems;
    });
  }

  async function setBrassItems(brass?: IBrass) {
    brassItems.value = await brassService.getBrasses().then((brasses) => {
      const brassItems = brasses.map((brass): IAutocompleteItem<IBrass> => {
        return {title: `${brass.manufacturer.name} ${brass.chambering.name}`, value: brass}
      });

      if (brass) {
        brassItem.value = brassItems.find(item => {
          return item.value.id === brass.id;
        });
      }

      return brassItems
    });

    filterBrasses()
  }

  function updateChambering() {
    setTimeout(() => {
      filterBrasses();
    }, 0);
  }

  function filterBrasses() {
    const chamberingId = chamberingValue.value?.id;

    if (!chamberingId) {
      filteredBrassItems.value = brassItems.value;
      return;
    }

    filteredBrassItems.value = brassItems.value.filter((brassItem) => {
      return brassItem.value.chambering.id === chamberingId;
    });
  }

  function getRecipeChambering(recipe: IRecipe): IChambering | undefined {
    if (recipe.brass.chambering) return recipe.brass.chambering;
    return undefined;
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
