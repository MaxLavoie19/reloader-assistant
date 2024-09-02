<template>
  <v-row v-if="!isAddingPrimer">
    <v-col cols="10">
      <v-autocomplete
        label="Primer"
        :items="primerItems"
        v-model="model"
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
        :items="primerManufacturerItems"
        v-model="primerManufacturerValue"
        @update:model-value="updatePrimerManufacturer"
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
  <v-row v-if="isAddingPrimer && isAddingPrimerManufacturer && primerManufacturerValue">
    <v-col cols="1"></v-col>
    <v-col cols="11">
      <v-text-field
        label="Fabriquant de primer"
        v-model="primerManufacturerValue.name"
        @update:model-value="updatePrimerManufacturer"
      ></v-text-field>
    </v-col>
  </v-row>
  <v-row v-if="isAddingPrimer && model">
    <v-col cols="1"></v-col>
    <v-col cols="11">
      <v-text-field
        label="Modèle de primer"
        v-model="model.name"
      ></v-text-field>
    </v-col>
  </v-row>
  <v-row v-if="isAddingPrimer && model">
    <v-col cols="1"></v-col>
    <v-col cols="11">
      <v-text-field
        label="taille de primer"
        v-model="model.size"
      ></v-text-field>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
  import { inject, onMounted, ref } from 'vue';

  import { IPrimer } from '@/models/IPrimer';
  import { IManufacturer } from '@/models/IManufacturer';
  import { IAutocompleteItem } from '@/models/IAutocompleteItem';
  import { IPrimerRepository } from '@/repositories/IPrimerRepository';
  import { IPrimerAutocompleteMapper } from '@/mappers/IPrimerAutocompleteMapper';
  import { IManufacturerRepository } from '@/repositories/IManufacturerRepository';
  import { IManufacturerAutocompleteMapper } from '@/mappers/IManufacturerAutocompleteMapper';

  const primerRepository = inject<IPrimerRepository>('primerRepository') as IPrimerRepository;
  const primerAutocompleteMapper = inject<IPrimerAutocompleteMapper>('primerAutocompleteMapper') as IPrimerAutocompleteMapper;
  const manufacturerRepository = inject<IManufacturerRepository>('manufacturerRepository') as IManufacturerRepository;
  const manufacturerAutocompleteMapper = inject<IManufacturerAutocompleteMapper>('manufacturerAutocompleteMapper') as IManufacturerAutocompleteMapper;

  const model = defineModel<IPrimer>();

  const primerItems = ref<IAutocompleteItem<IPrimer>[]>([]);

  const isAddingPrimerManufacturer = ref(false);
  const primerManufacturerValue = ref<IManufacturer>();
  const primerManufacturerItems = ref<IAutocompleteItem<IManufacturer>[]>([]);

  const isAddingPrimer = ref(false);

  onMounted(() => {
    setPrimerItems();
  });

  async function setPrimerItems(primer?: IPrimer) {
    const primers = await primerRepository.getPrimers()
    primerItems.value = primers.map((primer) => primerAutocompleteMapper.map(primer));

    if (primer) {
      model.value = primerItems.value.find(item => {
        return item.value.id === primer.id;
      })?.value;
    }
  }

  function addPrimer() {
    if (!model.value) {
      model.value = primerRepository.getBlankPrimer();
    }

    setPrimerManufacturerItems(model.value);
    isAddingPrimer.value = true;
  }

  async function setPrimerManufacturerItems(primer?: IPrimer) {
    const primerManufacturers = await manufacturerRepository.getManufacturers()
    primerManufacturerItems.value = primerManufacturers.map((primer) => manufacturerAutocompleteMapper.map(primer));

    if (primer?.manufacturer) {
      primerManufacturerValue.value = primerManufacturerItems.value.find(item => {
        return item.value.name === primer.manufacturer.name;
      })?.value;
    }
  }

  function addPrimerManufacturer() {
    if (!primerManufacturerValue.value) {
      primerManufacturerValue.value = manufacturerRepository.getBlankManufacturer();
    }

    isAddingPrimerManufacturer.value = true;
  }

  function updatePrimerManufacturer(): void {
    if (!model.value || !primerManufacturerValue.value) return;
    model.value.manufacturer = primerManufacturerValue.value;
  }
</script>
