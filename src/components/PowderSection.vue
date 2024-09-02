<template>
  <v-row v-if="!isAddingPowder">
    <v-col cols="10">
      <v-autocomplete
        label="Poudre"
        :items="powderItems"
        v-model="model"
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
        v-model="powderManufacturerValue"
        :items="powderManufacturerItems"
        @update:model-value="updatePowderManufacturer"
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
  <v-row v-if="isAddingPowder && isAddingPowderManufacturer && powderManufacturerValue">
    <v-col cols="1"></v-col>
    <v-col cols="11">
      <v-text-field
        label="Fabriquant de poudre"
        v-model="powderManufacturerValue.name"
        @update:model-value="updatePowderManufacturer"
      ></v-text-field>
    </v-col>
  </v-row>
  <v-row v-if="isAddingPowder && model">
    <v-col cols="1"></v-col>
    <v-col cols="11">
      <v-text-field
        label="Nom de poudre"
        v-model="model.name"
      ></v-text-field>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
  import { IManufacturerAutocompleteMapper } from '@/mappers/IManufacturerAutocompleteMapper';
  import { IPowderAutocompleteMapper } from '@/mappers/IPowderAutocompleteMapper';
  import { IAutocompleteItem } from '@/models/IAutocompleteItem';
  import { IManufacturer } from '@/models/IManufacturer';
  import { IPowder } from '@/models/IPowder';
  import { IManufacturerRepository } from '@/repositories/ManufacturerRepository/IManufacturerRepository';
  import { IPowderRepository } from '@/repositories/PowderRepository/IPowderRepository';
  import { inject, onMounted, ref } from 'vue';


  const powderRepository = inject<IPowderRepository>('powderRepository') as IPowderRepository;
  const powderAutocompleteMapper = inject<IPowderAutocompleteMapper>('powderAutocompleteMapper') as IPowderAutocompleteMapper;
  const manufacturerRepository = inject<IManufacturerRepository>('manufacturerRepository') as IManufacturerRepository;
  const manufacturerAutocompleteMapper = inject<IManufacturerAutocompleteMapper>('manufacturerAutocompleteMapper') as IManufacturerAutocompleteMapper;

  const model = defineModel<IPowder>();

  const powderItems = ref<IAutocompleteItem<IPowder>[]>([]);

  const isAddingPowder = ref(false);
  const isAddingPowderManufacturer = ref(false);
  const powderManufacturerValue = ref<IManufacturer>();
  const powderManufacturerItems = ref<IAutocompleteItem<IManufacturer>[]>([]);

  onMounted(() => {
    setPowderItems(model.value);
  });

  async function setPowderItems(powder?: IPowder) {
    const powders = await powderRepository.getPowders()
    powderItems.value = powders.map(powder => powderAutocompleteMapper.map(powder));

    if (powder) {
      model.value = powderItems.value.find(item => {
        return item.value.id === powder.id;
      })?.value;
    }
  }

  function addPowder() {
    if (!model.value) {
      model.value = powderRepository.getBlankPowder();
    }

    setPowderManufacturerItems(model.value);
    isAddingPowder.value = true;
  }

  async function setPowderManufacturerItems(powder?: IPowder) {
    const powderManufacturers = await manufacturerRepository.getManufacturers()
    powderManufacturerItems.value = powderManufacturers.map((powder) => manufacturerAutocompleteMapper.map(powder));

    if (powder?.manufacturer) {
      powderManufacturerValue.value = powderManufacturerItems.value.find(item => {
        return item.value.name === powder.manufacturer.name;
      })?.value;
    }
  }

  function addPowderManufacturer() {
    if (!powderManufacturerValue.value) {
      powderManufacturerValue.value = manufacturerRepository.getBlankManufacturer();
    }

    isAddingPowderManufacturer.value = true;
  }

  function updatePowderManufacturer(): void {
    if (!model.value || !powderManufacturerValue.value) return;
    model.value.manufacturer = powderManufacturerValue.value;
  }
</script>
