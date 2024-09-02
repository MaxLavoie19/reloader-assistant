<template>
  <v-row  v-if="!isAddingBrass">
    <v-col cols="10">
      <v-autocomplete
        label="Brass"
        :items="filteredBrassItems"
        v-model="model"
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
        @update:model-value="updateBrassManufacturer"
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
  <v-row  v-if="isAddingBrass && isAddingBrassManufacturer && brassManufacturerValue">
    <v-col cols="1"></v-col>
    <v-col cols="11">
      <v-text-field
        label="Nom du fabriquant de brass"
        v-model="brassManufacturerValue.name"
        @update:model-value="updateBrassManufacturer"
      ></v-text-field>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
  import { inject, onMounted, ref, watch } from 'vue';

  import { IAutocompleteItem } from '@/models/IAutocompleteItem';
  import { IBrass } from '@/models/IBrass';
  import { IManufacturer } from '@/models/IManufacturer';
  import { IBrassRepository } from '@/repositories/BrassRepository/IBrassRepository';
  import { IChambering } from '@/models/IChambering';
  import { IBrassAutocompleteMapper } from '@/mappers/IBrassAutocompleteMapper';
  import { IManufacturerRepository } from '@/repositories/ManufacturerRepository/IManufacturerRepository';
  import { IManufacturerAutocompleteMapper } from '@/mappers/IManufacturerAutocompleteMapper';

  const brassRepository = inject<IBrassRepository>('brassRepository') as IBrassRepository;
  const brassAutocompleteMapper = inject<IBrassAutocompleteMapper>('brassAutocompleteMapper') as IBrassAutocompleteMapper;
  const manufacturerRepository = inject<IManufacturerRepository>('manufacturerRepository') as IManufacturerRepository;
  const manufacturerAutocompleteMapper = inject<IManufacturerAutocompleteMapper>('manufacturerAutocompleteMapper') as IManufacturerAutocompleteMapper;

  const model = defineModel<IBrass>();

  const props = defineProps<{
    chamberingValue: IChambering,
  }>();

  watch(() => props.chamberingValue, updateChambering);

  const brassItems = ref<IAutocompleteItem<IBrass>[]>([]);
  const filteredBrassItems = ref<IAutocompleteItem<IBrass>[]>([]);

  const brassManufacturerItems = ref<IAutocompleteItem<IManufacturer>[]>([]);
  const brassManufacturerValue = ref<IManufacturer>();
  const isAddingBrass = ref(false);
  const isAddingBrassManufacturer = ref(false);

  onMounted(() => {
    setBrassItems(model.value);
  });

  async function setBrassItems(brass?: IBrass): Promise<void> {
    const brasses = await brassRepository.getBrasses();
    brassItems.value = brasses.map((brass) => brassAutocompleteMapper.map(brass));

    if (brass) {
      model.value = brassItems.value.find(item => {
        return item.value.id === brass.id;
      })?.value;
    }

    filterBrasses();
  }

  function updateChambering(): void {
    filterBrasses();
  }

  function filterBrasses(): void {
    const chamberingId = props.chamberingValue.id;

    if (!chamberingId) {
      filteredBrassItems.value = brassItems.value;
      return;
    }

    filteredBrassItems.value = brassItems.value.filter((brassItem) => {
      return brassItem.value.chambering.id === chamberingId;
    });
  }

  function addBrass(): void {
    if (!model.value) {
      model.value = brassRepository.getBlankBrass(props.chamberingValue);
    }

    setManufacturer();
    isAddingBrass.value = true;
  }

  function addBrassManufacturer(): void {
    if (!brassManufacturerValue.value) {
      brassManufacturerValue.value = manufacturerRepository.getBlankManufacturer();
    }

    isAddingBrassManufacturer.value = true;
  }

  async function setManufacturer(): Promise<void> {
    const manufacturers = await manufacturerRepository.getManufacturers();
    brassManufacturerItems.value = manufacturers.map(manufacturer => manufacturerAutocompleteMapper.map(manufacturer))
  }

  function updateBrassManufacturer(): void {
    if (!model.value || !brassManufacturerValue.value) return;
    model.value.manufacturer = brassManufacturerValue.value;
  }
</script>
