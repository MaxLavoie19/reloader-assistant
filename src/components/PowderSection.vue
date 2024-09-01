<template>
  <div v-if="model">
    <v-row v-if="!isAddingPowder">
      <v-col cols="10">
        <v-autocomplete
          label="Poudre"
          :items="powderItems"
          v-model="powderValue"
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
    <v-row v-if="isAddingPowder && !isAddingPowderManufacturer && powderManufacturerValue">
      <v-col cols="1"></v-col>
      <v-col cols="9">
        <v-autocomplete
          label="Fabriquant de poudre"
          v-model="powderManufacturerValue"
          :items="powderManufacturerItems"
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
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row v-if="isAddingPowder && powderValue">
      <v-col cols="1"></v-col>
      <v-col cols="11">
        <v-text-field
          label="Nom de poudre"
          v-model="powderValue.name"
        ></v-text-field>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { IAutocompleteItem } from '@/models/IAutocompleteItem';
import { IManufacturer } from '@/models/IManufacturer';
import { IPowder } from '@/models/IPowder';
import { IPowderService } from '@/services/IPowderService';
import { inject, onMounted, ref } from 'vue';


const powderService = inject<IPowderService>('powderService') as IPowderService;

const model = defineModel<IPowder>();

const powderValue = ref<IPowder>();
const powderItems = ref<IAutocompleteItem<IPowder>[]>([]);

const isAddingPowder = ref(false);
const isAddingPowderManufacturer = ref(false);
const powderManufacturerValue = ref<IManufacturer>();
const powderManufacturerItems = ref<IAutocompleteItem<IManufacturer>[]>([]);

onMounted(() => {
  if (!model.value) {
    model.value = powderService.getBlankPowder();
  }
  setPowderItems(model.value);
});

async function setPowderItems(powder: IPowder) {
  powderItems.value = await powderService.getPowders().then((powders) => {
    const powderItems = powders.map((powder): IAutocompleteItem<IPowder> => {
      return {
        title: `${powder.manufacturer.name} ${powder.name}`,
        value: powder
      }
    });

    if (powder) {
      powderValue.value = powderItems.find(item => {
        return item.value.id === powder.id;
      })?.value;
    }

    return powderItems
  });
}

function addPowder() {
  isAddingPowder.value = true;
}

function addPowderManufacturer() {
  isAddingPowderManufacturer.value = true;
}
</script>
