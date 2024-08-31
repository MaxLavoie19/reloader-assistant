<template>
  <div v-if="model">
    <v-row v-if="!isAddingPrimer">
      <v-col cols="10">
        <v-autocomplete
          label="Primer"
          :items="primerItems"
          v-model="primerValue"
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
    <v-row v-if="isAddingPrimer && !isAddingPrimerManufacturer && primerManufacturerValue">
      <v-col cols="1"></v-col>
      <v-col cols="9">
        <v-autocomplete
          label="Fabriquant de primer"
          :items="primerManufacturerItems"
          v-model="primerManufacturerValue.name"
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
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row v-if="isAddingPrimer && primerValue">
      <v-col cols="1"></v-col>
      <v-col cols="11">
        <v-text-field
          label="Modèle de primer"
          v-model="primerValue.name"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row v-if="isAddingPrimer && primerValue">
      <v-col cols="1"></v-col>
      <v-col cols="11">
        <v-text-field
          label="taille de primer"
          v-model="primerValue.size"
        ></v-text-field>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { inject, onMounted, ref } from 'vue';

import { IPrimer } from '@/models/IPrimer';
import { IManufacturer } from '@/models/IManufacturer';
import { IAutocompleteItem } from '@/models/IAutocompleteItem';
import { IPrimerService } from '@/services/IPrimerService';

const primerService = inject<IPrimerService>('primerService') as IPrimerService;

const model = defineModel<IPrimer>();

const primerValue = ref<IPrimer>();
const primerItems = ref<IAutocompleteItem<IPrimer>[]>([]);

const isAddingPrimerManufacturer = ref(false);
const primerManufacturerValue = ref<IManufacturer>();
const primerManufacturerItems = ref<IAutocompleteItem<IManufacturer>[]>([]);

const isAddingPrimer = ref(false);

onMounted(() => {
  if (!model.value) {
    model.value = primerService.getBlankPrimer();
  }
  setPrimerItems(model.value);
});

async function setPrimerItems(primer: IPrimer) {
  primerItems.value = await primerService.getPrimers().then((primers) => {
    const primerItems = primers.map((primer): IAutocompleteItem<IPrimer> => {
      return {
        title: `${primer.manufacturer.name} ${primer.size} ${primer.name}`,
        value: primer
      }
    });

    if (primer) {
      primerValue.value = primerItems.find(item => {
        return item.value.id === primer.id;
      })?.value;
    }

    return primerItems
  });
}

function addPrimer() {
  isAddingPrimer.value = true;
}

function addPrimerManufacturer() {
  isAddingPrimerManufacturer.value = true;
}

</script>
