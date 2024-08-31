<template>

  <div v-if="model">
    <v-row  v-if="!isAddingBrass">
      <v-col cols="10">
        <v-autocomplete
          label="Brass"
          :items="filteredBrassItems"
          v-model="brassValue"
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
          :items="brassManufacturerItems"
          v-model="brassManufacturerValue"
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
          v-model="brassManufacturerName"
        ></v-text-field>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
  import { inject, onMounted, ref, watch } from 'vue';

  import { IAutocompleteItem } from '@/models/IAutocompleteItem';
  import { IBrass } from '@/models/IBrass';
  import { IManufacturer } from '@/models/IManufacturer';
  import { IBrassService } from '@/services/IBrassService';
  import { IChambering } from '@/models/IChambering';

  const brassService = inject<IBrassService>('brassService') as IBrassService;

  const model = defineModel<IBrass>();

  const props = defineProps<{
    chamberingValue: IChambering,
  }>();

  watch(() => props.chamberingValue, updateChambering);

  const brassValue = ref<IBrass>();
  const brassItems = ref<IAutocompleteItem<IBrass>[]>([]);
  const filteredBrassItems = ref<IAutocompleteItem<IBrass>[]>([]);


  const brassManufacturerItems = ref<IAutocompleteItem<IManufacturer>[]>([]);
  const brassManufacturerValue = ref<IAutocompleteItem<IManufacturer>>();
  const isAddingBrass = ref(false);
  const isAddingBrassManufacturer = ref(false);
  const brassManufacturerName = ref('');

  onMounted(() => {
    if (!model.value) {
      model.value = brassService.getBlankBrass(props.chamberingValue)
    }
    setBrassItems(model.value);
  });

  async function setBrassItems(brass: IBrass) {
    brassItems.value = await brassService.getBrasses().then((brasses) => {
      const brassItems = brasses.map((brass): IAutocompleteItem<IBrass> => {
        return {title: `${brass.manufacturer.name} ${brass.chambering.name}`, value: brass}
      });

      if (brass) {
        brassValue.value = brassItems.find(item => {
          return item.value.id === brass.id;
        })?.value;
      }

      return brassItems
    });
    filterBrasses();
  }

  function updateChambering() {
    brassValue.value = undefined;
    filterBrasses();
  }

  function filterBrasses() {
    const chamberingId = props.chamberingValue.id;

    if (!chamberingId) {
      filteredBrassItems.value = brassItems.value;
      return;
    }

    filteredBrassItems.value = brassItems.value.filter((brassItem) => {
      return brassItem.value.chambering.id === chamberingId;
    });
  }

  function addBrass() {
    isAddingBrass.value = true;
  }

  function addBrassManufacturer() {
    isAddingBrassManufacturer.value = true;
  }
</script>
